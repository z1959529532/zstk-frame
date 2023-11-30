import {ZAnalyzeBase} from './z-analyze-base';

/**
 * 用户行为的基类
 * @ignore
 *
 * @author ZColin
 * @since 2020/5/11 19:31
 */
export abstract class ZAnalyzeBaseProperty extends ZAnalyzeBase {
    /** 类别 */
    type: string;
    /** 类别名称 */
    typeName: string;
    /** 键 */
    key: string;
    /** 键名称 */
    keyName: string;
    /** 值 */
    value: string;
}
