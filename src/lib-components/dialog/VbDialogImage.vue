<template>
  <div class="images-container flex">

    <div v-if="directions" 
        @click="decreaseIndex"
        class="direction flex justify-center align-center pointer">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 20 20">
							<path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
				</svg>
    </div>

    <div class="image-content flex-column">

      <div class="active-image flex justify-center align-center">
        <img v-if="activeImage.length" ref="image" @load="isLoaded" :style="resized" :src="getImgUrl(activeImage)" >
      </div>
      
      <div v-if="checkArray" class="image-barscroll flex overflow-x">
        <div v-for="(image,idx) in images" :key="idx" class="image pointer" 
            @click="setActiveImg(idx)">
          <img :src="getImgUrl(image.src)" :alt="image.src" >
        </div>
      </div>
    </div>
   
    <div v-if="directions"
        @click="increaseIndex"
        class="direction flex justify-center align-center pointer">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 20 20">
            <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, ref, watch} from "vue";
import helpers from "@/helpers/helpers.js"

export default {
  name: "VbDialogImage",
  
  props: {
    directions: Boolean,
    images: [String, Array],
 
  },
  setup(props, {emit}) {
    const {
      image, resized,
      setWH
    } = helpers()

    const activeIndex = ref(0);//the index of the image in an array
    const activeImage = ref("");//is a string to the image

    onMounted(() => {
      init()
    })
 
    const getImgUrl =(img)=>{
      return require('../../assets/'+img)
    }

    const isLoaded = () => {
      setWH()
    }

    const increaseIndex = () => {
      if(Array.isArray(props.images)&&props.images.length-1>activeIndex.value){
        activeIndex.value += 1
        activeImage.value = props.images[activeIndex.value].src
      }
    }
    const decreaseIndex = () => {
      if(Array.isArray(props.images)&&activeIndex.value>0){
        activeIndex.value -= 1
        activeImage.value = props.images[activeIndex.value].src
      }
    }

    const setActiveImg = (idx) => {
      activeIndex.value = idx
      activeImage.value = props.images[activeIndex.value].src
    }


    const checkArray = computed(() => {
      return Array.isArray(props.images)
    })

    const currImgPath = computed(() =>{
      return getImgUrl(props.images[activeIndex.value]) 
    })


    function setDefaultImage(){
      if(props.images && Array.isArray(props.images)){
        activeImage.value = props.images[0].src
      }
    }

    function init(){
      setDefaultImage()
    }

    return {
      activeImage, image, resized,
      checkArray, currImgPath, increaseIndex, decreaseIndex,setActiveImg,
      setWH, getImgUrl, isLoaded,
      
    }

  }
}
</script>

<style scoped>
.direction{
  padding: 10px;
}
.image-content{
  width: 100%;
  background-color: slategrey;
  border-radius: 10px;
}
.image-barscroll{
  background-color: #f1f1f1;
}

.image {
  margin: 5px 5px 15px 5px;
  border: 2px solid white;
  border-radius: 5px;
  height: 36px;
  width: 36px;
}
.image > img{
  max-height: 100%;
  max-width: 100%;
}
.active-image{
  width:100%;
  height:100%;
  max-height: 100%;
  max-width: 100%;
}

</style>