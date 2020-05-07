
import { request } from './request'

export function getHomeMultidata() {
  return request({
    url: 'http://123.207.32.32:8000/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: 'http://172.19.96.32:8080/home/data',
    params: {
      type,
      page
    }
  })
}
