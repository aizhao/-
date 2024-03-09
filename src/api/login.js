import request from "@/until/request";
export function _phoneVerify(phone) {
  return request({
    url: "/cellphone/existence/check",
    params: {
      phone: phone,
    },
  });
}

export function _login(phone, password) {
  return request({
    url: "/login/cellphone",
    method: 'POST',
    params: {
      phone: phone,
      password: password,
    },
  });
}

/**获取用户歌单 */
export function _getSongList(id) {
  return request({
    url: "/user/playlist",
    params: {
      uid: id,
      cookie: localStorage.getItem("cookie"),
    },
  });
}

export class PlayList {
  constructor(playlist) {
    this.name = playlist.name; //为了方便menu使用
    this.id = playlist.id;
    this.cover = playlist.coverImgUrl;
  }
}
export function GetUser(uid) {
  return request({
    url: "/user/detail",
    params: {
      uid: uid,
      cookie: localStorage.getItem("cookie"),
    },
  });
}
export function GetuserGrade(uid) {
  return request({
    url: "/user/subcount",
    params: {
      uid: uid,
      cookie: localStorage.getItem("cookie"),
    },
  });
}
export function Status() {
  return request({
    url: "/login/status",
    params:{
      cookie: localStorage.getItem("cookie"),
    }
    // cookie: localStorage.getItem("cookie"),
  });
}
export function logout() {
  return request({
    url: "/logout",
  });
}
export function send_captcha(phone) {
  return request({
    url: "/captcha/sent",
    params: {
      phone: phone,
    },
  });
}
export function Register(captcha, phone, password, nickname) {
  return request({
    url: "/register/cellphone",
    params: {
      captcha: captcha,
      phone: phone,
      password: password,
      nickname: nickname,
    },
  });
}
export function verify_captcha(phone, captcha) {
  return request({
    url: "/captcha/verify",
    params: {
      phone: phone,
      captcha: captcha,
    },
  });
}
export function check_register(phone) {
  return request({
    url: "/cellphone/existence/check",
    params: {
      phone: phone,
    },
  });
}
export function check_nickname(nickname) {
  return request({
    url: "/nickname/check",
    params: {
      nickname: nickname,
    },
  });
}
export function get_key() {
  return request({
    url: "/login/qr/key",
    params: {
      timestamp:new Date().getTime(),
    },
  });
}export function get_info(key) {
  return request({
    url: "/login/qr/create",
    params: {
      key:key,
      qrimg:'true',
      timestamp:new Date().getTime(),
    },
  });
}
export function check_info(key) {
  return request({
    url: "/login/qr/check",
    method:'POST',
    params: {
      key:key,
      timestamp:new Date().getTime(),
      cookie: localStorage.getItem("cookie"),
    },
  });
}
