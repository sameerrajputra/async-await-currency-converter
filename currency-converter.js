const axios = require('axios');

const getExchangeRate = (to) => {
	return axios.get('http://data.fixer.io/api/latest?access_key=31c2a0c142c77c70c7598902e146ffb6').then((response) => {
		return response.data.rates[to];
	});
};

const getCountries = (currencyCode) => {
	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
		return response.data.map((country) => country.name);
	});
}

const convertCurrency = (to, amount) => {
	var countries;
	return getCountries(to).then((tempCountries) => {
		countries = tempCountries;
		return getExchangeRate(to);
	}).then((rate) => {
		const exchangedAmount = rate * amount;

		console.log(`${amount}EUR is worth ${exchangedAmount} ${to}.You can spend them in the following countries : ${countries}`);
	})
}

const convertCurrencyAlt = async (to, amount) => {
	var countries = await getCountries(to);
	var rate= await getExchangeRate(to);

	const exchangedAmount = rate * amount;

	console.log(`${amount}EUR is worth ${exchangedAmount} ${to}.You can spend them in the following countries : ${countries}`);
}

convertCurrency('CAD', 500);
convertCurrencyAlt('CAD', 500);

// getExchangeRate('CAD').then((rate) => {
// 	console.log(rate);
// });

// getCountries('USD').then((countries) => {
// 	console.log(countries);
// })