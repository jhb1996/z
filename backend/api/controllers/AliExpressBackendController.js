/**
 * AliExpressController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async aliExpressBackend(req,res){
      console.log('aliExpressBackend called')
      console.log('req.body', req.body)
      console.log('req.body.inputStr', req.body.inputStr)

      var aliExpressObjLst = await scrapeAliExpress(req.body.inputStr)
      console.log('aliExpressObjLst', aliExpressObjLst)
      res.send(aliExpressObjLst)
    },
};

var request = require('request')
var cheerio = require('cheerio')
const scrapeProductLimit = 10

/* returns {productName, primaryRank, price, stripeSrc}
 * 
 */
var scrapeAliExpress = async function(searchTerm) {
    //construct the url
    const baseURL = 'https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20181125090215&SearchText='
    const endURL = ''
    // https://www.aliExpress.com/products/bunnies.html?spm=a2700.galleryofferlist.galleryFilter.10.1875f28e97phew&IndexArea=product_en&viewtype=L
    var fSearchTerms = searchTerm.trim()
    fSearchTerms = fSearchTerms.replace(' ', '+')
    const finalURL = baseURL+fSearchTerms+endURL
    console.log('finalURL', finalURL)

    var html = await new Promise(function(resolve, reject) {
    	// Do async job
        request.get(finalURL, function(err, response, html) {
            response=response||{}
            if (err || response.statusCode != 200) {
                console.log('couldnt get first html. response.status code is', response.statusCode)
                console.log(response)
                reject(err);
            } else {
                resolve(html);
            }
        })
    })
    // write the html to a file
    //   var fs = require('fs');
    //   fs.writeFile("tempHtml.html", html, function(err) {
    //       if(err) {
    //           throw err
    //           // return console.log(err);
    //       }
      
    //       console.log("The file was saved!");
    //   }); 

    var $ = cheerio.load(html);
    const context = 'div[class=item]'
    var productArray = []

    $(context).each(function(i, element) {
        if (i<scrapeProductLimit){
            //could try different ways to speed this up like locating a smaller element and looking by parent/child/next
            var productName = $(element).find('a.history-item.product').attr('title')
            var shortName = $(element).find('a.history-item.product').text()
            var linkRaw = $(element).find('a.history-item.product').attr('href')
            var link = 'https://'+linkRaw.trim().substring(2)
            var imgSrc = $(element).find('img.picCore.pic-Core-v').attr('src')
            var priceStrRaw = $(element).find('span.value').text().trim()
            // console.log('priceStrRaw', priceStrRaw)
            priceReg = /([\d\.]+)(?!.*([\d\.]+))/ //matches the last occurence of a combo of digits and '.' ie. [\d\.]+
            const priceStr = priceStrRaw.match(priceReg)[0] 
            const priceFloat = parseFloat(priceStr)
            // console.log('i', i)
            // console.log('productName: ', productName)
            // console.log('shortName: ', shortName)
            // console.log('imgSrc: ', imgSrc)
            // console.log('priceFloat =', priceFloat)
            productArray.push({productName: productName, priceFloat:priceFloat, link:link, imgSrc:imgSrc})

        }
    });
    return productArray

}

// async function main(){
//     var productInfoLst = await scrapeAliExpress('bunnies')
//     console.log('final aliexpress productInfoLst', productInfoLst)
// }
// main()

