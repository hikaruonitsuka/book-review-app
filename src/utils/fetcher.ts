import axios from 'axios';

export const fetchWithToken = async (url: string, token: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
