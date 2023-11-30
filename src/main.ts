import Vue from 'vue';
import {AppServiceUtil} from '#';
import App from './app.vue';
import './plugins/antd';
import './plugins/element';
import './plugins/zframe';

import router from './router';
import store from './store';
import './theme/project-styles.less';
import './theme/z-define.less';
import './theme/z-font-styles.less';
import './theme/z-styles.less';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        AppServiceUtil.init({vue: this});
    }
}).$mount('#app');
