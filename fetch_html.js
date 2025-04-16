
const https = require('https');
const process = require('node:process');
//import process from 'node:process';

// const url = "https://duckduckgo.com/";
// const url = "https://www.amazon.com/dp/B0DP5BQTRV";

// https.get("https://www.google.com/index.html", function(res) {
// https.get("https://www.google.com/index.html", function(res) {

let url = "https://www.amazon.com/dp/B0DP5BQTRV";
console.log(`Will fetch html for url: ${url}`)

https.get(
    url, 
    function(res) {
        console.log(res.statusCode);
        
        res.setEncoding('utf8');
        res.on('data', function(data) {
            // console.log(data);
            process.stdout.write(data);
        });
    }
)
.on(
    'error', 
    function(err) {
        console.log(err);
    }
);