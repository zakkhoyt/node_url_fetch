// amazon_tools.js
// Reference: https://stackoverflow.com/a/5801971
// ========

const fs = require('node:fs');


let fetchesDir = './fetched';
function ensureDirExists(dir) {
  // TODO: Completion for nested functions (promises?)
  // fs.existsSync()
  // fs.mkdirSync(path[, options])
  // https://nodejs.org/api/fs.html#fspromisesmkdirpath-options
  // https://nodejs.org/api/fs.html#fspromisesreaddirpath-options
  // import { open } from 'node:fs/promises';
  // let file;
  // try {
  //   file = await open('/open/some/file.txt', 'r');
  //   const stat = await file.stat();
  //   // use stat
  // } finally {
  //   await file.close();
  // } 

  console.log(`Checking if dir exists: ${dir}`);
  if (fs.existsSync(dir)) {
    console.log(`Dir already exists: ${dir}`);
  } else {
    console.log(`Will create dir: ${dir}`);
    if (fs.mkdirSync(dir)) {
      console.log(`Did create dir: ${dir}`);
    } else {
      console.error(`Failed to create dir: ${dir}`);
      // TODO: throw
      debugger;
    }
  }
}

module.exports = {
    writeHTMLToFile: function (url, html) {
      // TODO: get PWD
      // TODO: define fetches dir
      // TODO: ensure dir exists



      ensureDirExists(fetchesDir);


      let asin = this.extractASIN(url);
      console.log(`extracted asin: ${asin}`);
      let filepath = `${fetchesDir}/${asin}.html`;
      console.log(`Will save html to filepath: ${filepath}`);
      fs.writeFile(filepath, html, err => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log(`Did save html to filepath: ${filepath}`);
        }
      });
    },
    readHTMLFromFile: function (asin) {
      let filepath = `${fetchesDir}/${asin}.html`;
      console.log(`Will read content from filepath: ${filepath}`);



      // let file;
      // try {
      //   file = fs.open('/open/some/file.txt', 'r');
      //   // const stat = await file.stat();
      //   let content = file.content.toString();
      //   return content;
      //   // use stat
      // } finally {
      //   file.close();
      // } 

      // let contents = fs.readFile(filepath, (err, data) => {
      //   // if (err) throw err;
      //   // console.log(data);
      //   if (err) {
      //     console.error(err);
      //     throw err;
      //   } else {
      //     console.log(`Did read content from filepath: ${filepath}`);
      //     return data;
      //   }
      // }); 
      let contents = fs.readFileSync(filepath);
      return contents.toString();
    },
    extractASIN: function (url) {
        try {
            let result = url.match(/^(.*https:\/\/.*\/dp\/)(.*)(\?*.*)$/);
            console.log("amazon-debug 30");  
      
            console.log("amazon-urlRegex[0]: " + result[0]);
            console.log("amazon-urlRegex[1]: " + result[1]);
            console.log("amazon-urlRegex[2]: " + result[2]);
            console.log("amazon-urlRegex[3]: " + result[3]);
            console.log("amazon-debug 32");
            
            if ( result == null ){
              console.log("amazon-debug 31");
              console.log("amazon-urlRegex: null");
            } else {
              for(var i = 0; i < result.length; ++i){
                console.log("amazon-urlRegex[i]: i: " + i + " result[i]" + result[i]);
              }
        
        
              console.log("amazon-urlRegex[0]: " + result[0]);
              console.log("amazon-urlRegex[1]: " + result[1]);
              console.log("amazon-urlRegex[2]: " + result[2]);
              console.log("amazon-urlRegex[3]: " + result[3]);
              console.log("amazon-debug 32");
            }
            console.log("amazon-debug 33");
        
        
        
        
            let asid = result[2];
            console.log("amazon-debug 50");
        
            if ( asid == null ){
              // some_variable is either null or undefined
              console.log("amazon-asid: null|undefined");
              return null;
            } else {
              console.log("amazon-asid: " + asid);
              return asid;
            }
          }
          catch(err) {      
            console.log("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
            console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
            debugger;
          } 
    },
    // return an imageID
    extractProductImageID(sourceCode) {

    },
    // returns product titles (dictionary)
    extractProductTitle(sourceCode) {
      // productTitle
      // data-old-hires=
      // metaTitle
      // titleValue
      // metaDescription
    },
    // returns the brand/manufacturer of the product
    extractProductBrand(sourceCode) {

    },
    extractProperties(sourceCode) {
      // title: productTitle
      // title: data-old-hires=
      // title: metaTitle
      // title: titleValue
      // title: metaDescription
    },
    // returns an image URL
    buildProductImageURL(imageID, scaleX, scaleY, quality) {

    }

  };