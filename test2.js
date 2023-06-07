const { Encryptor } = require("./index.js");

const getEncryptor = async (resource) => {
  let response = await fetch(resource);
  let result = await response.json();
  return result;
}

( async () => {
  let encryptor = await getEncryptor("http://localhost:8000/__test__/encryptor.json");
  let text = "some encrypted text...";
  let formats = encryptor.formats;
  let result = Encryptor.decrypt(text, encryptor.formats); // return object
  
  console.log(result); // string of decrypted contents
  
})();