const fs = require('fs')
const http = require('request')
var exec = require('child_process').exec

let songs = __dirname + '/song/';
let temp_home = __dirname + '/ttt/';
let temp = songs + 'tmp/'; 

let fileName
let response
// var download = (m3_url, title) => {
function download(m3_url, title, res) {
    let m3u8_ori = fs.createWriteStream(temp+title+'.m3u8');
    fileName = title;
    response = res;
    http.get(m3_url)
        .on('response', (res) => {
            res.pipe(m3u8_ori);
        })
        .on('complete', () => getallTs(title));

}

function getallTs(title) {
    let m3u8_source = fs.readFileSync(temp + title+'.m3u8', 'utf-8').split(/\r?\n/);

    m3u8_source.forEach((m3u8,index) => {
        if(m3u8.indexOf('.ts') > -1) {
            http.get(m3u8).on('response', (res) => {
                res.pipe(fs.createWriteStream(`${temp}segment_${(index<10)? '0'+ index : index}.ts`));
            });
        }
    });
    setTimeout(() => {
        mergeTs();
    }, 10000);
}

function mergeTs() {
    let func = "cat " + temp + "*.ts > " + songs + "file_video.ts";
    exec(func, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}else{
            console.log('Done.');
            rewrite()
		}
	});
}

function rewrite() {
    let sng_name = songs+'file_video.ts';
    let func = "ffmpeg.exe -i " + sng_name + " -acodec copy -vcodec copy "+ songs + fileName +".mp4";
    exec(func, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}else{
            console.log('Done.');
            clear();
		}
	});
}

function clear() {
    let src_ts = songs+'file_video.ts';
    let func = "rm " + temp + "*";
    exec(func, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}else{
            console.log('Done.');
            fs.unlink(src_ts, () => {
                response.json({'status': 'success','mess': 'File Downloaded'});
            });
		}
	});
}

exports.download = download;