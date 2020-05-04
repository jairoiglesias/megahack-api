const express = require('express')
const router = express.Router()
const {model} = require('mongoose')
const Ads = model("Ads");

router.get('/get-all', async (req, res) => {

  try {
    const ads = await Ads.find({})
    
    return res.status(200).json(ads)

  } catch (error) {
      return res.status(400).json(error)
  }

})

module.exports = router