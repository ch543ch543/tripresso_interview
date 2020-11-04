import axios from 'axios';

export default axios.create({
    baseURL: 'https://interview.tripresso.com/tour/search'
})