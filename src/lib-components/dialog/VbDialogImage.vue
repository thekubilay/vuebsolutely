<template>
  <transition :name="animation"> 
    <div class="vb-dialog flex align-center justify-center" v-if="modelValue" :class="{absolute:absolute}">
      <div class="blur"></div>
      <div ref="state" class="window" :class="sizeClass" :style="styles">
        <div class="header flex align-center" :class="positionClass">
          <h3 v-if="title" class="title capitalize">{{title}}</h3>
          <vb-button @click="close()" class="close" width="28px" height="28px" radius="8">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 357 357"
                 xml:space="preserve">
		          <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3     214.2,178.5   "/>
            </svg>
          </vb-button>
        </div>

        <!--   context imports by slot   -->
        <div class="body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {computed, reactive, ref, watch} from "vue";
import { onClickOutside } from '@vueuse/core'
import VbButton from "@/lib-components/button/VbButton";


export default {
  name: "VbDialog",
  components: {VbButton},
  props: {
    modelValue: Boolean,
    animation:{
      type:String,
      default:"fade",
    },
    directions: Boolean,
    images : [Array,String],
    position:String,
    title:String,
    absolute:Boolean,
    small:Boolean,
    medium:Boolean,
    large:Boolean,
    radius: String,
  },
  setup(props, {emit}) {
    const state = ref(props.modelValue)
    const styles = reactive({
      borderRadius: props.radius ? props.radius+"px" : false
    })
    const close = () => {
      emit("update:modelValue", false)
    }

    onClickOutside(state, () => emit("update:modelValue", false))

    watch(() => props.radius, (val) => {
      styles.borderRadius = val ? val+"px" : false
    })

    const sizeClass = computed(() => {
      return {
        small: props.small && (!props.medium && !props.large),
        medium: props.medium && (!props.small && !props.large ),
        large: props.large && (!props.medium && !props.small),
      }
    })
    const positionClass = computed(() => {
      return {
        "justify-start": (!props.position || props.position === "left") ,
        "justify-center": (props.position || props.position === "center") ,
      }
    })

    return {
      state, sizeClass, positionClass, styles,
      close,
    }
  }
}
</script>

<style>
.vb-dialog {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.vb-dialog > .blur {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1.4px);
  background-color: rgba(0, 0, 0, .01);
}
.window {
  position: relative;
  z-index: 2;
  background-color: white;
  width: 524px;
  box-shadow:
      0 0px 19.7px -19px rgba(0, 0, 0, 0.06),
      0 0px 157px -19px rgba(0, 0, 0, 0.20)
;



}
.vb-dialog > .window.small {
  width: 324px;
}
.vb-dialog > .window.medium {
  width: 524px;
  height: auto;
}
.vb-dialog > .window.large {
  width: 100%;
  height: 100%;
}
.vb-dialog > .window > .header {
  position: relative;
  height: 50px;
  padding: 0 14px;
}
.vb-dialog > .window > .header > h3.title {
  font-size: 1rem;
}
.vb-dialog > .window > .header > .close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  transition: .5s;
  background-color: #f5f6fa;
}
.vb-dialog > .window > .header > .close > svg {
  fill: #3d3d3d;
}
.vb-dialog > .window > .body {
  padding: 14px;
  height: calc(100% - 50px);
}
</style>