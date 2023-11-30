import {AppServiceUtil} from '..';

/**
 * ui相关
 *
 * @author chaimzhang
 * @since 2021/4/2 8:58
 * @ignore
 */
export class ZUiService {
    
    /**
     * 刷新界面
     */
    static refreshUI() {
        return new Promise<void>(res => {
            AppServiceUtil.getVue()?.$nextTick(() => {
                res();
            });
        });
    }
}
