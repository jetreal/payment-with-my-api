import * as axios from 'axios';
import qs from 'qs';

export const instance = axios.create({
  // withCredentials: true,
  baseURL: "http://localhost:8080",
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

export const registration = (regData) => {
  const data = regData;
  const option = {
    url: '/user/signup',
    method: 'POST',
    data: qs.stringify(data),
  };
  return instance(option)
    .catch((error) => functionForCatchErr(error, 'needData'))
}

export const getToken = (data) => {
  // const data = {"email":"jet@gmail.com", "password":"jet333"};
  const option = {
    url: '/user/login',
    method: 'POST',
    data: qs.stringify(data),
  };
  return instance(option)
}

export const getLoggedUserInfo = (token) => {
  const option = {
    url: '/user/user-info',
    method: 'GET',
    headers: {
      Authorization: "bearer " + token
    }
  }
  return instance(option)
    .catch((error) => functionForCatchErr(error, 'needStatus'))
}

export const getListUserTransaction = (token) => {
  const option = {
    url: '/user/get-transactions',
    method: 'GET',
    headers: {
      Authorization: "bearer " + token
    }
  }
  return instance(option)
    .catch((error) => functionForCatchErr(error, 'needStatus'))
}

export const getFilteredUserList = (filteredChar, token) => {
  const data = {};
  data.filter = filteredChar.username
  const option = {
    url: '/user/users',
    method: 'POST',
    headers: {
      Authorization: "bearer " + token,
    },
    data: qs.stringify(data),
  }
  return instance(option)
    .catch((error) => functionForCatchErr(error, 'needData'))
}

export const cleateTransaction = (transaction, token) => {
  const option = {
    url: '/user/send-transaction',
    method: 'POST',
    headers: {
      Authorization: "bearer " + token
    },
    data: qs.stringify(transaction),
  }
  return instance(option)
    .catch((error) => functionForCatchErr(error, 'needData'))
}

const functionForCatchErr = (error, param) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (param === 'needData') {
      return error.response.data
    }
    if (param === 'needStatus') {
      return error.response.status
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}