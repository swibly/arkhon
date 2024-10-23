import { SWIBLY_API_BASE_URL, SWIBLY_API_KEY } from '$env/static/private';
import axios from 'axios';

export default axios.create({
    baseURL: SWIBLY_API_BASE_URL,
    headers: {
        common: {
            'X-API-KEY': SWIBLY_API_KEY
        }
    }
});
