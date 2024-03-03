<template>
  <div class="slider">
    <span class="demonstration">{{ val.internalMusic.title }}</span>
    <div class="sl">
      <el-slider
        v-model="Value"
        :format-tooltip="formatTooltip"
        :max="val.playStat.duration"
        @change="change()"
        @mousedown.native="isChange = true"
        @mouseup.native="isChange = false"
      ></el-slider>
      <p class="curr">{{ dayjs(Value * 1000).format("mm:ss") }}</p>
      <p class="sum">
        {{ dayjs(val.playStat.duration * 1000).format("mm:ss") }}
      </p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    val: {
      type: Object,
    },
  },
  data() {
    return {
      Value: 0,
      isChange: false,
      dayjs: dayjs,
    };
  },

  methods: {
    formatTooltip(Val) {
      return dayjs(Val * 1000).format("mm:ss");
    },
    change() {
      // eslint-disable-next-line vue/no-mutating-props
      this.val.audio.currentTime = this.Value;
    },
    changestate() {
      this.isChange = false;
    },
  },
  mounted() {
    window.addEventListener("mouseup", this.changestate);
  },
  watch: {
    "val.playStat.playedTime": {
      handler(newval) {
        this.Value = newval;
      },
      deep: true,
    },
    isChange(newval) {
      if (newval) this.val.pause();
      else {
        this.val.play();
      }
    },
  },
};
</script>

<style scoped>
.sl {
  position: relative;
}
.sl .sum {
  position: absolute;
  top: -8px;
  left: 100%;
  margin-left: 20px;
  color: white;
}
.sl .curr {
  position: absolute;
  top: -8px;
  left: -55px;
  color: white;
}
span {
  color: white;
}
</style>
