import axios, {AxiosResponse} from 'axios';
import HttpStatusCode from './HttpStatusCode';
import client from './axiosClient';

const request = <T>(
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	url: string,
	params?: object,
	requestData?: object
) =>
	(async () => {
		try {
			const response: AxiosResponse = await client({
				method,
				url,
				data: requestData,
				params,
			});

			const {data, status}: {data: T; status: number} = response;

			return {
				data,
				status,
				HttpStatusCode,
			};
		} catch (err: any) {
			// const error = err as AxiosError
			if (!axios.isAxiosError(err)) {
				return {status: undefined, HttpStatusCode};
			}
			return {
				status: err.response?.status,
				HttpStatusCode,
				data: err.response?.data,
			};
		}
	})();

export default request;
