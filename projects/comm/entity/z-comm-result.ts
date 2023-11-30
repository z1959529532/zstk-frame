import {ZCommErrorReply} from './z-comm-error-reply';

/**
 * 通讯数据返回回调接口
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */

export interface ZCommResult<T> {
    /** 成功回调 */
    success?: (obj: T) => void;
    
    /** 失败回调 */
    error?: (error: ZCommErrorReply) => void;
    
    /** 完成回调 */
    complete?: () => void;
    
    /** 加载进度回调 */
    onProgress?: (progress: number) => void;
}

