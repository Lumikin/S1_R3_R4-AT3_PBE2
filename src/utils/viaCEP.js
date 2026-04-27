import axios from "axios";

export default async function viaCEP(cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await axios.get(url)
    return response
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocorreu um erro na API",
    });
  }
}
