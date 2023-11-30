import {IdName} from './id-name';
import {NameCount} from './name-count';

/**
 * id、name、count通用对象
 * @default Id = string, Name = string, Count = number
 *
 * @author chaimzhang
 * @since 2020/8/17 11:33
 */
export class IdNameCount<Id = string, Name = string, Count = number>
    implements IdName<Id, Name>, NameCount<Name, Count> {
    
    /** id */
    id: Id;
    /** 名称 */
    name: Name;
    /** 值 */
    count: Count;
    
    constructor(id?: Id, name?: Name, count?: Count) {
        this.id = id;
        this.name = name;
        this.count = count;
    }
}
