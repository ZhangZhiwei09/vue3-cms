import request from './index'
import axios from 'axios'
export function test() {
  return axios.get('/mock/test')
}
