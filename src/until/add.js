import { _getmusic } from "@/api/Music-Play";
import { _getlyric } from "@/api/Music-Play";
import { songdetail } from "@/api/music-list";
const add = {
  async addmusic(id, f) {
    var songInfo = {
      title: "", //歌曲名称
      artist: "", //演唱者
      src: "", //音频文件的 URL
      pic: "",
      lrc: "", //LRC 歌词或者歌词文件的 URL
      theme: "",
      uid: id,
      artistid: "",
    };
    await _getmusic(id, "standard").then((res) => {
      songInfo.src = res.data[0].url;
    });
    await songdetail(id).then((res) => {
      songInfo.title = res.songs[0].name;
      songInfo.pic = res.songs[0].al.picUrl;
      songInfo.artist = res.songs[0].ar[0].name;
      songInfo.artistid = res.songs[0].ar[0].id;
    });
    await _getlyric(id).then((res) => {
      songInfo.lrc = res.lrc.lyric;
    });

    if (f === 1) {
      this.$store.commit("addSongToPlaylist1", songInfo);
    } else {
      this.$store.commit("addSongToPlaylist2", songInfo);
    }
    this.$store.state.key++;
    // 将songInfo插入到vuex中的
    this.$store.state.falg = true;
  },
};
export default add;
