import bcrypt from "bcrypt";
// se ejecuta en la terminal con: node generaHash.js

const generarHash = async () => {
  const nuevaPass = "jose1234"; // Contraseña con texto plano
  const hash = await bcrypt.hash(nuevaPass, 10);
  console.log("Hash generado:", hash);
};

generarHash();