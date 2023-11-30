/**
 * 通讯数据返回接口，用于判定通讯成功、失败，获取code、message，获取数据key值
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export interface ZCommReply {
    /** 自定义结果是否成功 */
    isSuccess: (code) => boolean;
    
    /** 服务器返回信息字段 */
    msgKey?: string;
    
    /** 服务器返回标识字段 */
    codeKey?: string;
    
    /** 服务器返回标识字段 */
    dataKey?: string;
}
