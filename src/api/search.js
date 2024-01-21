import request from "@/until/request";
export function _search(keywords, type) {
  return request({
    url: "/cloudsearch",
    params: {
      keywords: keywords,
      type: type,
    },
  });
}
export function _searchhot() {
  return request({
    url: "/search/hot/detail",
  });
}
export function _suggest(keywords) {
  return request({
    url: "/search/suggest",
    params: {
      keywords: keywords,
    },
  });
}

