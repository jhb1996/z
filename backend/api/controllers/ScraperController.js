/**
 * scraperController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Scraper = require('../customHelpers/scraper')
var request = require('request')
var cheerio = require('cheerio')
var Product = require('../../../sharedFrontAndBack/classes/product')
const scrapeProductLimit = 30

//The functions which can be called by router.js in response to a GET/POST/PUT request
module.exports = {
    async doScraping(req,res){
      // console.log('s', Scraper)
      console.log('doScraping called on', req.body.site)
      console.log('req.body.searchStr', req.body.searchStr)
      if (req.body.site === 'aliBaba'){
        var scraper = new Scraper.Scraper(aliBabaUrlFormulator, basicHtmlGetter, aliBabaHtmlParser)
      }else if (req.body.site === 'aliExpress'){
        var scraper = new Scraper.Scraper(aliExpressUrlFormulator, basicHtmlGetter, aliExpressHtmlParser)
      }else if (req.body.site === 'amazon'){
        var scraper = new Scraper.Scraper(amazonUrlFormulator, amazonHtmlGetter, amazonHtmlParser)
      }
      console.log('productObjLst', productObjLst)
      var productObjLst = await scraper.scrapeSearchStr(req.body.searchStr)
      res.send(productObjLst)
    },
};

// asynchronously gets HTML with a get request to finalURL
async function basicHtmlGetter(finalURL){
  console.log('basicHtmlGetter',finalURL)
  var html = await new Promise(function(resolve, reject) {
      var customHeaderRequest = request.defaults({
          headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
      AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'}
      })
      customHeaderRequest.get(finalURL, function(err, response, html){
          // console.log('response', response)
          response=response||{}
          if (err || response.statusCode != 200) {
              console.log('couldnt get firts html. response.status code is', response.statusCode)
              // console.log(response)
              reject(err);
          } else {
              resolve(html);
          }
      });
      return html
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

function aliBabaUrlFormulator(searchStrRaw){
  // https://www.alibaba.com/products/bunnies.html?spm=a2700.galleryofferlist.galleryFilter.10.1875f28e97phew&IndexArea=product_en&viewtype=L
  const baseURL = 'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText='
  const endURL = '&viewtype=L'
  var searchTermsProcessed = searchStrRaw.trim()
  searchTermsProcessed = searchTermsProcessed.replace(' ', '+')
  const finalURL = baseURL+searchTermsProcessed+endURL
  console.log('aliBaba finalURL', finalURL)
  return finalURL 
}

async function aliBabaHtmlParser(html){
  var $ = cheerio.load(html);
    const context = 'div.item-grid'
    var productObjArray = []

    $(context).each(function(i, element) {
      try{
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
            // console.log('priceStr', priceStr)
            // console.log('priceFloat', priceFloat)

            // console.log('imgSrc:', imgSrc)

            // productObjArray.push({productName: name, priceFloat:priceFloat, link:link, imgSrc:imgSrc})
            var newProduct = new Product.AliBabaProduct({productName:productName, imgSrc:imgSrc, fullName: null,  priceFloat: priceFloat, link: link})
            productObjArray.push(newProduct.getAsObject())
        }
      }
      catch(err){
        console.log('error in aliBaba scraper with item', i )//, 'err:', err)
      }
    });
    return productObjArray
}

function aliExpressUrlFormulator(searchStrRaw){
  const baseURL = 'https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20181125090215&SearchText='
  const endURL = ''
  // https://www.aliExpress.com/products/bunnies.html?spm=a2700.galleryofferlist.galleryFilter.10.1875f28e97phew&IndexArea=product_en&viewtype=L
  var searchTermsProcessed = searchStrRaw.trim()
  searchTermsProcessed = searchTermsProcessed.replace(' ', '+')
  const finalURL = baseURL+searchTermsProcessed+endURL
  console.log('aliExpress finalURL', finalURL)
  return finalURL
}

async function aliExpressHtmlParser(html){  //construct the url
  var $ = cheerio.load(html);
  const context = 'div[class=item]'
  var productObjArray = []

  $(context).each(function(i, element) {
      if (i<scrapeProductLimit){
          //could try different ways to speed this up like locating a smaller element and looking by parent/child/next
          var fullName = $(element).find('a.history-item.product').attr('title')
          var productName = $(element).find('a.history-item.product').text()
          var linkRaw = $(element).find('a.history-item.product').attr('href')
          var link = 'https://'+linkRaw.trim().substring(2)
          var imgSrc = $(element).find('img.picCore.pic-Core-v').attr('src')
          var priceStrRaw = $(element).find('span.value').text().trim()
          // console.log('priceStrRaw', priceStrRaw)
          priceReg = /([\d\.]+)(?!.*([\d\.]+))/ //matches the last occurence of a combo of digits and '.' ie. [\d\.]+
          const priceStr = priceStrRaw.match(priceReg)[0] 
          const priceFloat = parseFloat(priceStr)
          // console.log('i', i)
          // console.log('fullName: ', fullName)
          // console.log('productName: ', productName)
          // console.log('imgSrc: ', imgSrc)
          // console.log('priceFloat =', priceFloat)
          // productArray.push({productName: productName, priceFloat:priceFloat, link:link, imgSrc:imgSrc})
          var newProduct = new Product.AliExpressProduct({productName:productName, imgSrc:imgSrc, fullName: fullName,  price: priceFloat, link: link})
          productObjArray.push(newProduct.getAsObject())
      }
  });

  console.log('--------------------------------------------------------=====----------===', productObjArray)
  return productObjArray

}

function amazonUrlFormulator (searchStrRaw){
  const baseURL = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords='
  const middleURL = '&rh=i%3Aaps%2Ck%3A'
  var searchStrProcessed = searchStrRaw.trim()
  searchStrProcessed = searchStrProcessed.replace(' ', '+')
  const finalURL = baseURL+searchStrProcessed+middleURL+searchStrProcessed
  return finalURL
}

// asynchronously gets HTML with a get request to finalURL
// has special settings need to not get blocked by Amazon (still often has problems getting Amazon HTML)
async function amazonHtmlGetter(finalURL){
  var html = await new Promise(function(resolve, reject) {
    // Do async job
    var customHeaderRequest = request.defaults({
      headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'authority': 'www.amazon.com',
    'method': 'GET',
    // 'path': '/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=pot&rh=i%3Aaps%2Ck%3Apot',
    'scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    // 'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': 's_fid=241FF7F512B4EA97-345EC14AB81B98C5; p2ePopoverID_154-8735388-4092314=1; s_vnum=1936144904372%26vn%3D3; spblockdate=1520955346754; ca=AFIRAAYAkyIAUhJEBAkIBQA=; _mkto_trk=id:365-EFI-026&token:_mch-amazon.com-1536252756490-95111; aws-priv=eyJ2IjoxLCJldSI6MCwic3QiOjB9; aws-target-static-id=1536252762945-431361; aws-target-data=%7B%22support%22%3A%221%22%7D; aws-target-visitor-id=1536252762949-548026.17_36; AMCV_4A8581745834114C0A495E2B%40AdobeOrg=-330454231%7CMCIDTS%7C17835%7CMCMID%7C12237552750800646140598858977692009775%7CMCOPTOUT-1540930114s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C3.1.2; s_lv=1540922915346; regStatus=registering; aws-business-metrics-last-visit=1540941526647; aws-ubid-main=188-6412368-7067482; session-id=138-9501001-0379028; ubid-main=186-7473862-9318321; x-main=6dkAR3IRmCnTdopqIEmtDSMUJCo72khR; at-main=Atza|IwEBIAg4-SACjwc-abXwnup93QuI0ws_plabQPHXfsFivrIygDiXNHmo7gz7ylzgIKZP2neoWNH9qnt1ro0sCaugTenxuBrZgwW4HKAF_af4gUYZ4KrsCK8BFj66uCt9-FJlUUZPz2_Xz3lNNSLOhjUKll5c3r3A4F85QEdWw_oVa7K-I5dWYxUeYAVcb2nhEkCOLXp9N5b9AX3z_WmGN4w9Wos8yluumC-JnLzZYf0XyixFMi8h4mvLuWyydkUxb11SdmV6fUiviijMWuhmWyjtk4iam22ib-v8SXTiJqIMPPmRrM-KN8H8dhjQj0Nk_j924ZoLlrh_7LxKitqbfEsjL4qrq_1gSwYYleHlEIajWLCGZzPywVmKtcLIH-wRfGfTcTQ892736zaHNA2uKD2QgYFQ; sess-at-main="3ms3eo47QpKScGh1+978CoJEGeLuG/HzbOw6oYNOJ30="; sst-main=Sst1|PQEJ1QgLJjMFURfktbyD06ESC8QW8lF62sUD7erJJkV-stPtmdRH5ueVDhvi1gC3jFjuWq9YuujlaqPVivPM74a_WZ6_gpCVzMvu9F2Ln7Fl0wUEiAAlV3eDIYF2jAiAopMjGNi8x_HmNrex1eRxnigy7PxrjWAzUhWTmM3WPXL5ZBxFkbbRYpxtn2yg3VLODRAKlxx4dLHXKyZiS_f7mrernhyNkwKBpSrKIN--fL3Uv2kOxbS9TgLNjjKDZnE9tSvIaeX81FRmFJW8McZsvsacaFs58P_DBsW5Nf27jW4pD7hnHoZkZZpkEsZNMhth2PaEK39BoG4l4mfJumcJpL-G-Q; lc-main=en_US; x-wl-uid=17sf7Z/hkAeIu1/HctlGTyopTlxTphCbG5lhMklyL8H1JQa8fvr1B4LuNtJa/Pj/hUOdMFBPbw4T2asSenS/LVclLrdIpRFU8bp9+quxLZUU4tpdUYld7l6b9yXEPLwJ6ILQg4WLMoMQ=; session-id-time=2082787201l; s_vn=1567788763454%26vn%3D8; s_dslv=1543292100915; s_nr=1543292100920-Repeat; session-token=/I7qnuIvpvRtYHse3Q/krWYe09LH9z8qYQUwTu3T+XQzOz1S3SxCmGUYXsr7i6v4wqcBd+S2z14sS8RY35+70JB0la3uVXl3ePvNX70H6rVUlvlZMGnl34YPOZiTz6p7H4i9jnKgRhrsemFVN8toGqjGWycsmOhT8C5RXNUrupGtVJHxIhjgQ9ioD5yckWSvCk7O8BvEAFjCG9tBN4rE1x8Uvx2+L5Cd+BPBu8uIICNhwng9bzyJynJVA8AUNIGkJRxzVpUx0psmde2kx+xh8A==; csm-hit=tb:PQ2B5TGYHRQR9XKM7PTT+s-PQ2B5TGYHRQR9XKM7PTT|1544366239621&adb:adblk_yes&t:1544119977559',
    'dnt': '1',
    'upgrade-insecure-requests': '1',
    }
  })

customHeaderRequest.get(finalURL, function(err, response, html){
  // console.log('response', response)
  response=response||{}
  if (err || response.statusCode != 200) {
      console.log('couldnt get firts html. response.status code is', response.statusCode)
      // console.log(response)
      reject(err);
  } else {
      // console.log(response)
      resolve(html);
  }
  });
})

// write the html to a file
  // var fs = require('fs');
  // fs.writeFile("tempHtml.html", html, function(err) {
  //     if(err) {
  //         throw err
  //         // return console.log(err);
  //     }
  
  //     console.log("The file was saved!");
  // }); 
return html
}

async function amazonHtmlParser(html){
  // helper. Scrapes a particular product URL
  async function scrapeAmazonProductURL (productName, url) {
    try {
        console.log('url', url)
        var html = await new Promise(async function(resolve, reject) {
            // Do async job
            request.get(url, function(err, response, html) {
                response = (response||{})
                if (err || response.statusCode != 200) {
                    console.log('problem getting second amazon html response.status code is', response.statusCode)
                    reject(err);
                } else {
                    resolve(html);
                }
            })
        }).catch(err=>{
            console.log('caught IT')
            return 'my new html'
        });
  
        if (html=='my new html'){
          // var newProduct = new Product.Product().getAsObject()
          return null
            // return {productName:productName, primaryRank:-1, priceFloat:-1, stripeSrc:''}
        }
        // write the html to a file
        // var fs = require('fs');
        // fs.writeFile("tempHtml.html", html, function(err) {
        //     if(err) {
        //         throw err
        //         // return console.log(err);
        //     }
        
        //     console.log("The file was saved!");
        // }); 
  
        var $ = cheerio.load(html);
  
        //could gather more data like the rank in other catagories as well as the catgory in which the item is being ranked
        rankReg = new RegExp('(?<=\#)(.*?)(?=[ ])', 'g')//matches the string following a hashtag
        const rankRootID = '#SalesRank'
        const rankInclusiveText = $(rankRootID).text()
        // console.log('rank', rankInclusiveText)
        const matches = rankInclusiveText.match(rankReg) 
        primaryRank = matches[0] //for now the other rankings are not used
        // console.log('primaryRank', primaryRank)
  
        const priceRootID = '#priceblock_ourprice'
        priceStr = $(priceRootID).text()
        console.log('priceStr', priceStr)
        const priceFloat = parseFloat(priceStr.substring(1))
        console.log('priceFloat', priceFloat)
        itemCodeReg = /(?<=\dp\/\B|dp\/\b)(.*?)(?=\/ref\B|\/ref\b)/ //matches the first instance between dp/ and ref
        const itemCode = url.match(itemCodeReg)[0] 
        console.log('item code =', itemCode)
        
        imgSrc = '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' +itemCode+ '&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=productrese0c-20&language=en_US'
        link = 'https://www.amazon.com/produce-aisle-3802105-Russet-Potatoes/dp/' + itemCode+ '/ref=as_li_ss_il?ie=UTF8&qid=1544369764&sr=8-4&ppw=fresh&keywords=potato&linkCode=li2&tag=productrese0c-20&linkId=d66978d313e7a01d03898fd656f58cd8&language=en_US'

        var newProduct = new Product.AmazonProduct({productName:productName, imgSrc:imgSrc, fullName: null,  priceFloat: priceFloat, specialName1:'Rank', specialValue1:primaryRank, link: link})
        return (newProduct.getAsObject())

        // return ({productName:productName, primaryRank:primaryRank, priceFloat:priceFloat, 
        //     stripeSrc:stripeSrc})
  
    } catch (error) {
        console.log('there was an error getting the price/rank. Probably this was an unusual content type', error)
        return null//new Product.Product().getAsObject()
    }
  }
  // helper: makes a get request to amazon's search page and returns a list of the URLs returned. 
  // Amazon's formatting of their product pages is not uniform so some of these URLs will cause 
  // an Error to be thrown and caught by ScrapeAmazonProductURL
  async function scrapeAmazonSearch (html){
    var $ = cheerio.load(html);
    //<a class="a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal" title="Pandas Cookbook: Recipes for Scientific Computing, Time Series Analysis and Data Visualization using Python" href="/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&amp;adId=A090032828WWURM8SVJPM&amp;url=https%3A%2F%2Fwww.amazon.com%2FPandas-Cookbook-Scientific-Computing-Visualization%2Fdp%2F1784393878%2Fref%3Dsr_1_1_sspa%3Fie%3DUTF8%26qid%3D1541129158%26sr%3D8-1-spons%26keywords%3Dpandas%26psc%3D1&amp;qualifier=1541129158&amp;id=6772343048897330&amp;widgetName=sp_atf"><h2 data-attribute="Pandas Cookbook: Recipes for Scientific Computing, Time Series Analysis and Data Visualization using Python" data-max-rows="2" class="a-size-medium s-inline  s-access-title  a-text-normal"><span class="a-offscreen">[Sponsored]</span>Pandas Cookbook: Recipes for Scientific Computing, Time Series Analysis and Data Visualization using Python</h2></a>
    const context = 'a.a-link-normal.s-access-detail-page.s-color-twister-title-link.a-text-normal'
    var productArray = []
    $(context).each(function(i, element) {
        console.log('i', i)
        var gotEl = $(element)
        var linkURL = gotEl.attr('href')
        const isSponsored = (linkURL.substring(0,57) === '/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_' )
        if (isSponsored){
            linkURL= 'https://www.amazon.com/'+linkURL
        }
        var productName = gotEl.attr('title')
        console.log('prodcutName:', productName)
        productArray.push({productName:productName, linkURL:linkURL, isSponsored:isSponsored})
    })
  return productArray
  }

  var resultsLst = await scrapeAmazonSearch(html)
  console.log('resultsLst',resultsLst)
  var productObjLst = []
  var errorLst = []
  for (let i=0; i<Math.min(scrapeProductLimit, resultsLst.length); i++){
      let resultObj = resultsLst[i]
      console.log(i)
      var productObj = (await scrapeAmazonProductURL(resultObj.productName, resultObj.linkURL))||{}
      //only include perfect responses. Later I can go back and improve the parsing
      console.log('productObj', productObj)
      // console.log('productObj.priceFloat',productObj.priceFloat)
      // console.log('productObj.priceFloat!=null',productObj.priceFloat!=null)
      // console.log(productObj.productName!=null, productObj.productName != '', productObj.specialValue1!=null, productObj.specialValue1 != -1,  productObj.priceFloat!=null, productObj.priceFloat != -1)

      if (productObj.productName!=null && productObj.productName != '' && productObj.specialValue1!=null && productObj.specialValue1 != -1 &&  productObj.priceFloat!=null && productObj.priceFloat != -1){
          productObjLst.push(productObj)
          console.log('true')
      }else{
          errorLst.push(resultObj)
      }
  }
  // console.log('errorLst', errorLst)
  console.log('num success:', productObjLst.length, 'num failed:', errorLst.length)

  productObjLst.sort(function(a, b){return a.specialValue1 - b.specialValue1});

  return productObjLst
}
