import {ZAnalyzeBase} from './base/z-analyze-base';

/**
 * 自定义事件实体类
 *
 * @author ZColin
 * @since 2020-05-11 19:21
 */
export class ZAnalyzeEvent extends ZAnalyzeBase {
    /** 页面路径 */
    path: string;
    /** 页面名称 */
    page: string;
    /** 操作key */
    key: string;
    /** 操作名称 */
    keyName: string;
    /** 操作类别key */
    type: string;
    /** 操作类别名称 */
    typeName: string;
    /** 操作值 */
    value: string;
    /** 操作时间，单次事件赋此值 */
    time: number;
    /** 操作开始时间 区间时间使用此值 */
    sTime: number;
    /** 操作结束时间 区间时间使用此值 */
    eTime: number;
}
