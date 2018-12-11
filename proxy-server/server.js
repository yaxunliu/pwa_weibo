const http = require('http');
const https = require('https');
const urllib = require('url');
const fs = require('fs');
const convert = require('iconv-lite')



function request(url) {
	const {protocol, path, host } = urllib.parse(url);
	let httpMod = null 
	if (protocol == 'http:') {
		httpMod = http
	} else if (protocol == 'https:') {
		httpMod = https
	} else {
		console.log('无法识别的协议');
		return 
	}

	return new Promise((res, rej) => {
		let req = httpMod.request({
			host,
			path,
			headers: {
				'Content-Type': 'text/html'
			}
		}, (request) => {
			let statusCode = request.statusCode;
			let headers = request.headers;
			
			if (statusCode >= 200 && statusCode < 300 || statusCode == 304) {
				let arr = [];
				request.on('data',(chunk)=>{
					arr.push(chunk);
				});
				request.on('end', () => {
					let buffer = Buffer.concat(arr);
					res({
						status: 200,
						body: buffer,
						headers
					})
				});
			} else if (statusCode == 301 || statusCode == 302) {
				res({status: statusCode, body: null, headers})
			} else {
				rej({status: statusCode, body: null, headers})
			}
		})
		req.on('error', (err) => {
			console.log('request failure, error description => ', err)
			rej({
				status: 0
			})
		})
		req.write('');
		req.end();
	})
};



async function autoRequest(url) {
	let urlStr = url 
	while(1) {
		let {status, body, headers} = await request(urlStr)
		if (status == 200) {
			return body
		} else if (status == 301 || status == 302) {
			urlStr = headers.location
		} else {
			console.log('error')
			return 
		}
	}
} 


 
http.createServer(async (req, res) => {
	let url = new URL('http://127.0.0.1' + req.url)
	let requestUrl = url.searchParams.get('url')
	let result = await autoRequest(requestUrl)
	let data = convert.decode(result, 'utf8')
	res.writeHead(200, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'})
	res.end(data)

}).listen(1000);














