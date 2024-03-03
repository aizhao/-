import add from "@/until/add";
const Add = {
  install: function (Vue) {
    Vue.prototype.$Addmusic = add.addmusic;
  },
};
export default Add;
