<template>
    <div class="container"></div>
</template>

<script>
// import {ref} from "vue";

export default{
    name : "Sidebar",
    // components : {

    // },
    props : {
        modelValue: Object,
        open: {
            Type: Boolean,
            default: false
        },
        absolute : {
            Type: Boolean,
            default: false
        },
        relative : {
            Type: Boolean,
            default: false
        },
        reduce : {
            Type: Boolean,
            default: false
        },
        hoverExpand : {
            Type: Boolean,
            default: false
        },
        sqaure : {
            Type: Boolean,
            default: false
        },
        notShadow : {
            Type: Boolean,
            default: false
        },
        textWhite : {
            Type: Boolean,
            default: false
        },
        notLineActive : {
            Type: Boolean,
            default: false
        },
        background : {
            Type: String,
            default: false
        },
        sidebarItemTo : {
            Type: String,
            default: false
        },
        sidebarItemHref : {
            Type: Boolean,
            default: false
        },
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
        const open = props.open
        
        return {
            open
        }
    },
}
</script>
<style scoped>

.container{
    background-color: aquamarine;
}
</style>

