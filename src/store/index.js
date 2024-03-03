import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
function findIndex(list, song) {
  // 为true时是index下标，不满足返回-1
  return list.findIndex((item) => item.uid === song.uid);
}

export default new Vuex.Store({
  state: {
    theme: "light",
    user: null,
    uid: null,
    cookie: null,
    isloading: false,
    requestErr: false,
    avatarurl: null,
    token: "",
    sequenceList: [],
    palylist: [],
    currentIndex: 0,
    key: 0,
    falg: false,
    mask: false,
    val: {},
    curren: 0,
    likelist: [],
    liked: true,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem("theme", theme);
    },
    setval(state, Val) {
      state.val = Val;
    },
    setlike(state, Val) {
      state.likelist = Val;
    },
    addlike(state, id) {
      state.likelist.unshift(JSON.parse(JSON.stringify(id)));
    },
    poplike(state, idx) {
      state.likelist.splice(idx, 1);
    },
    CloseMask(state) {
      state.mask = false;
    },
    OpenMask(state) {
      state.mask = true;
    },
    setplay(state, songs) {
      state.palylist = songs;
    },
    setIdx(state, index) {
      state.currentIndex = index;
    },
    setnext(state) {
      state.currentIndex = state.currentIndex + 1;
    },
    setpre(state) {
      state.currentIndex = state.currentIndex - 1;
    },
    setPlaylist(state, list) {
      state.palylist = list;
    },
    addSongToPlaylist1(state, song) {
      let idx = findIndex(state.palylist, song);

      if (idx >= 0) {
        state.palylist.splice(idx, 1);
      }

      state.palylist.unshift(JSON.parse(JSON.stringify(song)));
    },
    addSongToPlaylist2(state, song) {
      let idx = findIndex(state.palylist, song);
      if (idx >= 0) {
        state.palylist.splice(idx, 1);
      }

      state.palylist.push(JSON.parse(JSON.stringify(song)));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    /**保存用户信息 */
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;
      state.avatarurl = state.user.profile.avatarUrl;
    },
    /**显示隐藏loading */
    showLoading(state) {
      state.isloading = true;
    },
    hiddenLoading(state) {
      state.isloading = false;
    },
    /**修改网络状态 */
    setRequestErr(state) {
      state.requestErr = true;
    },
  },
  getters: {
    getPlaylist(state) {
      return state.palylist;
    },
    getval(state) {
      return state.val;
    },
    getTheme(state) {
      if (localStorage.getItem("theme")) {
        state.theme = localStorage.getItem("theme");
      }
      return state.theme;
    },
    getmask(state) {
      return state.mask;
    },
    getIdx(state) {
      return function (song) {
        let idx = findIndex(state.palylist, song);
        state.currentIndex = idx;
        return idx;
      };
    },
    getli(State) {
      return function (id) {
        let idx = State.likelist.indexOf(id);
        return idx;
      };
    },
    getLike(state) {
      return state.liked;
    },
    getlist(state) {
      return state.palylist[state.currentIndex];
    },
    getidx(state) {
      return state.currentIndex;
    },
    getLen(state) {
      return state.palylist.length;
    },
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem("token");
      }
      return state.token;
    },
    getAvatar(state) {
      let avatar = "";
      if (localStorage.getItem("avatar")) {
        avatar = localStorage.getItem("avatar");
        return avatar;
      }
      avatar = state.user && state.user.profile.avatarUrl;
      return avatar;
    },
    getCookie(state) {
      if (localStorage.getItem("cookie")) {
        state.cookie = localStorage.getItem("cookie");
      }
      return state.cookie;
    },
    /**获取网络请求状态 */
    getRequestType(state) {
      return state.requestErr;
    },
    /**获取用户id */
    getUserId(state) {
      if (localStorage.getItem("uid")) {
        state.uid = localStorage.getItem("uid");
      }
      return state.uid;
    },
  },
  actions: {
    addSongToPlaylist({ commit, state, song }) {
      commit("playlist", [...state.playlist, song]);
    },
    getIdx(state, song) {
      let idx = findIndex(state.palylist, song);
      return idx;
    },
  },
  modules: {},
});
