<template>
  <transition name="fade">
    <div v-if="modelValue" class="loader flex align-center justify-center" :class="{absolute:absolute}">
      <div class="blur"></div>
      <div class="icon" :style="{width:size,height:size}"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "VbLoading",
  props: {
    modelValue:Boolean,
    absolute: Boolean,
    fill: {
      type: String,
      default: "#3d3d3d"
    },
    size: {
      type: String,
      default: "40px"
    },
    setup(){

    }
  },
}
</script>

<style>
.loader {
  position: fixed;
  z-index: 101;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.loader > .blur {
  backdrop-filter: blur(1.4px);
  background-color: rgba(0, 0, 0, .01);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.loader > .icon {
  position: relative;
  z-index: 2;
  border-width: 2px;
  border-radius: 50%;
  border-style: solid;
  border-color: #3d3d3d;
  border-top-color: #e5e5e5;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin .7s  linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>