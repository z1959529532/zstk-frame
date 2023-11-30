<template>
    <div class="home">
    </div>
</template>

<script lang="ts">

import {FileReply} from '#';
import {Component, Vue} from 'vue-property-decorator';

/** vue文件导入时必须带后缀名.vue */
@Component({
    name: 'Home'
})
export default class Home extends Vue {
    show = true;
    checked = false;
    bothWayValue = 0;
    file!: FileReply;
    thisFileList: FileReply[] = [];
    str = 'hahahah';
    src = require('../assets/logo.png');
    date: object = null;
    
    pageSizeChange(num) {
        console.log(num);
    }
    
    pageNumChange(num) {
        console.log(num);
    }
}
</script>
<style lang="less" scoped>
.home {
    height: 100vh !important;
    width: 100vw !important;
    display: flex;
    
    //& > * {
    //    width: 50vw !important;
    //    height: 100%;
    //}
    
}
</style>
