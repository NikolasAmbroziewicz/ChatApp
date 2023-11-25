import axios from 'axios';

const ApiBase = () =>
  axios.create({
    baseURL: String(process.env.NEXT_PUBLIC_BACKEND),
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default ApiBase;