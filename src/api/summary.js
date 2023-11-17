import request from '@/utils/request'



// 查询信息详细
export function getSummaryInfo(onetsocCodeParam) {
    return request({
        url: '/summary/findByOnetsocCode',
        method: 'get',
        params: onetsocCodeParam
    })
}


// 搜索信息详细
export function searchByName(keyword) {
    return request({
        url: '/summary/searchByName',
        method: 'get',
        params: keyword
    })
}
