import { reactive, ref } from "vue"

export default function (){
    const image = ref(null)

    const resized = reactive({
        visibility:"hidden",
        width: null,
        height: null,
    })

    const setWH = function(percentage="100%"){
        resized.visibility = "hidden"

        console.log(image.value.width, image.value.height)

        if(image.value.width > image.value.height){
            resized.width = percentage
            resized.height = "auto"
        } else {
            resized.width = "auto"
            resized.height = percentage
        }

        resized.visibility = "visible";
     
      }

      return {
          image, resized,
          setWH
      }
}