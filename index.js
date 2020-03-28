const fs = require('fs')
const http = require('request')
var exec = require('child_process').exec

// let ts_1 = fs.createWriteStream('test.ts');
// const url = "https://vodhls-vh.akamaihd.net/i/songs/97/1421797/14858488/14858488_64.mp4/segment3_0_a.ts?set-akamai-hls-revision=5&hdntl=exp=1574451609~acl=/i/songs/97/1421797/14858488/14858488_64.mp4/*~data=hdntl~hmac=96e7b744169a396c6d9446bfbae7188e43270b7ec99abd6d000ae98f61ab35e9";
// let tt = http.get(url).on('response', (res) => {
//     console.log(res.request.uri.pathname.split('/').pop());
//     res.pipe(ts_1);
// });
let songs = __dirname + '/song/';
let temp_home = __dirname + '/ttt/';
let temp = songs + '/tmp/'; 

let line= fs.readFileSync('index_1.m3u8', 'utf-8').split(/\r?\n/);

cont = [];

console.log(line.length);

// return;
function main() {
    let ind = 0;
    for(let i=7; i<line.length; i++) {
        if( (i > 6) && (i % 2)) {
            // http.get(line[i],(err,res,body)=>{
            //     if(typeof body != undefined) {
            //         cont[i] = body;
            //         console.log(i);
            //     } else {
            //         console.log('tt');
            //     }
            // });
            // console.log(line);
            ind++;
            http.get(line[i]).on('response', (res) => {
                console.log(res.request.uri.pathname.split('/').pop());
                // res.pipe(fs.createWriteStream(`ttt/${res.request.uri.pathname.split('/').pop()}`));
                res.pipe(fs.createWriteStream(`ttt/segment_${(i<10)? '0'+i : i}.ts`));

            });
        }
        if(i == 96) {
            // decodeFile();
        }
    }
}

function appendTs() {
    let func = "cat " + folder + "* > " + folder + "file_video.ts"
    exec(func, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}else{
			console.log('Done.');
		}
	});
}

function decodeFile() {
    var master = fs.createWriteStream(temp_home + 'song.ts', {flags: 'a'});
    fs.readdir(temp_home,(err,files) => {
        if(err) {
            console.log(err);
            return;
        }
        for(const file of files) {
            if (file.indexOf('.ts') > -1 && file != 'song.ts') {
                let sour = fs.createReadStream(temp_home+file);
                sour.pipe(master)
                .on('finish', ()=> {
                    sour.close();
                });
            }else {
                console.log('Suck it:'+ file);
            }
        }
        rewrite();
    });
}

function rewrite() {
    let func = "ffmpeg.exe -i ttt/song.ts -acodec copy -vcodec copy ttt/song.mp4"
    exec(func, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}else{
			console.log('Done.');
		}
	});
}

// setTimeout(()=>{
//     let idx = 1
//     cont.forEach((co) => {
//         fs.createWriteStream(`tt/index_${idx}.ts`).write(co);
//         idx++;
//     });
// }, 5000);

main();

setTimeout(() => {
    decodeFile();
}, 5000);