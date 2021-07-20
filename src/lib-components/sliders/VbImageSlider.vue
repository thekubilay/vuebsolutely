<template>
  <div class="vb-image-slider">
    <button v-if="isArray()" @click="changeIndex(false)" class="left directions button flex align-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve">
		    <polygon points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128"/>
      </svg>
    </button>
    <vb-image class="image" :src="currentImage"/>
    <button v-if="isArray()" @click="changeIndex(true)" class="right directions button flex align-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve">
    		<polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128   "/>
      </svg>
    </button>

    <div class="image-wrapper">
      <vb-image />
    </div>

    <div class="thumbnail-wrapper">
      <vb-image @click="selectItem(idx)" v-for="(item, idx) in images" :key="idx" :src="key ? item : item[key]" class="image" />
    </div>
  </div>
</template>

<script>
import VbImage from "@/lib-components/image/VbImage";
import {onMounted, ref} from "vue";
export default {
  name: "VbImageSlider",
  components: {VbImage},
  props:{
    directions:Boolean,
    key:String,
    images: {
      type:Array,
      required:true,
    },
    margin:String,
  },
  setup(props,{emit}){
    const currentIndex = ref(0);
    const currentImage = ref("");
    onMounted(() => {
      init()
    })

    const selectItem = (id) =>{
      emit("update:modelValue", id)
    }

    const changeIndex = (direction) => {
      // true + / false -
      if (direction) {
        if (props.images.length < currentIndex.value)
          currentIndex.value += 1
        else currentIndex.value = 0
      } else {
        if (currentIndex.value > 0)
          currentIndex.value -= 1
        else currentIndex.value = props.images.length - 1
      }
    }

    function isArray(){
      return Array.isArray(props.images)
    }

    function init() {
      currentImage.value = isArray() ? props.images : props.images[currentIndex.value]
    }

    return {
      currentIndex, currentImage,
      isArray, changeIndex, selectItem,
    }
  }
}
</script>

<style>
.vb-image-slider {
  height: 100px;
  width: 100%;
}
.vb-image-slider > .image-wrapper {
  height: 100%;
  width: 100%;
}
.vb-image-slider > .thumbnail-wrapper {
  height: 74px;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, .5);
}
.vb-image-slider > .thumbnail-wrapper > img.image.active {
  border: 2px solid white;
}
</style>