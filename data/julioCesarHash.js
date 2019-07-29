module.exports = function hash(numero_casas, cifrado){
  let hash = ''
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  for (let i = 0; i < cifrado.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (alphabet[j] == cifrado[i]) {
        if ((j + numero_casas) > 25) {
          hash += alphabet[(j + numero_casas) - 26]
        } else {
          hash += alphabet[j + numero_casas]
        }
        break
      } else if (cifrado[i] == " " || cifrado[i] == ".") {
        hash += cifrado[i]
        break
      }
    }
  }
  return hash
}