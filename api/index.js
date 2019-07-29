const gerarArquivo = require('../functions/gerarArquivo')
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/upload', function (req, res) {
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

router.get('/generateFileJsonCipher', (req, res) => {
  gerarArquivo.cipher().then(resp => {
    res.send(resp)
  }).catch((err)=>{
    console.log(err)
    res.send('Erro ao gerar o arquivo')
  })
})

router.get('/generateFileJsonDecipher', (req, res) => {
  gerarArquivo.decipher().then(resp => {
    res.send(resp)
  }).catch((err)=>{
    console.log(err)
    res.send('Erro ao gerar o arquivo')
  })
})

module.exports = router