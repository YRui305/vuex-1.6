// 用户相关的请求模块
import request from '@/utils/request'

// login({

// })
export const login = (data) => {
  return request({
    // 请求方法
    method: 'POST',
    // 请求路径
    url: '/app/v1_0/authorizations',
    //     // 请求头
    // headers: {},
    //     // Query 查询参数
    //     params: {},
    //     // Body 请求参数
    data: data
  })
}
// 短信验证码
export const getSmsCode = mobile => {
  return request({
    // 请求方法
    method: 'GET',
    // 请求路径
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
