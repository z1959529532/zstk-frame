/**
 * name、count通用对象
 * @default Name = string, Count = number
 *
 * @author chaimzhang
 * @since 2020/4/16 22:22
 */
export class NameCount<Name = string, Count = number> {
    /** 名称 */
    name: Name;
    /** 数量 */
    count: Count;
    
    constructor(name?: Name, count?: Count) {
        this.name = name;
        this.count = count;
    }
}
