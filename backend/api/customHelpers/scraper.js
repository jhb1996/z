//note, any arg which = None gets overwitten by the variable default
function Product (name = 'creationDefaultName', img = 'https://placeimg.com/200/200/arch',
  fullName = 'creationDefaultFullName', price = -1, link = 'https://yahoo.com',
  specialName1 = 'creationDefaultSpecialName1', specialValue1 = -1,
  specialName2 = 'creationDefaultSpecialName2', specialValue2 = -1) {
  // console.log(name, img, fullName, price, link, specialName1, specialValue1, specialName2, specialValue2)
  this.name = name
  this.img = img
  this.fullName = fullName
  this.price = price
  this.link = link
  this.specialName1 = specialName1
  this.specialValue1 = specialValue1
  this.specialName2 = specialName2
  this.specialValue2 = specialValue1
  return this
}

var test = 'testy'

//export default creates problems when running the code directly through node.
// export default {
//   Product: Product,
//   test
// }

//allows direct importing without creating a model
// export default Product

function Scraper(urlFormulator, scrapingFunction){
  console.log('Scraper called')
}

module.exports = {
  Scraper: Scraper
}
