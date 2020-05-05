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

router.post('/ProductKeybyId', async(req, res) => {

  try {
    const products = await Product.find({
      _id: req.body._id
    })
    
    return res.status(200).json({
      nome: products[0].nome,
      key: products[0].key
    })

  } catch (error) {
      return res.status(400).json(error)
  }
})

module.exports = router