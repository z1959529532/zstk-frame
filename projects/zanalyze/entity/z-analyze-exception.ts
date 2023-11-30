import {ZAnalyzeBase} from './base/z-analyze-base';

/**
 * 异常信息
 *
 * @author ZColin
 * @since 2020-05-11 19:20
 */
export class ZAnalyzeException extends ZAnalyzeBase {
    /** 时间 */
    time: number;
    /** 类名 */
    className: string;
    /** 行号 */
    line: string;
    /** 错误信息 */
    info: string;
    /** 标签 */
    tags: string[];
}
