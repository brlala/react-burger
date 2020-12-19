import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-c1288-default-rtdb.firebaseio.com/',
});

export default instance;
