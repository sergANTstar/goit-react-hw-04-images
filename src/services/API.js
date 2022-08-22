import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY_API = '29094187-70d9ed2faf906b217a027e6d2';
export const perPage = 12

async function fetchImages( searchQuery, currentPage) {
  const {data} = await axios.get('/', {
    params:{
    key: KEY_API,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
    }
  });

  return data;
};
export default fetchImages;
