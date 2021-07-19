<template>
  <div class="images-container flex">

    <div v-if="directions" class="direction flex justify-center align-center">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 20 20">
							<path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
				</svg>
    </div>

    <div class="image-content flex-column">

      <div class="active-image">
         
        <img v-if="!checkArray" @load="setWH" :src="getImgUrl(images)" 
            :style="{'height':activeImgHeight, 'width':activeImgWidth}">
        
        <!-- <img v-else-if="images?true:false" :src="getImgUrl(images[0].src)"> -->
      </div>
      
      <div v-if="checkArray" class="image-barscroll flex overflow-x">
        <div v-for="(image,idx) in images" :key="idx" class="image" >
          <img :src="getImgUrl(image.src)" :alt="image.src" >
              <!-- {{typeof(newImage(image,))}} -->
        </div>
      </div>
    </div>
   
    <div v-if="directions" class="direction flex justify-center align-center">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 20 20">
            <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref, watch} from "vue";
import helpers from "@/helpers/helpers.js"

export default {
  name: "VbDialogImage",
  
  props: {
    
    directions: Boolean,
    images : [String, Array],
 
  },
  setup(props, {emit}) {
    let activeImgWidth = ref(null)
    let activeImgHeight = ref(null)
    let image = reactive(null)
    const styles = reactive({
      //not necessary, but failsafe if no image found
      backgroundColor : "#444444", 
    })

    const getImgUrl =(img)=>{
      return require('../../assets/'+img)
    }

    // const loadImageFrom =(path)=> {
    //   image = new Image()
    //   image.onload =()=>{
    //     activeImgWidth = image.height
    //     activeImgHeight = image.width
    //   }
    //   i.src = path
    // }
    // loadImageFrom(getImgUrl('logo.png'))

    // const calcImgProportions = computed(() =>{
    //   if(image.height>image.width){

    //   }
    //   activeImgWidth = image.height
    //   activeImgHeight = image.width
    // })
    const setWH = function(event){
      let img = event.target
      
      if(img.height===0 ||img.width===0){
        return
      }
      if(img.height> img.width){
        activeImgWidth.value = '100%'//img.width +'px'
        activeImgHeight.value = 'auto'//img.height +'px'
      }
      if(img.width > img.height){
        activeImgWidth.value = 'auto'//img.width +'px'
        activeImgHeight.value = '100%'//img.height +'px'
      }
      

    }

    // const {getImageSize, calculateHeightDiff} = helpers()
  
    const checkArray = computed(() => {
      return Array.isArray(props.images)
    })

    return {
      setWH, getImgUrl,
      checkArray, activeImgWidth, activeImgHeight
      // setWH,styles, checkArray, getImgUrl,loadImageFrom,calcImgProportions,image,activeImgWidth,activeImgHeight
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
}
.active-image{
  width:100%;
  height:100%;
}

</style>