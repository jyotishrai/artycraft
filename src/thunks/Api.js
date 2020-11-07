import {
    BASE_URL, API
} from '../constants'
import axios from 'axios';

export default axios.create({
  baseURL: BASE_URL
});