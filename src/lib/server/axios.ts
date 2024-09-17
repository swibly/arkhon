import { SWIBLY_API_BASE_URL, SWIBLY_API_KEY } from '$env/static/private';
import axios from 'axios';

axios.defaults.baseURL = SWIBLY_API_BASE_URL;
axios.defaults.headers.common = { 'X-API-KEY': SWIBLY_API_KEY };
