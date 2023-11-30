/**
 * 用户行为的基类
 * @ignore
 *
 * @author ZColin
 * @since 2020/5/11 19:31
 */
export class ZAnalyzeProperty {
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
    
    constructor(key: string, keyName: string, value: string) {
        this.key = key;
        this.keyName = keyName;
        this.value = value;
    }
}
