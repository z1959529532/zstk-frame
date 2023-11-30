import {Vue} from 'vue/types/vue';

/**
 * AppServiceUtil
 *
 * @author chaimzhang
 * @since 2021/4/12 15:16
 */
export class AppServiceUtil {
    private static vue: Vue;
    
    static init({vue: Vue}) {
        AppServiceUtil.vue = Vue;
    }
    
    static getVue(): Vue {
        return AppServiceUtil.vue;
    }
}
