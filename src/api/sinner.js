import request from "@/until/request";
export function _sinner(id) {
  return request({
    url: "/artists",
    params: {
        id:id
    },
  });
}
export function get_sinner(limit,type,area,initial) {
  return request({
    url: "/artist/list",
    params: {
      limit:limit,
      initial:initial,
      type:type,
      area:area
    },
  });
}
export function get_hotsinner(limit) {
  return request({
    url: "/top/artists",
    params: {
      limit:limit
    },
  });
}

