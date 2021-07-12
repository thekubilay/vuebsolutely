<template>
  <div ref="dropdown" class="vb-select relative flex align-center relative" :style="styles">
    <!--  placeholder  -->
    <span @click="open()" class="placeholder flex align-center pointer relative" :style="{borderRadius:radius}">
      {{placeholder}}
      <svg class="dropdown-icon transition" :class="{active:state}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="12px" height="12px" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
  		  <path d="M505.752,123.582c-8.331-8.331-21.839-8.331-30.17,0L256,343.163L36.418,123.582c-8.331-8.331-21.839-8.331-30.17,0    s-8.331,21.839,0,30.17l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667    C514.083,145.42,514.083,131.913,505.752,123.582z"/>
     </svg>
    </span>

    <!--  dropdown  -->
    <transition :name="animation">
      <ul v-if="state" class="vb-select-wrapper absolute overflow-y">
        <li v-for="(item, idx) in options" :key="idx" class="vb-select-item flex align-center">
          <vb-checkbox class="vb-checkbox--item" />
          <span v-if="optionKey" class="vb-text-item">{{item[optionKey]}}</span>
          <span v-else class="vb-text-item">{{item}}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import {reactive, ref, watch} from "vue";
import { onClickOutside } from '@vueuse/core'
import VbCheckbox from "@/lib-components/checkbox/VbCheckbox";


export default {
  name: "VbSelect",
  components: {VbCheckbox},
  props:{
    modelValue:[Object, String, Number, Array,],
    animation:{
      type:String,
      default: "slideDown"
    },
    placeholder:{
      type:String,
      default:"選択"
    },
    options: Array,
    optionKey: String,
    optionVal: String,
    width:String,
    height: String,
    bgColor: String,
    textColor: String,
    border: String,
    radius: String,
  },
  setup(props, ) {

    const dropdown = ref(null)
    const state = ref(false)
    const styles = reactive({
      width: props.width,
      height: props.height,
      color: props.textColor,
      backgroundColor: props.bgColor,
      borderWidth: props.border ? props.border + "px" : false,
      borderColor: "#dcdde1",
      borderRadius: props.radius ? props.radius : false,
    })

    onClickOutside(state, (event) => {
      state.value = false
    })

    watch(() => props.width, (val) => {
      styles.width = val ? val : false
    })
    watch(() => props.height, (val) => {
      styles.height = val ? val : false
    })
    watch(() => props.textColor, (val) => {
      styles.color = val
    })
    watch(() => props.border, (val) => {
      styles.borderWidth = val ? val : false
    })
    watch(() => props.border, (val) => {
      styles.borderStyle = val ? "solid" : false
    })
    watch(() => props.radius, (val) => {
      styles.borderRadius = val ? val : false
    })

    open = () => {
      state.value = true
    }

    return {
      dropdown, state, styles,
      open,
    }

  }
}
</script>

<style>
.vb-select {
  width: 124px;
  min-width: 124px;
  height: auto;
}
.vb-select span.placeholder {
  width: 100%;
  height: 38px;
  font-size: .8rem;
  color: #a4b0be;
  padding-left: 10px;
  padding-right: 18px;
}
.vb-select span.placeholder > svg.dropdown-icon {
  position: absolute;
  top: 53%;
  transform: translateY(-50%) rotateX(0deg);
  right: 10px;
}
.vb-select span.placeholder > svg.dropdown-icon.active {
  transform: translateY(-50%) rotateX(180deg);
}
.vb-select > ul {
  top: 38px;
  width: 100%;
  height: 100%;
  max-height: 300px;
  box-shadow:
      0 2.8px 5.2px -44px rgba(0, 0, 0, 0.016),
      0 6.7px 12.4px -44px rgba(0, 0, 0, 0.018),
      0 12.5px 23.4px -44px rgba(0, 0, 0, 0.018),
      0 22.3px 41.8px -44px rgba(0, 0, 0, 0.018),
      0 41.8px 78.1px -44px rgba(0, 0, 0, 0.017),
      0 100px 187px -44px rgba(0, 0, 0, 0.02)
;

}
.vb-select > ul > li {
  width: 100%;
  min-height: 38px;
  border-bottom: 1px solid #f5f6fa;
  background-color: white;
}
.vb-select > ul > li:last-child {
  border-bottom: 0;
}
.vb-select > ul > li > .vb-checkbox--item {
  margin-left: 10px;
}
.vb-select > ul > li > .vb-text-item {
  font-size: .8rem;
}
</style>