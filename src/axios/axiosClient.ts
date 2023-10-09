import axios from 'axios';
import getBaseUrl from './baseUrl';

const client = axios.create({
	baseURL: getBaseUrl(),
	withCredentials: true,
});

client.interceptors.request.use(
	async (config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default client;
