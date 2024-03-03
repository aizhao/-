import request from "@/until/request";
export function _phoneVerify(phone){
    return request({
        url:'/cellphone/existence/check',
        params:{
            phone:phone
        }
    })
}

export function _login(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone:phone,
            password:password,
        }
    })
}

/**获取用户歌单 */
export function _getSongList(id){
    return request({
        url:'/user/playlist',
        params:{
            uid:id,
            cookie:localStorage.getItem("cookie")
        }
    })
}

export class PlayList{
    constructor(playlist){
        this.name=playlist.name;//为了方便menu使用
        this.id=playlist.id;
        this.cover=playlist.coverImgUrl;
    }
}
export function GetUser(uid){
    return request({
        url:'/user/detail',
        params:{
            uid:uid,
            cookie:localStorage.getItem("cookie")
        }
    })
}
export function GetuserGrade(uid){
    return request({
        url:'/user/subcount',
        params:{
          uid:uid,
          cookie:localStorage.getItem("cookie")
        }
    })
}
export function Status(){
    return request({
        url:'/login/status',
    })
}
export function logout(){
    return request({
        url:'/logout',
    })
}
