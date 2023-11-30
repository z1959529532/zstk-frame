<template>
    <a-config-provider :locale="local">
        <div id="app">
            <div id="nav">
                <router-link to="/">Home</router-link>
                |
                <router-link to="/about">About</router-link>
            </div>
            <router-view/>
        </div>
    </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class App extends Vue {
    local = zhCN;
    
    constructor() {super();}
    
}
</script>
<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2C3E50;
}

#nav {
    padding: 30px;
    
    a {
        font-weight: bold;
        color: #2C3E50;
        
        &.router-link-exact-active {
            color: #42B983;
        }
    }
}
</style>

