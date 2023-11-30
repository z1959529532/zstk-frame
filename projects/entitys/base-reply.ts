/**
 * 通讯响应实体基类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class BaseReply<T = any> {
    /** 状态码，默认code==200成功，其他失败 */
    code: number;
    /** 状态信息，正常返回错误信息 */
    msg: string;
    /** 数据集 */
    data: T;
}
