const express = require('express')
const router = express.Router()
const {model} = require('mongoose')

const Product = model('Product');
const Ads = model('Ads')


function formatMessage(fieldName, value){
  
  let msg = ''

  if(fieldName == 'quantidade'){
    msg = `Tenho em estoque ${value} unidade(s)`
  }
  else if(fieldName == 'cor'){
    msg = `A cor disponível é ${value}`
  }
  else if(fieldName == 'garantia'){
    msg = `a garantia é de ${value}`
  }
  else if(fieldName == 'notaFiscal'){
    msg = value == true ? `Nosso produto possui Nota Fiscal` : `Apenas o comprovante de venda.`
  }
  else if(Array.isArray(value)){
    msg = `Nao achei exatamente o produto que possui as caracteristicas que voce deseja. Tenho essas opcões no momento: \n${value}`
  }

  return msg
}

router.post('/find', async (req, res) => {

  try {
    
    const {body} = req

    console.log(body)

    const arrayData = body.Question.split('_')

    const fieldName = body.Action

    // Try Parse ProductId and AdsId (TEST 2)
    const separators = ['P', 'A'];
    const numbers = arrayData[0].split(new RegExp(separators.join('|'),'g'))
    const _number = numbers.filter(num => num != "")
    const productId = _number[0]
    const adsId = _number[1]

    console.log('TESTANDO PRIMEIRO METODO ...')

    const ads = await Ads.find({
      key: adsId
    })      
    
    const adsJSON = ads.map(ItemAds => {
      const temp = ItemAds.toJSON()
      return temp
    })

    // Check Property Exists
    const itemAds = adsJSON[0]
    var actionValue = itemAds[fieldName]

    if(actionValue != undefined){

      const message = formatMessage(fieldName, actionValue)

      return res.status(200).send({
        message
      })
    }

    console.log('NAO LOCALIZADO!')
    console.log('====================================')
    console.log('TESTANDO SEGUNDO METODO ...')

    const products = await Product.find({
      key: productId
    })

    const productsJSON = products.map(prod => {
      const temp = prod.toJSON()
      return temp
    })

    // Check Property Exists
    const itemProduct = productsJSON[0]
    var actionValue = itemProduct[fieldName]

    if(actionValue != undefined){
      const message = formatMessage(fieldName, actionValue)
      return res.status(200).send({
        message
      })
    }

    console.log('NAO LOCALIZADO!')
    console.log('====================================')
    console.log('TESTANDO TERCEIRO METODO ...')

    // Tenta procurar algum produto relacionado para sugerir para o cliente

    const productsSuggested = await Product.find({
      tipo: itemProduct.tipo,
      subTipo: itemProduct.subTipo,
    })


    const productsSuggestedJSON = productsSuggested.map(prod => {
      const temp = prod.toJSON()
      return temp
    })
    // console.log('productsSuggested', productsSuggested)

    const matchProductsSuggested = productsSuggestedJSON.filter(prodSuggested => {
      return prodSuggested[fieldName] != undefined
    })

    console.log('=============================')
    console.log('matchProductsSuggested', matchProductsSuggested)

    if(matchProductsSuggested.length == 0){
      return res.status(200).json({
        message: "Não foi possivel localizar opcoes"
      })
    }
    else{

      const msg = formatMessage(fieldName, matchProductsSuggested)

      return res.status(200).json({
        message: matchProductsSuggested
      })
    }

    // console.log(itemProduct)
    // console.log('actionValue', fieldName, actionValue)
    // console.log('===========')
    // console.log(productsJSON)
    
    // const item = products[0].toJSON()


    // console.log(products[0])
    // console.log('============')
    // console.log(item)
    // console.log(Object.keys(item))
    // console.log(item.hasOwnProperty('nome'))
    
    // return res.status(200).json(products)

  } catch (error) {
    console.log(error)
      return res.status(400).json(error)
  }

})

module.exports = router