const express = require('express')
const router = express.Router()

const { getMetadata } = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('node-fetch')


async function Parse() {
    const url = 'https://github.com/mozilla/page-metadata-parser';
    const response = await fetch(url);
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
    console.log(metadata);
}
// Parse()

async function url_parse(url) {
    const response = await fetch(url);
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
    return metadata;
}

router.get('/', (req, res, next) => {
    let query = "SELECT * FROM `bookmarks`";
    db.query(query, (err, result) => {
        if(err || result.length == 0) {
            res.statusCode(400).send('No results found');
        }

        res.send(result);
    })
});

router.post('/add', (req, res, next) => {
    let body = req.body;
    url_parse(body.url).then(meta_cont => {
        if(meta_cont) {
            console.log(meta_cont);
            meta_cont.keywords = (meta_cont.keywords) ? meta_cont.keywords.join(',') : '';
            let values = {
                url: meta_cont.url,
                title: meta_cont.title,
                desc: (meta_cont.description) ? meta_cont.description : '',
                tag: body.tag,
                key_words: meta_cont.keywords,
                fav: (body.fav)? 1 : 0,
                image: (meta_cont.image) ? meta_cont.image: '',
                fav_icon: (meta_cont.icon) ? meta_cont.icon: ''
            };

            let query = "INSERT INTO `bookmarks` SET ?"
            db.query(query, values, (err, result, fields) => {
                if(err) res.send('Something went Wrong');
                console.log('result',result);
                res.send('Inserted Successfully');
            });
        }
    });
});

module.exports = router;