import {ZCommReply} from './z-comm-reply';

/**
 * 默认的通讯数据返回处理类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */

export class ZCommReplyDefault implements ZCommReply {
    /** 服务器返回信息字段 */
    msgKey = 'msg';
    
    /** 服务器返回标识字段 */
    codeKey = 'code';
    
    /** 服务器返回标识字段 */
    dataKey = 'data';
    
    /** 自定义结果是否成功 */
    isSuccess = (code) => (200 <= code) && (code < 300);
}
