import {DirectiveBinding} from 'vue/types/options';
import {LogUtil} from '../utils/log.util';

/**
 * v-error-img
 *
 * 指定img标签加载失败后显示的图片
 *
 * @author chaimzhang
 * @since 2021/4/20 18:51
 */
export default {
    bind(el: HTMLImageElement, binding: DirectiveBinding) {
        if (el instanceof HTMLImageElement) {
            el.onerror = () => {
                el.src = binding.value || require('../assets/images/default.png');
            };
        } else {
            LogUtil.warn('v-error-img只能在img标签上使用!\n', (el as any).outerHTML);
        }
    }
};
