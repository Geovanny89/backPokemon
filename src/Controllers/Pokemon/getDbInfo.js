const axios = require("axios");
const {Pokemon, Type} = require('../../db') 

const getDbInfo = async() => {
    const data = (await Pokemon.findAll({ 
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }
      })).map(pokemon => {
        const json = pokemon.toJSON();
        return{
          ...json,
          types: json.types.map( type => type.name)
        }
      });
      
      return data
    
}

module.exports= getDbInfo;