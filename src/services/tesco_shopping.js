import {authTescoHeader} from "../_helpers/auth_header";

export function get_product_data(ean_barcode) {
  const requestOptions = {
    method: 'GET',
    headers: authTescoHeader(),
  }
  return fetch(`https://dev.tescolabs.com/product/?gtin=${ean_barcode}`, requestOptions)
    .then((response) => response.json())
    .then((product_data) => {
      return product_data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok){
      if (response.status === 401){
        location.reload(true);
      }

      const error = (data && data.message()) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}