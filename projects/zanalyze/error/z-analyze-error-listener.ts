import {ZAnalyze} from '../z-analyze';

/**
 * 页面出错监听
 * @ignore
 *
 * @author ZColin
 * @since 2020/5/11 21:56
 */
export class ZAnalyzeErrorListener {
    /**
     * 添加页面出错监听
     */
    static addErrorListener() {
        window.onerror = (message, url, line) => {
            ZAnalyze.getInstance().exception(url, line + '', message?.toString());
        };
    }
}
