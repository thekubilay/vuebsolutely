import {reactive, ref} from "vue";

export default function () {
  const image = ref(null)
  const resized = reactive({})

  const useSizer = (data, size="95%") => {
    if (data){
      if (data.width > data.height){
        resized.visibility = "visible"
        resized.width = size
        resized.height = "auto"
      } else {
        resized.visibility = "visible"
        resized.width = "auto"
        resized.height = size
      }
    }
  }


  return {
    image, resized,
    useSizer,
  }
}