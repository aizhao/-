import request from "@/until/request";
export function update_user(gender,birthday,nickname,province,city,signature) {
  return request({
    url: "/artists",
    params: {
        gender:gender,
        birthday:birthday,
        nickname:nickname,
        province:province,
        city:city,
        signature:signature
    },
  });
}

