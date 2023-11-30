/**
 * id-name实体
 * @default Id = string, Name = string
 *
 * @author chaimzhang
 * @since 2020/11/11 11:31
 */
export class IdName<Id = string, Name = string> {
    /** id */
    id: Id;
    /** 名称 */
    name: Name;
    
    constructor(id?: Id, name?: Name) {
        this.id = id;
        this.name = name;
    }
}
