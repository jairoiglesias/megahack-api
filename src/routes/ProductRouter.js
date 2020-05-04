const express = require('express')
const router = express.Router()
const {model} = require('mongoose')
const Product = model("Product");
const randomstring = require("randomstring");

// console.log(randomstring.generate({
//   length: 6,
//   charset: 'numeric'
// }))

router.get('/get-all', async (req, res) => {

  try {
    const products = await Product.find({})
    
    return res.status(200).json(products)

  } catch (error) {
      return res.status(400).json(error)
  }

})

module.exports = router