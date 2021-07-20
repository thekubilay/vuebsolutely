<template>
  <transition :name="animation">
    <div class="vb-select relative transition" :style="styles" :class="{active:state}">
      <span v-if="title" class="title text-left block">{{title}}</span>

      <span class="placeholder flex align-center pointer relative"
            :class="{active:state, 'error':!isValid, filter:state && filter}"
            :style="{borderRadius:radius, backgroundColor:bgColor}">

        <span class="container-wrapper flex"
              :class="{'flex-column': state && filter}">
          <span @click="open()"
                class="selected flex align-center"
                :class="{filter:state && filter}">{{selected}}</span>
          <input v-if="state && filter"
                 class="pointer"
                 v-model="setKwargs" type="text" :readonly="!filter"/>
          <svg v-if="state && filter" class="scope-icon" x="0px" y="0px" viewBox="0 0 512 512">
              <path d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474    c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323    c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848    S326.847,409.323,225.474,409.323z"/>
              <path d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328    c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/>
          </svg>
        </span>

        <span v-if="container && multiple && container.length > 1"
              class="multiple flex align-center justify-center">
          <span class="plus">+</span>{{container.length-1}}
        </span>

        <span @click="open()"
              class="arrow-container flex align-center justify-center"
              :style="{borderBottomRightRadius:radius, borderTopRightRadius:radius}">
          <svg class="dropdown-icon transition"
               :class="{active:state}" width="12px" height="12px" x="0px" y="0px" viewBox="0 0 512 512">
            <path d="M505.752,123.582c-8.331-8.331-21.839-8.331-30.17,0L256,343.163L36.418,123.582c-8.331-8.331-21.839-8.331-30.17,0    s-8.331,21.839,0,30.17l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667    C514.083,145.42,514.083,131.913,505.752,123.582z"/>
          </svg>
        </span>
      </span>

      <transition :name="animation">
        <ul v-if="state"
            ref="state"
            :style="{borderRadius:radius}"
            class="vb-select-wrapper overflow-y"
            :class="{filter:state && filter}">
          <li @click="selectItem(item)"
              v-for="(item, idx) in setOptionsByFilter(options)"
              :key="idx"
              :class="{active:checks[idx].active}"
              class="vb-select-item flex align-center pointer">
            <vb-checkbox v-if="multiple"
                         v-model="checks[idx].active"
                         :radius="!!radius"
                         class="vb-checkbox--item" />
            <span v-if="optionKey" class="vb-text-item">{{item[optionKey]}}</span>
            <span v-else class="vb-text-item" :class="{single:!multiple}">{{item}}</span>
          </li>
        </ul>
      </transition>
      <span v-if="hint" class="hint block">{{hint}}</span>
    </div>
  </transition>
</template>

<script>
import {reactive, ref, watch} from "vue";
import { onClickOutside } from '@vueuse/core'
import VbCheckbox from "@/lib-components/checkbox/VbCheckbox";
import helpers from "@/lib-components/selects/helpers";


export default {
  name: "VbSelect",
  components: {VbCheckbox},
  props:{
    modelValue:[Object, String, Number, Array,],
    multiple:Boolean,
    animation:{
      type:String,
      default: "slideDown"
    },
    filter:Boolean,
    isValid:{
      type:Boolean,
      default:true,
    },
    title: String,
    hint: String,
    placeholder:{
      type:String,
      default:"選択"
    },
    options: Array,
    optionKey: String,
    optionVal: String,
    width:String,
    height: String,
    bgColor: {
      type:String,
      default: "#f5f6fa"
    },
    textColor: String,
    border: String,
    radius: String,
  },
  setup(props, {emit}) {
    const {
      container, selected, checks, kwargs, setKwargs,
      selectItem, setOptionsByFilter, setDefaultSelectedItem,
    } = helpers(props, {emit})
    const dropdown = ref(null)
    const state = ref(false)
    const styles = reactive({
      width: props.width,
      height: props.height,
      color: props.textColor,
      borderRadius: props.radius ? props.radius : false,
    })

    onClickOutside(state, (event) => {
      if (event){
        setTimeout(() => {
          if (event.target.localName !== "input") {
            state.value = false
          }
        }, 100)
      }
    })

    watch(() => props.modelValue, (val) => {
      setDefaultSelectedItem(val)
      if (!props.multiple){
        state.value = false
      }
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
    watch(() => props.radius, (val) => {
      styles.borderRadius = val ? val : false
    })

    open = () => {
      state.value = !state.value;
    }

    return {
      dropdown, state, styles, container, selected, checks, setKwargs,
      open, selectItem, setOptionsByFilter,
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
.vb-select:hover {
  transform: translateY(-2px);
}
.vb-select.active {
  transform: translateY(-2px);
}
.vb-select > span.title {
  padding-left: 5px;
  font-size: .8rem;
  margin-bottom: 4px;
}
.vb-select > span.hint {
  padding-left: 5px;
  font-size: .65rem;
  color: #a4b0be;
  margin-top: 4px;
  margin-bottom: 4px;
}
.vb-select span.placeholder {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 38px;
  font-size: .8rem;
  color: #a4b0be;
}
.vb-select span.placeholder.filter {
  height: 58px;
}
.vb-select span.multiple {
  position: absolute;
  right: 30px;
  top: 50%;
  background-color: white;
  box-shadow: 0 25px 20px -25px rgba(0, 0, 0, .1);
  padding: 0px 6px 2px 6px;
  border: 1px solid #f5f6fa;
  font-size: .8rem;
  border-radius: 14px;
  color: #3d3d3d;
  transform: translateY(-50%);
}
.vb-select span.multiple > span.plus {
  font-size: .7rem;
  position: relative;
  top: .5px;
  display: block;
}
.vb-select span.placeholder.error {
  background: rgba(255, 71, 87, .1) !important;
  border: 1px solid #ff4757;
}
.vb-select:hover > span.placeholder {
  box-shadow: 0 25px 20px -25px rgba(0, 0, 0, .1);
}
.vb-select span.placeholder > .container-wrapper {
  width: calc(100% - 24px);
  height: calc(100% - 2px);
}
.vb-select span.placeholder > .container-wrapper input {
  height: 30px;
  font-size: .8rem;
  color: #a4b0be;
  background: none;
  padding-left: 30px;
  border: 0;
  outline: 0;
  padding-right: 34px;
}
.vb-select span.placeholder > .container-wrapper svg.scope-icon {
  position: absolute;
  left: 10px;
  bottom: 8px;
  fill: #a4b0be;
  width: 14px;
}
.vb-select span.placeholder > .container-wrapper > span.selected {
  height: 100%;
  color: #3d3d3d;
  padding-left: 10px;
  width: 100%;
}
.vb-select span.placeholder.filter > .container-wrapper > span.selected {
  height: 30px;
}
.vb-select span.placeholder > span.arrow-container {
  position: absolute;
  right: 0;
  height: 100%;
  width: 22px;
  background-color: #f1f2f6;
}
.vb-select span.placeholder > .arrow-container > svg.dropdown-icon {
  transform: rotateX(0deg);
}
.vb-select span.placeholder > .arrow-container > svg.dropdown-icon.active {
  transform: rotateX(180deg);
}
.vb-select > ul {
  position: absolute;
  top: 66px;
  z-index: 1;
  width: calc(100% - 2px);
  border: 1px solid #f5f6fa;
  height: 200px;
  box-shadow:
      0 0px 2.2px -5px rgba(0, 0, 0, 0.008),
      0 0px 5.3px -5px rgba(0, 0, 0, 0.012),
      0 0px 10px -5px rgba(0, 0, 0, 0.015),
      0 0px 17.9px -5px rgba(0, 0, 0, 0.018),
      0 0px 33.4px -5px rgba(0, 0, 0, 0.022),
      0 0px 80px -5px rgba(0, 0, 0, 0.03)
;
}
.vb-select > ul.filter {
  top: 84px !important;
}
.vb-select > ul > li {
  width: 100%;
  min-height: 38px;
  /*border-bottom: 1px solid #f5f6fa;*/
  background-color: white;
}
.vb-select > ul > li:hover {
  background-color: #f8f8fa;;
}
.vb-select > ul > li.active {
  background-color: rgba(6, 82, 221, .06);;
}
.vb-select > ul > li:last-child {
  border-bottom: 0;
}
.vb-select > ul > li > .vb-checkbox--item {
  margin-left: 8px;
}
.vb-select > ul > li > .vb-text-item {
  font-size: .8rem;
}
.vb-select > ul > li > .vb-text-item.single {
  padding-left: 10px;
}
</style>