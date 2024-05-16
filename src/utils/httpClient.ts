import axios from 'axios';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const httpClient = {
  getToken: function () {
    return axios.get(`${BASE_URL}/token/`).then(res => res.data.token);
  },
  getPositions: function () {
    return axios.get(`${BASE_URL}/positions/`).then(res => res.data.positions);
  },
  getUsers: function (page: number, count: number) {
    return axios
      .get(`${BASE_URL}/users?page=${page}&count=${count}`)
      .then(res => res.data);
  },
  getUser: function (id: number) {
    return axios.get(`${BASE_URL}/users/${id}/`).then(res => res.data.user);
  },
  registerUser: function (formData: FormData) {
    return this.getToken().then((token: string) => {
      if (token) {
        // перевірка, чи token не є undefined
        return axios.post(`${BASE_URL}/users/`, formData, {
          headers: {
            Token: token,
          },
        });
      } else {
        throw new Error('Token is undefined');
      }
    });
  },
};
