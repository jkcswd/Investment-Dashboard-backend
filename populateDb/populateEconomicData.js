require('dotenv').config();
const fetch = require('node-fetch')

const fetchFredData = async () => {
  try{
    const response = await fetch(`https://api.stlouisfed.org/fred/series?series_id=HPIUKA&api_key=${process.env.API_KEY}&file_type=json`)
    const data = await response.json()

    console.log(data)
    return data;
  }catch (err) {
    console.log(err.message)
  }
}

fetchFredData();