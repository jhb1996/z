var Classes = require('./classes')

// import Classes from '@/classes/classes'
var Product = Classes.Product

var serverObj = {imgSrc: '//sc02.alicdn.com/kf/HTB1oEqbd8HH8KJjy0Fbq6AqlpXaP/sweet-potato-price-ton.jpg_220x220.jpg',
  link: 'www.alibaba.com/product-detail/sweet-potato-price-ton_60713184581.html?s=p',
  priceFloat: 615,
  productName: 'sweet potato price ton'}

var product = new Product(serverObj.productName, serverObj.img, serverObj.fullName, serverObj.priceFloat, serverObj.link, serverObj.specialName1, serverObj.specialValue1, serverObj.specialName2, serverObj.specialValue2)

console.log(product)
