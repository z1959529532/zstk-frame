/**
 * 服务器返回数据
 * @ignore
 *
 * @author ZColin
 * @since 2020/5/11 20:28
 */
export class ZAnalyzeHttpReply<T> {
    success: boolean;
    code: number;
    msg: string;
    data: T;
}
