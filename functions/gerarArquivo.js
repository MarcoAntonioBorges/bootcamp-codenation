const fs = require("fs")
const sha1 = require('sha1')
const julioCesarHash = require('../data/julioCesarHash')

module.exports = function generateFileJson() {
  return new Promise((resolve, reject) => {
    fs.readFile('./config/answer.json', 'utf8', function (err, data) {
      if (err) {
        console.log("Erro ao ler arquivo")
        reject(err)
      } else {
        let jsonData = JSON.parse(data)
        
        jsonData.decifrado = julioCesarHash(jsonData.numero_casas, jsonData.cifrado)
        
        jsonData.resumo_criptografico = sha1(jsonData.decifrado)
        
        fs.writeFile("./upload/answer.json", JSON.stringify(jsonData), function (erro) {
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