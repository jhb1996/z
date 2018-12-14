/**
 * AlibabaBackendController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var scraper = require('../customHelpers/scraper')

module.exports = {
    async alibabaBackend(req,res){
      console.log('s', scraper)

      console.log('alibabaBackend called')
      console.log('req.body', req.body)
      console.log('req.body.inputStr', req.body.inputStr)

      var aliBabaScraper = scraper.Scraper(aliBabaUrlFormulator, basicHtmlGetter, aliBabaHtmlParser)
      var alibabaObjLst = await aliBabaScraper.scrapeSearchStr(req.body.inputStr)
      // var alibabaObjLst = await scrapeAlibaba(req.body.inputStr)
      // console.log('alibabaObjLst', alibabaObjLst)
      res.send(alibabaObjLst)
    },
};

var request = require('request')
var cheerio = require('cheerio')
var Product = require('../../../sharedFrontAndBack/classes/product')
const scrapeProductLimit = 10

function aliBabaUrlFormulator(SearchStrRaw){
  // https://www.alibaba.com/products/bunnies.html?spm=a2700.galleryofferlist.galleryFilter.10.1875f28e97phew&IndexArea=product_en&viewtype=L
  const baseURL = 'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText='
  const endURL = '&viewtype=L'
  var searchTermsProcessed = SearchStrRaw.trim()
  searchTermsProcessed = searchTermsProcessed.replace(' ', '+')
  const finalURL = baseURL+searchTermsProcessed+endURL
  console.log('finalURL', finalURL)
  return finalURL 
}

async function basicHtmlGetter(finalURL){
  var html = await new Promise(function(resolve, reject) {
    // Do async job
      request.get(finalURL, function(err, response, html) {
          response=response||{}
          if (err || response.statusCode != 200) {
              console.log('couldnt get firts html. response.status code is', response.statusCode)
              console.log(response)
              reject(err);
          } else {
              resolve(html);
          }
      })
  })
  // // write the html to a file
  //   var fs = require('fs');
  //   fs.writeFile("tempHtml.html", html, function(err) {
  //       if(err) {
  //           throw err
  //           // return console.log(err);
  //       }
    
  //       console.log("The file was saved!");
  //   }); 
  return html
}

async function aliBabaHtmlParser(html){
  var $ = cheerio.load(html);
    const context = 'div.item-grid'
    var productObjArray = []

    $(context).each(function(i, element) {
        if (i<scrapeProductLimit){
            //could try different ways to speed this up like asynchronously looking through each element
            //could also try locating a smaller element and looking by parent/child/next rather than find each time
            var productName = $(element).find('h2.title').find('a').text()
            var linkRaw = $(element).find('h2.title').find('a').attr('href')
            var link = 'https://'+linkRaw.trim().substring(2)

            var priceStrRaw = $(element).find('div.price').find('b').text().trim()
            var priceReg = /[^$]+$/
            const priceStr = priceStrRaw.match(priceReg)[0] 
            const priceFloat = parseFloat(priceStr)

            const imgSrc = $(element).find('img.util-valign-inner').attr('src')

            // console.log('priceStr', priceStr)
            // console.log('priceFloat', priceFloat)
            // console.log('i', i)
            // console.log('name: ', name)
            // console.log('link: ', link)
            // console.log('price', priceStr)
            // console.log('imgSrc:', imgSrc)

            // productObjArray.push({productName: name, priceFloat:priceFloat, link:link, imgSrc:imgSrc})
            var newProduct = new Product.Product({productName:productName, imgSrc:imgSrc, fullName: null,  price: priceFloat, link: link})
            productObjArray.push(newProduct.objectify())
            
            //   fullName = 'creationDefaultFullName', price = -1, link = 'https://yahoo.com',
            //   specialName1 = 'creationDefaultSpecialName1', specialValue1 = -1,
            //   specialName2 = 'creationDefaultSpecialName2', specialValue2 = -1)))
        }
    });
    return productObjArray
}

// var request = require('request')
// var cheerio = require('cheerio')
// const scrapeProductLimit = 10

// var scrapeAlibaba = async function(searchTerm) {

//     //construct the url
//     const baseURL = 'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText='
//     const endURL = '&viewtype=L'

//     // https://www.alibaba.com/products/bunnies.html?spm=a2700.galleryofferlist.galleryFilter.10.1875f28e97phew&IndexArea=product_en&viewtype=L
//     var fSearchTerms = searchTerm.trim()
//     fSearchTerms = fSearchTerms.replace(' ', '+')
//     const finalURL = baseURL+fSearchTerms+endURL

//     console.log('finalURL', finalURL)

//     //packet sniffing
//     //could us wire shock and look at all http request coming out of the computer
//     //telnet

//     var html = await new Promise(function(resolve, reject) {
//     	// Do async job
//         request.get(finalURL, function(err, response, html) {
//             response=response||{}
//             if (err || response.statusCode != 200) {
//                 console.log('couldnt get firts html. response.status code is', response.statusCode)
//                 console.log(response)
//                 reject(err);
//             } else {
//                 resolve(html);
//             }
//         })
//     })
//     // // write the html to a file
//     //   var fs = require('fs');
//     //   fs.writeFile("tempHtml.html", html, function(err) {
//     //       if(err) {
//     //           throw err
//     //           // return console.log(err);
//     //       }
      
//     //       console.log("The file was saved!");
//     //   }); 


//     var $ = cheerio.load(html);
//     const context = 'div.item-grid'
//     var productObjArray = []

//     $(context).each(function(i, element) {
//         if (i<scrapeProductLimit){
//             //could try different ways to speed this up like locating a smaller element and looking by parent/child/next
//             var name = $(element).find('h2.title').find('a').text()
//             var linkRaw = $(element).find('h2.title').find('a').attr('href')
//             var link = 'https://'+linkRaw.trim().substring(2)

//             var priceStrRaw = $(element).find('div.price').find('b').text().trim()
//             var priceReg = /[^$]+$/
//             const priceStr = priceStrRaw.match(priceReg)[0] 
//             const priceFloat = parseFloat(priceStr)

//             const imgSrc = $(element).find('img.util-valign-inner').attr('src')

//             // console.log('priceStr', priceStr)
//             // console.log('priceFloat', priceFloat)
//             // console.log('i', i)
//             // console.log('name: ', name)
//             // console.log('link: ', link)
//             // console.log('price', priceStr)
//             console.log('imgSrc:', imgSrc)

//             productObjArray.push({productName: name, priceFloat:priceFloat, link:link, imgSrc:imgSrc})
//         }
//     });
//     return productObjArray
// }

// async function main(){
//     var productInfoLst = await scrapeAlibaba('bunnies')
//     console.log('final alibaba productInfoLst', productInfoLst)
// }
// main()