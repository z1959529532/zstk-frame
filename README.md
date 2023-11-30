# ZFrame-Vue 中航安为前端组件库

基于Vue、Ant-design-vue、Lodash、axios封装常用的指令、过滤器、通讯辅助类、装饰器等功能。

## 快速上手
### 安装
- yarn

```
yarn add zframe-vue
```
- npm

```
npm install zframe-vue
```

### 环境集成
- main.ts
```ts
    import ZFrameVue, {AppServiceUtil, ZComm, ZHttp} from 'zframe-vue';
    
    ZComm.setComm(new ZHttp());
    Vue.use(ZFrameVue);
    new Vue({
        created() {
            AppServiceUtil.init({
                vue: this
            });
        },
        render: h => h(App)
    }).$mount('#app');
```

### 功能使用
到此，你可以开始愉快的编码之旅了。
