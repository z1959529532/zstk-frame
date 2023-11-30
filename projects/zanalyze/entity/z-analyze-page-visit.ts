import {ZAnalyzeBase} from './base/z-analyze-base';

/**
 * 访问事件实体类
 *
 * @author ZColin
 * @since 2020-05-11 19:21
 */
export class ZAnalyzePageVisit extends ZAnalyzeBase {
    id: string;
    /** 页面路径 */
    path: string;
    /** 页面名称 */
    page: string;
    /** 进入时间 */
    startTime: number;
    /** 离开时间 */
    endTime: number;
    
}
