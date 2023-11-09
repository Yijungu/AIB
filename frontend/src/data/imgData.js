import axios from 'axios';

let data = null;

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/img_data');
    data = response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getData = () => {
  return data;
};
