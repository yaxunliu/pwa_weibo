const http = require('http');
const https = require('https');
const urllib = require('url');
const jsDom = require('jsdom');
const convert = require('iconv-lite')
const { JSDOM } = jsDom;
const fs = require('fs');
const Client = require('mysql-pro');

try {
	var client = new Client({
		mysql: {
	        host: "47.98.149.53",
	        port: 3306,
	        database: "taobao_spider",
	        user: "root",
	        password: ""
	    }
	});
}catch (err) {
	console.log(err);
}




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



async function main() {
	try {
		let json = await autoRequest('https://mrshang.tmall.com/shop/view_shop.htm?spm=a230r.7195193.1997079397.2.604e1d6bu8432j')

		console.log('get data success!!')

		let data = convert.decode(json, 'gbk')
		let jsonArr = []
		const { document } = new JSDOM(data).window
		let wrapper = document.getElementById('shop2630947997');
		let realElement = wrapper.getElementsByClassName('skin-box-bd')[0]
		Array.from(realElement.getElementsByClassName('item4line1')).forEach( element => {
			Array.from(element.getElementsByClassName('item')).forEach( subitem => {
				let imgElement = subitem.getElementsByClassName('photo')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0]
				let price = subitem.getElementsByClassName('detail')[0].getElementsByClassName('attribute')[0].getElementsByClassName('cprice-area')[0].getElementsByClassName('c-price')[0].innerHTML
				let buffer = convert.encode(new Buffer(imgElement.alt), 'gbk')
				let title = convert.decode(buffer, 'utf8')
				let imgSrc = imgElement.getAttribute('data-ks-lazyload').slice(2)
				let json = {img: imgSrc,  title: title, price: price }
				let sql = `INSERT INTO recommend_item_list (id, img, desction, price) VALUES (0, \'${imgSrc}\', \'${title}\', \'${price}\');`
				jsonArr.push(sql)
			})
		})
	 	let sqlStr = jsonArr.join('')
	 	console.log('execute sql ');

	 	executeSql(sqlStr)
		
	} catch (err) { 
		console.log('error', err)
	}

}


async function executeSql(sql) {

client.ex

	// client.startTransaction( async (res) => {
	// 	try {
	// 		let result = await client.executeTransaction(sql)
	// 		console.log('sql execute success', result)
	// 		client.stopTransaction()
	// 	}catch (err) {
	// 		client.stopTransaction()
	// 		console.log('execute transaction  error', err)
	// 	}
	// }, (error) => {
	// 	console.log('begin transaction  error', error)
	// })

	client.startTransaction(function(result) {
    // execute sql
    client.executeTransaction(sql, []).then(function(result){
    	console.log('success', result)
        // stop
        client.stopTransaction();
    }, function(error){
    	console.log('faulure to start transaction')
    });
}, function(error){
	    	console.log('faulure to start transaction1')
});

}





main()



