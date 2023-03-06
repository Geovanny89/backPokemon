//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const server = require('./src/app.js');
// const getApiPokemon= require ('./src/Controllers/Pokemon/getAllPokemon')
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, async() => {
    
//     await getApiPokemon();
//     console.log('Base cargada'); // eslint-disable-line no-console
//   });
// });
let dotenv = require('dotenv');
dotenv.config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001
// Syncing all the models at once.
conn.sync({ alter: true }).then( () => {
  server.listen(PORT, () => {
    console.log("Server escuchando en el puerto 3001"); // eslint-disable-line no-console
  });
});
