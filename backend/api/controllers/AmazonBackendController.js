/**
 * AmazonBackendController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async amazonBackend(req,res){
      console.log('AmazonBackend called')
      console.log('req.body', req.body)
      console.log('req.body.inputStr', req.body.inputStr)

      var amazonObjLst = await scrapeAmazon(req.body.inputStr)
      console.log('amazonObjLst', amazonObjLst)
      res.send(amazonObjLst)
    },
};

var request = require('request')
var cheerio = require('cheerio')

async function scrapeAmazon(searchString){
    console.log('searchString:', searchString)
    var resultsLst = await scrapeAmazonSearch(searchString)
    // console.log('res list', resultsLst)
//     var resultsLst = [ { productName: 'Kawaii Plush Potato Spud Buddy',
//     linkURL:
//      'https://www.amazon.com//gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A095193524M36V0IUY4AW&url=https%3A%2F%2Fwww.amazon.com%2FKawaii-Plush-Potato-Spud-Buddy%2Fdp%2FB0744NHZQ3%2Fref%3Dsr_1_1_sspa%2F131-5929189-1874465%3Fie%3DUTF8%26qid%3D1541179492%26sr%3D8-1-spons%26keywords%3Dpotato%26psc%3D1&qualifier=1541179492&id=1481351898240508&widgetName=sp_atf',
//     isSponsored: true },
//   { productName:
//      'Concord Roasted Potato Original Seasoning Mix, 1.25 Oz (Pack of 6)',
//     linkURL:
//      'https://www.amazon.com//gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_2?ie=UTF8&adId=A0852630256ROQ9HR3J9Y&url=https%3A%2F%2Fwww.amazon.com%2FConcord-Roasted-Potato-Original-Seasoning%2Fdp%2FB00MU9AKYK%2Fref%3Dsr_1_2_a_it%2F131-5929189-1874465%3Fie%3DUTF8%26qid%3D1541179492%26sr%3D8-2-spons%26keywords%3Dpotato%26psc%3D1&qualifier=1541179492&id=1481351898240508&widgetName=sp_atf',
//     isSponsored: true },
//   { productName: 'Potato Pearls Excel Mashed Potatoes - 3.37 lb.',
//     linkURL:
//      'https://www.amazon.com/Potato-Pearls-Excel-Mashed-Potatoes/dp/B00513J04I/ref=sr_1_3_a_it/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-3&keywords=potato',
//     isSponsored: false },
//   { productName: 'Potato Stress Toy by ALPI',
//     linkURL:
//      'https://www.amazon.com/Potato-Stress-Toy-by-ALPI/dp/B009CCGVSW/ref=sr_1_5/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-5&keywords=potato',
//     isSponsored: false },
//   { productName: 'POTATOES RUSSET FRESH PRODUCE 5 LBS',
//     linkURL:
//      'https://www.amazon.com/POTATOES-RUSSET-FRESH-PRODUCE-LBS/dp/B007S9ULGY/ref=sr_1_6_a_it/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-6&keywords=potato',
//     isSponsored: false },
//   { productName: 'Ideal Hot Potato Electronic Musical Passing Game',
//     linkURL:
//      'https://www.amazon.com/Ideal-Potato-Electronic-Musical-Passing/dp/B000NX0IQK/ref=sr_1_7/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-7&keywords=potato',
//     isSponsored: false },
//   { productName:
//      'Idahoan Mashed Potatoes Cup, Buttery Homestyle, 1.5 Ounce (Pack of 10)',
//     linkURL:
//      'https://www.amazon.com/Idahoan-Mashed-Potatoes-Buttery-Homestyle/dp/B01JLWGOP2/ref=sr_1_8_a_it/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-8&keywords=potato',
//     isSponsored: false },
//   { productName: 'Bodysocks Adult Potato Fancy Dress Costume',
//     linkURL:
//      'https://www.amazon.com/Bodysocks-Adult-Potato-Fancy-Costume/dp/B074DZHJGG/ref=sr_1_9/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-9&keywords=potato',
//     isSponsored: false },
//   { productName:
//      'French\'s, Potato Sticks, Original, 5oz Canister (Pack of 3)',
//     linkURL:
//      'https://www.amazon.com/Frenchs-Potato-Sticks-Original-Canister/dp/B00FYJ8DUQ/ref=sr_1_10_a_it/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-10&keywords=potato',
//     isSponsored: false },
//   { productName:
//      'Calbee Japan jaga-pockle potato snacks Hokkaido (18g x 10 packs)',
//     linkURL:
//      '/gp/slredirect/picassoRedirect.html/ref=pa_sp_mtf_aps_sr_pg1_1?ie=UTF8&adId=A0607657TOJXI2HPMGG8&url=https%3A%2F%2Fwww.amazon.com%2FCalbee-jaga-pockle-potato-snacks-Hokkaido-x%2Fdp%2FB00CV05Z16%2Fref%3Dsr_1_11_a_it%2F131-5929189-1874465%3Fie%3DUTF8%26qid%3D1541179492%26sr%3D8-11-spons%26keywords%3Dpotato%26psc%3D1%26smid%3DA18YQEXT1XCJXG&qualifier=1541179492&id=1481351898240508&widgetName=sp_mtf',
//     isSponsored: false },
//   { productName: 'Daron Shock Ball Hot Potato Game',
//     linkURL:
//      '/gp/slredirect/picassoRedirect.html/ref=pa_sp_mtf_aps_sr_pg1_2?ie=UTF8&adId=A02714413OMYNUFICIHKQ&url=https%3A%2F%2Fwww.amazon.com%2FDaron-Shock-Ball-Potato-Game%2Fdp%2FB001074TGS%2Fref%3Dsr_1_12_sspa%2F131-5929189-1874465%3Fie%3DUTF8%26qid%3D1541179492%26sr%3D8-12-spons%26keywords%3Dpotato%26psc%3D1&qualifier=1541179492&id=1481351898240508&widgetName=sp_mtf',
//     isSponsored: false },
//   { productName: 'Death By Potato - A Murder Mystery Mashup',
//     linkURL:
//      'https://www.amazon.com/Death-Potato-Murder-Mystery-Mashup/dp/B01MG2FG5T/ref=sr_1_13/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-13&keywords=potato',
//     isSponsored: false },
//   { productName: 'The Guernsey Literary and Potato Peel Pie Society',
//     linkURL:
//      'https://www.amazon.com/Guernsey-Literary-Potato-Peel-Society/dp/0385341008/ref=sr_1_14/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-14&keywords=potato',
//     isSponsored: false },
//   { productName: 'Playskool Mr. Potato Head',
//     linkURL:
//      'https://www.amazon.com/Mr-Potato-Head-27657-Playskool/dp/B005KJE9L2/ref=sr_1_15/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-15&keywords=potato',
//     isSponsored: false },
//   { productName: 'Lay\'s Classic Potato Chips, Party Size! (15.25 Ounce)',
//     linkURL:
//      'https://www.amazon.com/Lays-Classic-Potato-Chips-Party/dp/B01N4OXQ3R/ref=sr_1_16_a_it/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-16&fpw=pantry&keywords=potato',
//     isSponsored: false },
//   { productName: 'Mr Potato',
//     linkURL:
//      'https://www.amazon.com/codenyrd-Mr-Potato/dp/B013XEODO8/ref=sr_1_17/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-17&keywords=potato',
//     isSponsored: false },
//   { productName: 'Kawaii Plush Potato Spud Buddy',
//     linkURL:
//      'https://www.amazon.com/Kawaii-Plush-Potato-Spud-Buddy/dp/B0744NHZQ3/ref=sr_1_18/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-18&keywords=potato',
//     isSponsored: false },
//   { productName: 'Playskool Mr.Potato Head Tater Tub Set',
//     linkURL:
//      'https://www.amazon.com/Playskool-Mr-Potato-Head-Tater-Tub/dp/B00BBVYYXG/ref=sr_1_19/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-19&keywords=potato',
//     isSponsored: false },
//   { productName: 'Bobs Red Mill Flour Gluten Free Potato, 24 Oz, Pack of 1',
//     linkURL:
//      'https://www.amazon.com/Bobs-Red-Mill-Gluten-Potato/dp/B0013JQOKW/ref=sr_1_20_a_it/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-20&keywords=potato',
//     isSponsored: false },
//   { productName:
//      'Top Rated Bellemain Stainless Steel Potato Ricer with 3 Interchangeable Fineness Discs-Full 2-Year Warranty',
//     linkURL:
//      'https://www.amazon.com/Bellemain-Stainless-Interchangeable-Fineness-Discs-Full/dp/B00V8QXNEA/ref=sr_1_21/131-5929189-1874465?ie=UTF8&qid=1541179492&sr=8-21&keywords=potato',
//     isSponsored: false } ]
    var productInfoLst = []
    var errorLst = []
    for (let i=0; i<resultsLst.length; i++){
        let resultObj = resultsLst[i]
        console.log(i)
        var productInfo = await scrapeAmazonProductURL(resultObj.productName, resultObj.linkURL)
        //only include perfect responses. Later I can go back and improve the parsing
        if (productInfo.productName != '' && productInfo.primaryRank != -1 && productInfo.price != -1){
            productInfoLst.push(productInfo)
        }else{
            errorLst.push(resultObj)
        }
    }
    // console.log('errorLst', errorLst)
    console.log('num success:', productInfoLst.length, 'num failed:', errorLst.length)

    productInfoLst.sort(function(a, b){return a.primaryRank - b.primaryRank});

    return productInfoLst
}


/* 
 * returns {productName, primaryRank, price, stripeSrc}
 * 
 */
var scrapeAmazonSearch = async function(searchTerm) {

    //construct the url
    const baseURL = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords='
    const middleURL = '&rh=i%3Aaps%2Ck%3A'
    var fSearchTerms = strip(searchTerm)
    fSearchTerms = fSearchTerms.replace(' ', '+')
    const finalURL = baseURL+fSearchTerms+middleURL+fSearchTerms

    console.log('finalURL', finalURL)
    var html = await new Promise(function(resolve, reject) {
    	// Do async job
        request.get(finalURL, function(err, response, html) {
            response=response||{}
            if (err || response.statusCode != 200) {
                console.log('response:::', response)

                console.log('couldnt get first html. response.status code is', response.statusCode)
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
    // new Promise(function(resolve, reject) {
    // 	// Do async job
    //         if (err) {
    //             console.log('err', err)
    //             reject(err);
    //         } else {
    //             resolve(productArray);
    //         }
    //     })
}


var scrapeAmazonProductURL = async function(productName, url) {
    try {
        console.log('url', url)
        var html = await new Promise(async function(resolve, reject) {
            // Do async job
            request.get(url, function(err, response, html) {
                response = (response||{})
                if (err || response.statusCode != 200) {
                    console.log('problem getting second html response.status code is', response.statusCode)
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
            return {productName:productName, primaryRank:-1, priceFloat:-1, stripeSrc:''}
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
        console.log('primaryRank', primaryRank)


        const priceRootID = '#priceblock_ourprice'
        price = $(priceRootID).text()
        const priceFloat = parseFloat(priceStr)
        console.log('priceFloat', priceFloat)
        itemCodeReg = /(?<=\dp\/\B|dp\/\b)(.*?)(?=\/ref\B|\/ref\b)/ //matches the first instance between dp/ and ref
        const itemCode = url.match(itemCodeReg)[0] 
        console.log('item code =', itemCode)
        
        var stripeSrc = "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=\
1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&\
tracking_id=productrese0c-20&language=en_US&marketplace=amazon&region=US&\
placement=" + itemCode + "&asins=" + itemCode + "&linkId=773c8967780d517a7b83b3d4e573a238&\
show_border=true&link_opens_in_new_window=true"
        return ({productName:productName, primaryRank:primaryRank, priceFloat:priceFloat, 
            stripeSrc:stripeSrc})

    } catch (error) {
        console.log('there was an error getting the price/rank. Probably this was an unusual content type')
        return {productName:productName, primaryRank:-1, priceFloat:-1, stripeSrc:''}
    }
}



function strip(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/** FOR Testing as an indepent file copy everything from here up into an independent file and call nodemon <filename> */

// async function main(){
    //     // //could gather more data like the rank in other catagories as well as the catgory in which the item is being ranked
    //     // rankReg = new RegExp('(?<=\#)(.*?)(?=[ ])', 'g')//matches the string following a hashtag
    //     // const rankRootID = '#SalesRank'
    //     // const rankInclusiveText = $(rankRootID).text()
    //     // // console.log('rank', rankInclusiveText)
    //     // const matches = rankInclusiveText.match(rankReg) 
    //     // primaryRank = matches[0] //for now the other rankings are not used
    //     // console.log('primaryRank', primaryRank)
    
    //     var productInfoLst = await getAmazonData('potato')
    //     console.log('final productInfoLst', productInfoLst)
    //     // const url = 'https://amazon.com//gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A0350809E7EQFII53NW6&url=https%3A%2F%2Fwww.amazon.com%2FDel-Monte-Pull-Top-Golden-15-25-Ounce%2Fdp%2FB078SZM9PT%2Fref%3Dsr_1_1_a_it%3Fie%3DUTF8%26qid%3D1541178055%26sr%3D8-1-spons%26keywords%3Dcorn%26psc%3D1&qualifier=1541178055&id=8572413585308077&widgetName=sp_atf'
    //     // var html = await new Promise(function(resolve, reject) {
    //     // 	// Do async job
    //     //     request.get(url, function(err, response, html) {
    //     //         response=response||{}
    //     //         if (err || response.statusCode != 200) {
    //     //             console.log('couldnt get firts html. response.status code is', response.statusCode)
    //     //             reject(err);
    //     //         } else {
    //     //             resolve(html);
    //     //         }
    //     //     })
    //     // })
    
    
    // }

    // main()