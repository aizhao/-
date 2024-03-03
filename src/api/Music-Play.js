import  request  from "@/until/request"
export function _getmusic(id,level){
    return request({
        url:'/song/url/v1',
        params:{
            id: id,
            level:level,
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function CheckMusic(id){
    return request({
        url:'/check/music',
        params:{
            id: id,
        }
    })
}
export function _getlyric(id){
    return request({
        url:'/lyric',
        params:{
            id: id,
        }
    })
}