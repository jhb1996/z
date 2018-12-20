//Global scraper object
function Scraper(urlFormulator, htmlGetter, htmlParser){
  this.scrapeSearchStr = async function (SearchStrRaw){
    const finalURL = urlFormulator(SearchStrRaw)
    const html = await htmlGetter(finalURL)
    const productObjArr = await htmlParser(html)
    return productObjArr
  }
}


module.exports = {
  Scraper: Scraper
}
