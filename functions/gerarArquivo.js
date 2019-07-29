const fs = require("fs")
const sha1 = require('sha1')
const julioCesarHash = require('../data/julioCesarHash')

module.exports.cipher = function generateFileJsonCipher() {
  return new Promise((resolve, reject) => {
    fs.readFile('./config/decipher.json', 'utf8', function (err, data) {
      if (err) {
        console.log("Erro ao ler arquivo")
        reject(err)
      } else {
        let jsonData = JSON.parse(data)
        
        jsonData.cifrado = julioCesarHash.cipher(jsonData.numero_casas, jsonData.decifrado)
        
        jsonData.resumo_criptografico = sha1(jsonData.decifrado)
        
        fs.writeFile("./upload/cipher.json", JSON.stringify(jsonData), function (erro) {
          if (erro) {
            console.log(erro)
            reject('Erro ao salvar o novo arquivo')
          }
          console.log("Arquivo salvo")
        })
        resolve('Arquivo convertido com sucesso!')
      }
    })
  })
}

module.exports.decipher = function generateFileJsonDecipher() {
  return new Promise((resolve, reject) => {
    fs.readFile('./config/cipher.json', 'utf8', function (err, data) {
      if (err) {
        console.log("Erro ao ler arquivo")
        reject(err)
      } else {
        let jsonData = JSON.parse(data)
        
        jsonData.decifrado = julioCesarHash.decipher(jsonData.numero_casas, jsonData.cifrado)
        
        jsonData.resumo_criptografico = sha1(jsonData.decifrado)
        
        fs.writeFile("./upload/decipher.json", JSON.stringify(jsonData), function (erro) {
          if (erro) {
            console.log(erro)
            reject('Erro ao salvar o novo arquivo')
          }
          console.log("Arquivo salvo")
        })
        resolve('Arquivo convertido com sucesso!')
      }
    })
  })
}