import request from '@/utils/request'



// 查询app信息详细
export function getDetailsInfo(onetsocCodeParam) {
    return request({
        url: '/details/findByOnetsocCode',
        method: 'get',
        params: onetsocCodeParam
    })
}

