import axios from 'axios';

export const loginShiprocket = async () => {
  const data = JSON.stringify({
    "email": process.env.SHIPROCKET_EMAIL,
    "password": process.env.SHIPROCKET_PASSWORD
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  const response = await axios(config);
  return response.data as {
    company_id: number;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    token: string
  };
};
