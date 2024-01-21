import request from "@/until/request";
export function _sinner(id) {
  return request({
    url: "/artists",
    params: {
        id:id
    },
  });
}

