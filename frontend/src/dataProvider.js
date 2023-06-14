import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:5000';

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const response = await httpClient(url);
        return {
            data: response.json,
            total: response.headers.get('X-Total-Count'),
        };
    },
};

export default dataProvider;
