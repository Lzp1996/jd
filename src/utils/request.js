import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

instance.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return response.data
  } else {
    alert('请求失败1')
    console.log(222)
    return Promise.reject(response.statusText)
  }
}, error => {
  alert('请求错误')
  return Promise.reject(error)
})

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(Response => {
      resolve(Response)
    })
  })
}

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(Response => {
      resolve(Response)
    })
  })
}
