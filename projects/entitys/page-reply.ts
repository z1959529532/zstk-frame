/**
 * 通讯响应分页信息类
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class PageReply<T> {
    /** 总条数 */
    total: number;
    /** 总页数 */
    pages: number;
    /** 当前条数 */
    size: number;
    /** 当前页码 */
    current: number;
    /** 记录 */
    records: T[] = [];
}
