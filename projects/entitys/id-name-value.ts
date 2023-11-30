import {IdName} from './id-name';
import {NameValue} from './name-value';

/**
 * id、name、value通用对象
 * @default Id = string, Name = string, Value = string
 *
 * @author chaimzhang
 * @since 2020/8/17 11:33
 */
export class IdNameValue<Id = string, Name = string, Value = string>
    implements IdName<Id, Name>, NameValue<Name, Value> {
    /** id */
    id: Id;
    /** 名称 */
    name: Name;
    /** 值 */
    value: Value;
    
    constructor(id?: Id, name?: Name, value?: Value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
}
