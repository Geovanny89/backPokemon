const axios = require("axios");
const { Type } = require("../../db");

const getApiType = async () => {
  const apiInfo = await axios.get('https://pokeapi.co/api/v2/type');
  const types = apiInfo.data.results
  const everyType = types.map((el)=>{return el.name})
  return everyType
  
};


module.exports = getApiType;