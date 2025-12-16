import  axios  from "axios";

const options = {
  method: 'GET',
  url: 'https://ecommerce-api3.p.rapidapi.com/mobiles',
  headers: {
    'x-rapidapi-key': '6c83832115msh8eaa33f5caefed5p1e48f3jsn1347f3d75c7c',
    'x-rapidapi-host': 'ecommerce-api3.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
        return response.data;
	} catch (error) {
		console.error(error);
        return error;
	}
}



export default fetchData;