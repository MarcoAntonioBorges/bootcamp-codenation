const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

module.exports.cipher = function cipher(numero_casas, mensagem){
  let hash = ''
  mensagem = mensagem.toLowerCase()
  for (let i = 0; i < mensagem.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (alphabet[j] == mensagem[i]) {
        if ((j + numero_casas) > 25) {
          hash += alphabet[(j + numero_casas) - 26]
        } else {
          hash += alphabet[j + numero_casas]
        }
        break
      } else if (mensagem[i] == " " || mensagem[i] == ".") {
        hash += mensagem[i]
        break
      }
    }
  }
  return hash.toLowerCase()
}

module.exports.decipher = function decipher(numero_casas, mensagem){
  let hash = ''
  mensagem = mensagem.toLowerCase()
  for (let i = 0; i < mensagem.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (alphabet[j] == mensagem[i]) {
        if ((j - numero_casas) < 0) {
          hash += alphabet[(j - numero_casas) + 26]
        } else {
          hash += alphabet[j - numero_casas]
        }
        break
      } else if (mensagem[i] == " " || mensagem[i] == ".") {
        hash += mensagem[i]
        break
      }
    }
  }
  return hash.toLowerCase()
}