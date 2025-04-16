
const https = require('https');
const process = require('node:process');
const fs = require('node:fs');

const amazon_tools = require('./amazon_tools');
console.log(`typeof amazon_tools.extractASIN: ${typeof amazon_tools.extractASIN}`); // => 'function'
console.log(`typeof amazon_tools.bar: ${typeof amazon_tools.bar}`); // => 'function'



let asin = '';
// https://nodejs.org/docs/latest/api/process.html#process_process_argv
// 0: /opt/homebrew/Cellar/node/23.6.0/bin/node
// 1: /Users/zakkhoyt/code/repositories/z2k/github/node_url_fetch/fetch_html.js
// 2: B0DP5BQTRV
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if (index == 2) {
        asin = val;
    }
});

console.log(`asin: ${asin}`);



// let contents = amazon_tools.readHTMLFromFile(asin);
// console.log(`Did read content file for asin: ${asin}`);
// debugger;



// const url = "https://duckduckgo.com/";
// const url = "https://www.amazon.com/dp/B0DP5BQTRV";

// https.get("https://www.google.com/index.html", function(res) {
// https.get("https://www.google.com/index.html", function(res) {

let url = "https://www.amazon.com/dp/B0DP5BQTRV";
console.log(`Will fetch html for url: ${url}`)

var count = 0;
https.get(
    url, 
    function(response) {
        console.log(response.statusCode);
        
        response.setEncoding('utf8');
        // response.on('data', function(data) {
        //     // console.log(data);
        //     process.stdout.write(data);
            
        //     console.log(`count: ${count}`);
        //     count += 1;
        // });

        // Append chunk of the request data here
        var finalSourceCode = ''
        response.on('data', function(chunk) {
            console.log(`Received chunk: ${count}`);
            count += 1;
            finalSourceCode += chunk
        }); 

        // https://nodejs.org/api/stream.html#stream_event_end
        response.on('end', function() {
            // console.log(`finalSourceCode: ${finalSourceCode}`)
            process.stdout.write(finalSourceCode);
            // dapi.message.send(finalSourceCode)
            const content = 'Some content!';

            // fs.writeFile('fetches/B0DP5BQTRV.html', finalSourceCode, err => {
            //     if (err) {
            //         console.error(err);
            //     } else {
            //         console.log(`Did write to file: B0DP5BQTRV.html`);
            //     }
            // });
            amazon_tools.writeHTMLToFile(url, finalSourceCode);

            // let asin = amazon_tools.extractASIN(url);
            // console.log(`extracted asin: ${asin}`);

            
        }); 
    }
)
.on(
    'error', 
    function(err) {
        console.log(err);
    }
);