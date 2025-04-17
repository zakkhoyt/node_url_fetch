
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






// // const url = "https://duckduckgo.com/";
// // const url = "https://www.amazon.com/dp/B0DP5BQTRV";

// // https.get("https://www.google.com/index.html", function(res) {
// // https.get("https://www.google.com/index.html", function(res) {

// // let url = "https://www.amazon.com/dp/B0DP5BQTRV";
// let url = `https://www.amazon.com/dp/${asin}`;
// // https://www.amazon.com/dp/B0CCFCLVST
// console.log(`url from asin: ${url}`);




// // let sourceCode = amazon_tools.readHTMLFromFile(asin);
// let sourceCode = amazon_tools.readFileSync(asin);
// console.log(`Did read sourceCode: ${sourceCode}`);

// let lines = sourceCode.split(/\r\n|\r|\n/).length;
// console.log(`Did read content file for asin: ${asin}. lines: ${lines} length: ${sourceCode.length}`);

// //Did read content file for asin: B0CCFCLVST. lines: 136 length: 6609
// // $ cat /Users/zakkhoyt/code/repositories/z2k/github/node_url_fetch/docs/amazon/fetches/B0CCFCLVST.html | wc
// //    12463   62722 1796754


// amazon_tools.extractProductProperties(sourceCode);
// debugger;


// exit;

// let url = "https://www.amazon.com/dp/B0CCF9B42M?th=1&psc=1"
let url = "https://www.amazon.com/OQQ-Womens-Square-Dress-Dresses/dp/B0DSCTTKRM/?_encoding=UTF8&pd_rd_w=agnf9&content-id=amzn1.sym.255b3518-6e7f-495c-8611-30a58648072e%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=255b3518-6e7f-495c-8611-30a58648072e&pf_rd_r=WRWXPSPDXWMAM3YFCBJH&pd_rd_wg=UDent&pd_rd_r=eff420ed-96ee-47f3-ac8c-791788829217&ref_=pd_hp_d_atf_ci_mcx_mr_ca_hp_atf_d&th=1&psc=1"
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
            console.log(`finalSourceCode: ${finalSourceCode}`)
            // process.stdout.write(finalSourceCode);
            // dapi.message.send(finalSourceCode)
            // const content = 'Some content!';

            // fs.writeFile('fetches/B0DP5BQTRV.html', finalSourceCode, err => {
            //     if (err) {
            //         console.error(err);
            //     } else {
            //         console.log(`Did write to file: B0DP5BQTRV.html`);
            //     }
            // });
            amazon_tools.writeHTMLToFile(url, finalSourceCode);

            // amazon_tools.extractProductProperties(finalSourceCode);

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