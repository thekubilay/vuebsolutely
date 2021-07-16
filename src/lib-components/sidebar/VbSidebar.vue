<template>
    <div class="container height-eighty width-normal"
        :class="[right?'border-radius-rightbar':'border-radius-leftbar',
                 right?'position-right':'position-left',
                 hoverExpand?'hover':false,
                 reduce?'mini':'normal']" 
        :style="styles">
        <div class="">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
// import {ref} from "vue";

export default{
    name : "Sidebar",
    // components : {

    // },
    props : {
        height : String,

        modelValue : Object,
        open: Boolean,
        absolute : Boolean,
        relative : Boolean,
        reduce : Boolean,
        hoverExpand : Boolean,
        sqaure : Boolean,
        notShadow : Boolean,
        textWhite : Boolean,
        notLineActive : Boolean,
        textColor : {
            Type : String,
            default: "#"
        },
        background : {
            Type: String,
            default: "#f4f4f4"
        },
        sidebarItemTo : {
            Type: String,
            default: false
        },
        sidebarItemHref : Boolean,
        right : {
            Type: Boolean,
            require : true
        },
        logo : {
            Type: Object
        },
        footer : {
            Type: Object
        },
        header : {
            Type: Object
        },
        sidebarItemIcon : {
            Type: Object
        },

        
    },
    setup(props) {

        const styles = reactive({
            backgroundColor: props.background,
            height: props.height+'px',
            color: props.textColor,
            borderWidth: props.border ? props.border+"px" : false,
            borderColor: props.border ? props.bgColor : false,
            borderStyle: props.border && props.dashed ? "dashed" : +"solid",
            borderRadius: props.radius ? props.radius+"px" : false,
        })
        
        
        return {
            styles,
        }
    },
}
</script>
<style scoped>

.container {
    display: flex;
    position: absolute;
    z-index: 100;
    transition: 0.3s;
    top: 10px;
}
.normal{
    width: 200px;
    padding: 10px;
}
.mini{
    width: 50px;
    padding: 5px;
}
.height-eighty {
    height: 80%;
}

.position-left {
    left: 0px;
}
.position-right {
    right: 0px;
}
.border-radius-leftbar {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.border-radius-rightbar {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.hover:hover{
    width: 200px;
}
</style>

