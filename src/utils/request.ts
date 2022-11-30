
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'


const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc2OTk3NjcsInVzZXJuYW1lIjoiYWRtaW4ifQ.mQPkyEEWY71GlSeBq9KMEDuMEtOw5ZGtEpe_hVrCfi4'
// 创建 axios 实例
const service = axios.create({
    baseURL: '/jeecg-boot',
    timeout: 5 * 60 * 1000 // 请求超时时间
})

const err = (error: any) => {
    if (error.response) {
        // let data = error.response.data

        switch (error.response.status) {
            case 403:
                console.log(error.response.status);

                break
            case 500:
                console.log(error.response.status);
                break
            case 404:
                console.log(error.response.status);
                break
            case 504:
                console.log(error.response.status);
                break
            default:
                console.log(error.response.status);
                break
        }
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {

        if (config.headers) {
            config.headers['X-Access-Token'] = token
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use((response: AxiosResponse): void => {
    return response.data.result.records
}, err)


export default service
