
const jsonFile = './data/data.json';

export const getProductosFetch = () => {
    return new Promise((resolve, reject) => {
      fetch(jsonFile)
        .then((res) => {
          if (res.ok) {
            resolve(res.json()); 
          } else {
            reject(res); 
          }
        })
        .catch((err) => {
          reject(new Error(`Error: ${err.status} - ${err.statusText}`));
        })
    });
  };