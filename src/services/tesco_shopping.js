import {authTescoHeader} from "../_helpers/auth_header";
import Axios from "axios";

// const cheerio = require('react-native-cheerio')

// export function get_product_data(ean_barcode) {
//   const requestOptions = {
//     method: 'GET',
//     headers: authTescoHeader(),
//   }
//   let product = null;
//   product = get_from_nase_potraviny(ean_barcode);
//   console.log('try 7', product);
//   console.log('try 8', typeof product);
//   if (typeof product === "string"){
//     return product;
//   } else {
//     fetch(`https://dev.tescolabs.com/product/?gtin=${ean_barcode}`, requestOptions)
//       .then((response) => response.json())
//       .then((product_data) => {
//         product = product_data;
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//     if (product.products === undefined || product.products[0] === undefined) {
//       return null;
//     } else {
//       return product;
//     }
//   }
// }
//
// export function get_product_data(ean_barcode) {
//   Axios.get(`http://www.nasepotraviny.info/${ean_barcode}/`)
//     .then((response) => {
//       const $ = cheerio.load(response.data)
//       let product_name = $('html body div#obsah form.formSearch div.obsah.detail h2').text();
//       if (typeof product_name !== "string"){
//         return Promise.reject('ERROR');
//       } else {
//         console.log(product_name);
//         return Promise.resolve(product_name);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       return Promise.reject(error);
//     });
// }


