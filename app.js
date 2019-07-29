const express = require('express')
const port = 8888
const localhost = 'localhost'
const upload = require('express-fileupload')
const fs = require("fs")
const sha1 = require('sha1')
// const caesar  = require('caesar-encrypt')

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

var app = express()

app.use(upload())

app.get('/', function (req, res) {
  res.send(`
    <h1>Fazer upload do Arquivo answer.json</h1>
    <!-- 
      Para enviar uma requisicao para a API do Codenation voce precisara de um cadastro na plataforma deles e pegar o seu TOKEN.
      Vc substituira o action do form que esta como '/' para https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=SEU_TOKEN
      e pronto estara funcionando.
    -->
    <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="answer" id="answer">
      <input type="submit" value="Upload" name="submit">
    </form>
    <br/>
    <hr/>
    <h1>Gerar novo JSON com a mensagem decifrada e resumo criptografico</h1>
    <form action='/generateFileJson' method='get'>
      <button type='submit'>Gerar</button>
    </form>
  `)
})

app.post('/', function (req, res) {
  if (req.files) {
    var file = req.files.answer
    var filename = file.name
    file.mv('./upload/' + filename, function (err) {
      if (err) {
        console.log(err)
        res.send('Erro ao fazer upload')
      } else {
        res.send('Upload com sucesso')
      }
    })
  }
})

app.get('/generateFileJson', (req, res) => {
  generateFileJson().then(resp => {
    res.send(resp)
  })
})

function generateFileJson() {
  return new Promise((resolve, reject) => {
    fs.readFile("./answer.json", "utf8", function (err, data) {
      if (err) {
        console.log("Erro ao ler arquivo")
        reject('Erro!')
      } else {
        var jsonData = JSON.parse(data) // faz o parse para json

        jsonData.decifrado = getTextDecifrado(alphabet, jsonData.numero_casas, jsonData.cifrado) //caesar.encrypt(jsonData.cifrado, jsonData.numero_casas)

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

function getTextDecifrado(alphabet, numero_casas, cifrado) {
  var retorno = ''
  for (let index = 0; index < cifrado.length; index++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (alphabet[j] == cifrado[index]) {
        if ((j + numero_casas) > 25) {
          var idx = (j + numero_casas) - 26
          retorno += alphabet[idx]
        } else {
          retorno += alphabet[j + numero_casas]
        }
        break
      } else if (cifrado[index] == " " || cifrado[index] == ".") {
        retorno += cifrado[index]
        break
      }
    }
  }
  return retorno
}

app.listen(port, () => {
  console.log(`Server rodando aqui: http://${localhost}:${port}`)
})