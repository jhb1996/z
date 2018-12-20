function Product ({productName = 'productDefaultName', imgSrc = 'https://vectors.pro/wp-content/uploads/2017/10/aliexpress-logo-vector.png',
  fullName = 'productDefaultFullName', priceFloat = -1, link = 'https://yahoo.com',
  specialName1 = 'productDefaultSpecialName1', specialValue1 = -1,
  specialName2 = 'productDefaultSpecialName2', specialValue2 = -1}={}) {
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

function AliBabaProduct (obj) {
  var {productName = 'aliBabaDefaultName', imgSrc = '@/assets/aliBabaLogo.png',
  fullName = 'aliBabaDefaultFullName', priceFloat = -1, link = '',
  specialName1 = 'aliBabaDefaultSpecialName1', specialValue1 = -1,
  specialName2 = 'aliBabaDefaultSpecialName2', specialValue2 = -1} = obj 
  Product.call(this, {productName:productName, imgSrc:imgSrc, fullName:fullName, priceFloat:priceFloat, link:link,
    specialName1:specialName1, specialValue1:specialValue1, specialName2:specialName2, specialValue2:specialValue2});
  }

function AliExpressProduct (obj) {
  var {productName = 'aliExpressDefaultName', imgSrc = 'https://vectors.pro/wp-content/uploads/2017/10/aliexpress-logo-vector.png',
  fullName = 'aliExpressDefaultFullName', priceFloat = -1, link = '',
  specialName1 = 'aliExpressDefaultSpecialName1', specialValue1 = -1,
  specialName2 = 'aliExpressDefaultSpecialName2', specialValue2 = -1} = obj 
    Product.call(this, {productName:productName, imgSrc:imgSrc, fullName:fullName, priceFloat:priceFloat, link:link,
    specialName1:specialName1, specialValue1:specialValue1, specialName2:specialName2, specialValue2:specialValue2});
  }

function AmazonProduct (obj) {
  var {productName = 'amazonDefaultName', imgSrc = '@/assets/amazonLogo.png',
  fullName = 'amazonDefaultFullName', priceFloat = -1, link = '',
  specialName1 = 'amazonDefaultSpecialName1', specialValue1 = -1,
  specialName2 = 'amazonDefaultSpecialName2', specialValue2 = -1} = obj 
    Product.call(this, {productName:productName, imgSrc:imgSrc, fullName:fullName, priceFloat:priceFloat, link:link,
    specialName1:specialName1, specialValue1:specialValue1, specialName2:specialName2, specialValue2:specialValue2});
  }

module.exports = {
  Product: Product,
  AliBabaProduct: AliBabaProduct,
  AliExpressProduct: AliExpressProduct,
  AmazonProduct: AmazonProduct,


}