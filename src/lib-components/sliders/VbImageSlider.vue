<template>
  <div class="vb-image-slider">
    <button v-if="isArray()" @click="changeIndex(false)" class="left directions button flex align-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve">
		    <polygon points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128"/>
      </svg>
    </button>
    <vb-image ref="image" class="image" />
    <button v-if="isArray()" @click="changeIndex(true)" class="right directions button flex align-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" xml:space="preserve">
    		<polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128   "/>
      </svg>
    </button>

    <div class="image-wrapper">
      <vb-image />
    </div>

    <div class="thumbnail-wrapper">
      <vb-image @click="selectItem(idx)" v-for="(item, idx) in images" :key="idx" 
                :src="key?item.src :images[idx].src" 
                :style="thumbnailstyles" 
                class="image pointer" :class="{active:currentIndex===idx}"/>
      
      
    </div>
  </div>
</template>

<script>
import VbImage from "@/lib-components/image/VbImage";
import {onMounted, reactive, ref, watch} from "vue";
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
    //three thumbnail attributes for margin, height and width
    tnmargin:String,
    tnheight:String,
    tnwidth:String
  },
  setup(props,{emit}){
    const currentIndex = ref(0);
    const currentImage = ref("");
    const image = ref(null)
    const thumbnailstyles = reactive({
      width: props.tnwidth ? props.tnwidth:"32px",
      height: props.tnheight ? props.tnheight:"32px",
      margin: props.tnmargin ? props.tnmargin : false

    })
    onMounted(() => {
      init()
    })

    const selectItem = (id) =>{
        currentIndex.value = id
    }

    watch(() => props.tnmargin, (val) => {
      thumbnailstyles.tnmargin = val
    })

    watch(() => currentIndex.value, (val) => {      
      currentImage.value = props.images[val].src
      image.src = currentImage.value
      console.log(image)
    })


    const changeIndex = (direction) => {
      // true + / false -
      if (direction) {
        if (props.images.length-1 > currentIndex.value)
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
      currentIndex.value = 0
      currentImage.value = isArray() ? props.images[currentIndex.value]:""
      console.log(currentIndex.value)
      image.src = currentImage.value
    }

    return {
      currentIndex, currentImage, thumbnailstyles, image,
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
.directions {
    height: 32px;
    width: 32px;
}
</style>