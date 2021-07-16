import {computed, onMounted, ref, watch} from "vue";

export default function (props, {emit}){
  const container = ref(null)
  const selected = ref(null)
  const checks = ref([])
  const kwargs = ref("")

  onMounted(() => {
    init()
  })

  watch(() => props.filter, () => {
    init()
  })

  watch(() => props.multiple, () => {
    init()
  })

  watch(() => container.value, (val) => {
    setDefaultSelectedItem(val)
  })

  const setKwargs = computed({
    set(val){
      kwargs.value = val
    },
    get(){
      return kwargs.value
    }
  })

  function setData(data){
    if (props.multiple){
      selectDataByOption(data)
    } else {
      container.value = props.optionKey ?  data[props.optionKey] : data
      const select = JSON.parse(JSON.stringify(container.value))
      emit("update:modelValue", select)
    }
  }

  function selectDataByOption(data){
    let selects = []
    if (props.optionKey){
      const exists = container.value.some( item => item[props.optionKey] === data[props.optionKey])
      if (exists){
        checks.value.forEach(obj => {
          if (obj["item"] === data[props.optionKey]){
            obj.active = false
          }
        })
        container.value = container.value.filter((item, idx) => {
          return item[props.optionKey] !== data[props.optionKey]
        })
      } else {
        setActiveData(data[props.optionKey])
        container.value.push(data)
      }
    } else {
      const exists = container.value.some(item => item === data)
      if (exists){
        checks.value.forEach(obj => {
          if (obj["item"] === data){
            obj.active = false
          }
        })
        container.value = container.value.filter((item, idx) => {
          return item !== data
        })
      } else {
        setActiveData(data)
        container.value.push(data)
      }
    }
    selects = JSON.parse(JSON.stringify(container.value))
    emit("update:modelValue", selects)
  }

  function setActiveData(data) {
    checks.value.forEach(obj => {
      if (obj["item"] === data){
        obj.active = true
      }
    })
  }

  const setOptionsByFilter = (options) => {
    if (props.filter && kwargs.value.length){
      return options.filter(item => {
        if (props.optionKey){
          return item[props.optionKey].match(kwargs.value)
        } else {
          return item.match(kwargs.value)
        }
      })
    } else {
      return options
    }
  }

  const setDefaultSelectedItem = (val) => {
    if (val && val.length){
      if (props.multiple){
        if (props.optionKey){
          selected.value = val[val.length-1][props.optionKey]
        } else {
          selected.value = val[val.length-1]
        }
      } else {
        if (props.optionKey){
          selected.value = val[props.optionKey]
        } else {
          selected.value = val
        }
      }
    } else {
      selected.value = props.placeholder
    }
  }

  const selectItem = (data) => {
    setData(data)
  }

  function init(){
    container.value = props.modelValue
    setDefaultSelectedItem(props.modelValue)
    props.options.forEach(item => {
      if (props.optionKey){
        checks.value.push({item:item[props.optionKey], active:false})
      } else {
        checks.value.push({item:item, active:false})
      }
    })
    if (Array.isArray(props.modelValue) && props.modelValue.length){
      props.modelValue.forEach(item => {
        props.optionKey ? setActiveData(item[props.optionKey]) : setActiveData(item)
      })
    }
  }

  return {
    container, selected, checks, kwargs, setKwargs,
    selectItem, setOptionsByFilter, setDefaultSelectedItem,
  }
}