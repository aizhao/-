<template>
  <div class="block">
    <el-slider
      v-model="Value"
      :format-tooltip="formatTooltip"
      vertical
      height="200px"
      @input="change()"
    >
    </el-slider>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: Object,
    },
  },
  data() {
    return {
      Value: 80,
    };
  },

  methods: {
    formatTooltip(Val) {
      return Val;
    },
    change() {
      // eslint-disable-next-line vue/no-mutating-props
      this.val.setAudioVolume(this.Value / 100);
    },
  },
  mounted() {
    // window.addEventListener("mouseup",this.changestate)
  },
  watch: {
    "val.internalVolume": {
      handler(newval) {
        this.Value = newval * 100;
      },
      deep: true,
    },
  },
};
</script>

<style></style>
