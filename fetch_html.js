
const https = require('https');
const process = require('node:process');

const amazon_tools = require('./amazon_tools');
console.log(`typeof amazon_tools.extractASIN: ${typeof amazon_tools.extractASIN}`); // => 'function'
console.log(`typeof amazon_tools.bar: ${typeof amazon_tools.bar}`); // => 'function'



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
            debugger;
            // console.log(`finalSourceCode: ${finalSourceCode}`)
            process.stdout.write(finalSourceCode);
            dapi.message.send(finalSourceCode)
        }); 

        
    }
)
.on(
    'error', 
    function(err) {
        console.log(err);
    }
);