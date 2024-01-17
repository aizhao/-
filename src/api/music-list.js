import  request  from "@/until/request"

/**获取歌单分类 */
export function _getCatList(){
    return request({
        url:'/playlist/catlist'
    })
}

/**获取热门歌单 */
export function _getMusicListHot(){
    return request({
        url:'/playlist/hot',
    })
}

/**获取不同tag的精品歌单 */
export function _getHighquality(cat,limit){
    return request({
        url:'/top/playlist/highquality',
        params:{
            cat:cat,
            limit:limit,
            time:new Date().getTime()
        }
    })
}
/**获取歌单--网友精选碟，全部歌单 */
export function _getPlayList(cat,limit,offset){
    return request({
        url:'/top/playlist',
        params:{
            cat:cat,
            limit:limit,
            offset
        }
    })
}
export function _getMusicList(id){
    return request({
        url:'/playlist/detail',
        params:{
            id:id,
        }
    })
}
export function _getitemList(limit){
    return request({
        url:'/personalized',
        params:{
            limit:limit,
        }
    })
}
export function _getSinnerList(type){
    return request({
        url:'/toplist/artist',
        params:{
            type:type,
        }
    })
}

export function _getUserList(uid,limit){
    return request({
        url:'/user/playlist',
        params:{
            uid:uid,
            limit:limit
        }
    })
}
export function _getBanner(){
    return request({
        url:'/banner',
    })
}
export function commentList(id,limit){
    return request({
        url:'/comment/playlist',
        params:{
            id:id,
            limit:limit
        }
    })
}