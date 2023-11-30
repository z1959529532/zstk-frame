/**
 * 访问时间对应的时长实体类
 *
 * @author ZColin
 * @since 2020-05-11 19:22
 */
export class ZAnalyzePageFocus {
    /** 对应访问的id */
    id: string;
    /** 对应访问的id */
    visitId: string;
    /** 聚焦时间 */
    focusTime: number;
    /** 失焦事件 */
    blurTime: number;
}
