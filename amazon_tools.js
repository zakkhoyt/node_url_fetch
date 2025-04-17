// amazon_tools.js
// Reference: https://stackoverflow.com/a/5801971
// ========

const fs = require('node:fs');








module.exports = {
  ensureDirExists,
  writeHTMLToFile,
  readFileSync,
  readFileAsync,
  readFileAsync2,
  extractASIN,
  extractProductProperties,
  extractASINFromSourceCode,
  extractProductImageID,
  extractProductTitle,
  extractProductBrand,
  extractProperties,
  buildProductImageURL
};


let fetchesDir = './fetches';
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

function writeHTMLToFile(url, html) {
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
}


function readFileSync(asin) {
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
  //     $ cat /Users/zakkhoyt/code/repositories/z2k/github/node_url_fetch/docs/amazon/fetches/B0CCFCLVST.html | wc
  //  12463   62722 1796754
}
async function readFileAsync(asin) {

      let filepath = `${fetchesDir}/${asin}.html`;
      console.log(`Will read content from filepath: ${filepath}`);

      try {
        const readStream = fs.createReadStream(filepath, { encoding: 'utf8' });
        for await (const chunk of readStream) {
          console.log('--- File chunk start ---');
          console.log(chunk);
          console.log('--- File chunk end ---');
        }
        console.log('Finished reading the file.');
        
        debugger
      } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        debugger
      }

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
  //     let contents = fs.readFileSync(filepath);

  // //     $ cat /Users/zakkhoyt/code/repositories/z2k/github/node_url_fetch/docs/amazon/fetches/B0CCFCLVST.html | wc
  // //  12463   62722 1796754
  //     return contents.toString();
}


async function readFileAsync2(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  try {
    for await (const chunk of readStream) {
      console.log('--- File chunk start ---');
      console.log(chunk);
      console.log('--- File chunk end ---');
    }
    console.log('Finished reading the file.');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}





// * [x] https://www.amazon.com/dp/B07BDDPR9K
// * [x] https://www.amazon.com/dp/B07BDDPR9K?other=params
// * [x] https://www.amazon.com/dp/B07BDDPR9K/other/path
// * [x] https://www.amazon.com/gp/product/B07BDDPR9K
// * [x] https://www.amazon.com/gp/product/B07BDDPR9K?other=params
// * [x] https://www.amazon.com/gp/product/B07BDDPR9K/other/path
// * [x] https://www.amazon.com/o/ASIN/B07BDDPR9K
// * [x] https://www.amazon.com/o/ASIN/B07BDDPR9K?other=params
// * [x] https://www.amazon.com/o/ASIN/B07BDDPR9K/other/path

function extractASIN(url) {
  
  try {
    
    // TODO: if url is /dp/ style, or /product/gp/asin or 
    // let result = url.match(/^(.*https:\/\/.*\/dp\/)([A-Z0-9]*)(.*)$/);
    // let result = url.match(/^(.*https:\/\/.*\/gp\/product\/)([A-Z0-9]*)(.*)$/);
    var regex = /^$/;
    if (url.includes("/dp/")) {
      console.log(`will extract ASIN from /dp/ url: ${url}`)
      regex = /^(.*https:\/\/.*\/dp\/)([A-Z0-9]*)(.*)$/;
    } else if (url.includes("/gp/product")) {
      console.log(`will extract ASIN from /gp/product/ url: ${url}`)
      regex = /^(.*https:\/\/.*\/gp\/product\/)([A-Z0-9]*)(.*)$/;
    } else if (url.includes("/o/ASIN/")) {
      console.log(`will extract ASIN from /o/ASIN/ url: ${url}`)
      regex = /^(.*https:\/\/.*\/dp\/)([A-Z0-9]*)(.*)$/;
    }


    let result = url.match(regex);
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
  } catch(err) {      
    console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
    debugger;
  } 
}

function extractProductProperties(sourceCode) {
  console.log("Will extract productProperties from sourceCode")
  // let asin = extractASINFromSourceCode(sourceCode);
  // console.log(`Did extract asin: ${asin}`)
  
  // let imageURL = extractProductImageURL(sourceCode);
  // console.log(`Did extract imageURL: ${imageURL}`)
  
  // let imageID = extractProductImageID(sourceCode);
  // console.log(`Did extract imageID: ${imageID}`)
  
  let title0 = extractProductTitle(sourceCode);
  console.log(`Did extract title0: ${title0}`)




  // debugger;
  // ## Extract from a HTML Source
  // * productASIN
  // * productImageID
  // * productImageURL
  //   * (baseURL, suffix)
  // * productTitle(s) / description
  //   * productShortTitle
  //   * productName
  // * productBrand
  // * productVariantSelection (EX: size/color)
  // * productSizingInfo ( the sizing table provided with some products )
  // * productVariantSizingInfo (a row from productSizingInfo)
  // * productPrice
  // * shippingSpeed
  // * shipable (to current address)
}

function extractASINFromSourceCode(sourceCode) {  
  try {
    // look for a line like his
    // '  , asin: "B0CCFCLVST"'
    let result = sourceCode.match(/  , asin: "(.+)".*/);
    asin=result[1];
    return asin;
  }
  catch(err) {      
    console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
    debugger;
  } 
}


function extractProductImageURL(sourceCode) {
  try {
    console.log("amazon-debug 131");  
    // let result = url.match(/^(.*https:\/\/.*\/dp\/)(.*)(\?.*)$/);
    let imgResult = sourceCode.match(/(var iUrl = ")(.*)";/);
    
    if (imgResult == null) {
      return null;
    } else {
      let imageURL = imgResult[2];
      return imageURL;
    }
  } catch(err) {
    console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message); 
    debugger;
    return null;
  }
}


// return an imageID
function extractProductImageID(sourceCode) {
  // amazon-imgUrl: https://m.media-amazon.com/images/I/517W--vk2LL.__AC_SX300_SY300_QL70_ML2_.jpg

  let imageURL = extractProductImageURL(sourceCode);
  console.log(`Did extract imageURL: ${imageURL}`)


  // https://m.media-amazon.com/images/I/517W--vk2LL.__AC_S2600_SY200.jpg
  // baseURL: https://m.media-amazon.com/images/I/
  // imgID: 517W--vk2LL
  // imgSize: .__AC_SX600_SY200
  //   .__AC_SX600
  //   .__AC_SY600
  //   .SY200
  // imgFormat: .jpg
  try {
    let regex = imageURL.match(/^(.*https:\/\/.*\/I\/)(.*)\.(.*)\.(.*)$/)
    console.log("amazon-debug 170");  
    let imageBaseUrl = regex[1]
    let imageId = regex[2]
    let imageQuality = regex[3]
    let imageFormat = regex[4]
    console.log("amazon-extractProductImageID: imageBaseUrl: " + imageBaseUrl);
    console.log("amazon-extractProductImageID: imageId: " + imageId);
    console.log("amazon-extractProductImageID: imageQuality: " + imageQuality);
    console.log("amazon-extractProductImageID: imageFormat: " + imageFormat);
    // console.log("amazon-debug 177");

    return imageId;
    
    // if ( regex == null ){
    //   console.log("amazon-debug 172");
    //   console.log("amazon-urlRegex: null");
    // } else {
    //   console.log("amazon-debug 173");
    //   for(var i = 0; i < regex.length; ++i){
    //     console.log("amazon-urlRegex[i]: i: " + i + " regex[i]" + regex[i]);
    //   }
    //   console.log("amazon-debug 174");
    // }
    // console.log("amazon-debug 175");
  } catch(err) {
    console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message); 
    debugger;
    return null;
  }
}
// returns product titles (dictionary)
function extractProductTitle(sourceCode) {
  // try {
  //   // productTitle
  //   //   <span id="productTitle" class="a-size-large product-title-word-break">        fasfasdfs       </span>       </h1>  
  //   // look for a line like his
  //   // '  , asin: "B0CCFCLVST"'
  //   let result = sourceCode.match(/id="productTitle" class="a-size-large product-title-word-break">(.*)(<\/span>.*)/);
  //   let productTitle = result[1].trim();
  //   return productTitle;
  // }
  // catch(err) {      
  //   console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
  //   debugger;
  // }   

  
  // try {
  //   // data-old-hires=
  //   //  <img alt="OQQ Women&amp;#39;s Square Neck Ruffle Hem Mini Dress Summer Short Sleeve with Shorts Party Dresses" src="https://m.media-amazon.com/images/I/71ii1cYLBNL.__AC_SX342_SY445_QL70_ML2_.jpg" data-old-hires=
  //   let result1 = sourceCode.match(/(.*)(data-old-hires=.*)/);
  //   let htmlLine = result1[1];

  //   // '	            <img alt="OQQ Women&amp;#39;s Square Neck Ruffle Hem Mini Dress Summer Short Sleeve with Shorts Party Dresses" src="https://m.media-amazon.com/images/I/71ii1cYLBNL.__AC_SX342_SY445_QL70_ML2_.jpg" '
  //   let result2 = htmlLine.match(/(.*<img alt=")(.*)(" src=")/);
  //   let title1 = result2[2];

  //   return title1;

  //   // return htmlLine;
  // }
  // catch(err) {      
  //   console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
  //   debugger;
  // }   
  
  
  try {    
    // canonical part 1
    //  <meta name="title" content="asdfasdfsa"/><title>
    let canonicalLine = sourceCode.match(/(<link rel="canonical".*)/)[1];

    let cannonicalResult1 = canonicalLine.match(/<meta name="title" content="(.*)"\/><title>/);    
    if (cannonicalResult1 == null) {
      // TODO: handle
    } else {
      let cannonicalTitle1 = cannonicalResult1[1];
      return cannonicalTitle1;  
    }
    

    let cannonicalResult2 = canonicalLine.match(/<title>(.*)<\/title>/);    
    if (cannonicalResult2 == null) {
      // TODO: handle
    } else {
      let cannonicalTitle2 = cannonicalResult2[1];
      return cannonicalTitle2;
    }
    
    let cannonicalResult3 = canonicalLine.match(/name="description" content="(.*)"\/>/);    
    if (cannonicalResult3 == null) {
      // TODO: handle
    } else {
      let cannonicalTitle3 = cannonicalResult3[1];
      return cannonicalTitle3;
    }
  }
  catch(err) {      
    console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
    debugger;
  }   

  

  // try {
  //   // canonical part 2
  //   //  <meta name="title" content="asdfasdfsa"/><title>
  //   let result1 = sourceCode.match(/<meta name="title" content="(.*)"\/><title>/);
  //   let title2 = result1[1];
  //   return title2;
  // }
  // catch(err) {      
  //   console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
  //   debugger;
  // }   
  // // data-old-hires=
  // metaTitle
  // titleValue
  // metaDescription
}
// returns the brand/manufacturer of the product
function extractProductBrand(sourceCode) {

}
function extractProperties(sourceCode) {
  // title: productTitle
  // title: data-old-hires=
  // title: metaTitle
  // title: titleValue
  // title: metaDescription
}

// returns an image URL
function buildProductImageURL(imageID, scaleX, scaleY, quality) {

}


