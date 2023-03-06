const { Router } = require('express');
const getAllPokemon = require('../Controllers/Pokemon/getAllPokemon');
const {Pokemon, Type} = require('../db')
const getApiType = require('../Controllers/Type/getApiType')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');np

const axios = require("axios");
//const { types } = require('pg');


const router = Router();

router.get('/getAll', async(req, res) => {

        const{name} = req.query
        let pokeTotal = await getAllPokemon(name);
        if(name){
          console.log(name)
           let pokeNombre =await pokeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); 
           //ejemkplo busqueda http://localhost:3001/getAll?name=bolbasour
             pokeNombre.length ? 
            res.status(200).send(pokeNombre) : 
            res.status(400).send ('No existe el Pokemon')
        }else{
            res.status(200).send(pokeTotal)
        }    
}); 

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const pokemonTotal = await getAllPokemon()
    if(id){
        let pokemonId = await pokemonTotal.filter(el => el.id == id)
        pokemonId.length ?
        res.status(200).json(pokemonId) : 
        res.status(404).send('No encontre Pokemon con ese Id')
    }

}); 

router.get('/getAll/types', async (req, res) => {
  const everyType = await getApiType()
   
   everyType.forEach((el) => {
       Type.findOrCreate({where: {name : el}})
   })
   const allTypes = await Type.findAll();
   res.status(200).send(allTypes)   
})

router.post('/pokemons', async(req, res) => {
    const {name,img,hp,ataque,types,altura,peso,defensa}=req.body;

    if(!name || !img || !hp || !ataque || !types ||!altura || !peso||!defensa) 
    return res.status(400).json({msg:"Faltan datos"});

    
    try {
      const obj = {name,img,hp,ataque,types,altura,peso,defensa}
      const nuevoPokemon= await Pokemon.create(obj) 
      const typeDb = await Type.findAll({
        where: {name : types}

      })
      nuevoPokemon.addTypes(typeDb);
      
      
      res.send(nuevoPokemon);
      console.log(nuevoPokemon)

      
      
    } catch (error) {
      console.log(error)
    }
});
   

module.exports = router;

