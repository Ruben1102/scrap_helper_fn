let fs= require('fs');

let parent = __dirname+ '/ttt/';
// var master = fs.createWriteStream(parent + 'song1.ts', {flags: 'a'});
var master = fs.createWriteStream(parent + 'song1.ts');

var num = 0;
fs.readdir(parent,(err,files) => {
    console.log(err);
    console.log(files);
    for(const file of files) {
        console.log(num + file);
        if (file.indexOf('segment') > -1) {
            let sour = fs.createReadStream(parent+file);
            sour.pipe(master)
            .on('finish', () => {
                sour.close();
            });
        }else {
            console.log('Suck it:'+ file);
        }  
        num++;
    }
    console.log('ahaha....');
    // files.forEach((file) => {
    //     if (file.indexOf('.ts') > -1) {
    //         fs.createReadStream(parent+file).pipe(master);
    //     }else {
    //         console.log('Suck it:'+ file);
    //     }       
    // });
});
console.log('what....');
master.on('finish', function() {
    console.log('Over bitch');
    master.close();  // close() is async, call cb after close completes.
});

master.on('error', (err)=> {
    console.log(err);
});