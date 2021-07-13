<template>
  <div class="vb-checkbox flex align-center">
    <span class="title block"></span>
    <label class="container flex align-center relative">
      <input v-model="setCheck" type="checkbox">
      <span class="checkmark flex align-center justify-center transition" :style="styles" :class="{active:modelValue}">
        <transition name="fade">
          <svg v-if="modelValue" fill="white" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 515.556 515.556" height="16px" viewBox="0 0 515.556 515.556" width="16px">
            <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>
        </transition>
      </span>
      <span v-if="text" class="context block">{{ text }}</span>
    </label>
  </div>
</template>

<script>
import {computed, reactive, watch} from "vue";

export default {
  name: "VbCheckbox",
  props:{
    modelValue:[Boolean, String, Number],
    val:Boolean,
    text:String,
    width: String,
    height: String,
    radius: Boolean,
    color: String,

  },
  setup(props, {emit}){
    const styles = reactive({
      borderRadius: props.radius ? "8px" : false
    })
    watch(() => props.radius, (val) => {
      styles.borderRadius = val ? "8px" : false
    })

    const setCheck = computed({
      set(val){
        emit("update:modelValue", val)
      },
      get(){
        return props.modelValue
      }
    })


    return {
      styles, setCheck
    }
  }
}
</script>

<style>
.vb-checkbox {
  min-height: 34px;
}
.vb-checkbox > label.container {
  height: 24px;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vb-checkbox > label.container > input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.vb-checkbox > label.container > .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border: 2px solid #eee;
}
.vb-checkbox > label.container > .checkmark.active {
  background-color: #0652DD;
  border-color: #0652DD;
}
.vb-checkbox > label.container:hover > .checkmark {
  background-color: #eee;
}
.vb-checkbox > label.container > span.context {
  font-size: .8rem;
}
</style>