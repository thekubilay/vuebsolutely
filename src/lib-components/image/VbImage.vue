<template>
  <img class="vb-image" @click="isLoaded" ref="image" :src="src" :style="resized" alt="image">
</template>

<script>
import {onMounted, ref, watch} from "vue";
import useImageResizeHandler from "@/helpers/useImageResizeHandler";
export default {
  name: "VbImage",
  props:{
    src:String,
    width:{
      type:String,
      default:"auto",
    },
    height:{
      type:String,
      default:"auto",
    }
  },
  setup(props,){
    const {image, resized, useSizer} = useImageResizeHandler()

    onMounted(() => {
      useSizer(image.value, "100%")
    })

    const isLoaded = () => {
      useSizer(image.value, "100%")
    }

    watch(() => props.src, (val) => {
      useSizer(val)
    })

    watch(() => props.width, (val) => {
      resized.width = val
    })

    watch(() => props.height, (val) => {
      resized.height = val
    })

    return {
      image, resized,
      isLoaded,
    }
  }
}
</script>

<style>
.vb-image {
  margin: auto;
}
</style>