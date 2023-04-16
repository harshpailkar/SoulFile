import axios from "axios"

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/testAuthentication',
  headers: { 
    'Authorization': 'Bearer ' + process.env.REACT_APP_PINATA_SECRET_ACCESS_TOKEN
  }
};

export async function connect() {
    try {
        const res = await axios(config)
        console.log(res.data);
    }
    catch(e) {
        console.error(e)
    }
}