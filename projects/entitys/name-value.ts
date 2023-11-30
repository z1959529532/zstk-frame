/**
 * name、value实体信息
 * @default Name = string, Value = string
 *
 * @author chaimzhang
 * @since 2020/4/16 22:22
 */
export class NameValue<Name = string, Value = string> {
    /** 名称 */
    name: Name;
    /** 值 */
    value: Value;
    
    constructor(name?: Name, value?: Value) {
        this.name = name;
        this.value = value;
    }
}
