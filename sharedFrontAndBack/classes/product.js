function Product ({productName = 'aaacreationDefaultName', imgSrc = './assets/aliExpressLogo.png',
  fullName = 'creationDefaultFullName', priceFloat = -1, link = 'https://yahoo.com',
  specialName1 = 'creationDefaultSpecialName1', specialValue1 = -1,
  specialName2 = 'creationDefaultSpecialName2', specialValue2 = -1}={}) {
  // console.log(name, img, fullName, priceFloat, link, specialName1, specialValue1, specialName2, specialValue2)
  this.productName = productName
  this.imgSrc  = imgSrc 
  this.fullName = fullName
  this.priceFloat = priceFloat
  this.link = link
  this.specialName1 = specialName1
  this.specialValue1 = specialValue1
  this.specialName2 = specialName2
  this.specialValue2 = specialValue2
  // return this
  this.getAsObject = function(){
    return {productName: productName,
      imgSrc : imgSrc,
      fullName: fullName,
      priceFloat: priceFloat,
      link: link,
      specialName1: specialName1,
      specialValue1: specialValue1,
      specialName2: specialName2,
      specialValue2: specialValue2}
  }
}

module.exports = {
  Product: Product
}