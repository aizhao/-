import  request  from "@/until/request"

/**获取歌单分类 */
export function _getCatList(){
    return request({
        url:'/playlist/catlist',
        cookie:localStorage.getItem("cookie")
    })
}

/**获取热门歌单 */
export function _getMusicListHot(){
    return request({
        url:'/playlist/hot',
        cookie:localStorage.getItem("cookie")
    })
}

/**获取不同tag的精品歌单 */
export function _getHighquality(cat,limit){
    return request({
        url:'/top/playlist/highquality',
        params:{
            cat:cat,
            limit:limit,
            time:new Date().getTime(),
            cookie:localStorage.getItem("cookie")
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
            offset:offset,
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function _getMusicList(id){
    return request({
        url:'/playlist/detail',
        params:{
            id:id,
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function _getitemList(limit){
    return request({
        url:'/personalized',
        params:{
            limit:limit,
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function _getSinnerList(type){
    return request({
        url:'/toplist/artist',
        params:{
            type:type,
            cookie:localStorage.getItem("cookie")
        }
    })
}

export function _getUserList(uid,limit){
    return request({
        url:'/user/playlist',
        params:{
            uid:uid,
            limit:limit,
            cookie:localStorage.getItem("cookie")
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
            limit:limit,
            time:new Date().getTime(),
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function Like(id,cid,t,type){
    return request({
        url:'/comment/like',
        params:{
            id:id,
            cid:cid,
            t:t,
            type:type
        }
    })
}
export function songdetail(ids){
    return request({
        url:'/song/detail',
        params:{
            ids:ids
        }
    })
}
export function recmendsongs(){
    return request({
        url:'/recommend/songs',
        params:{
            time:new Date().getTime(),
            cookie:localStorage.getItem("cookie")
        }
       
    })
}
export function recmendlist(){
    return request({
        url:'/recommend/resource',
        params:{
            time:new Date().getTime(),
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function get_rank(){
    return request({
        url:'/toplist',
    })
}
export function _getcomment(id){
    return request({
        url:'/comment/music',
        params:{
            id:id,
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function likemusic(id,like){
    return request({
        url:'/like',
        params:{
            id:id,
            like:like,
            cookie:localStorage.getItem("cookie")
        }
    })
}