import {IdName} from '..';

/**
 * 字典类服务基类，字典使用{@link IdName}
 *
 * @author chaimzhang
 * @since 2020/10/21 17:23
 */
export abstract class ZBaseDictService<ID = string, NAME = string> {
    
    /**
     * 获取键值对数组
     * @param compareFun 比较方法
     */
    getNameIdArr(compareFun: (val) => boolean = () => true): IdName<ID, NAME>[] {
        const arr = [];
        for (const value of Object.values(this)) {
            if (Reflect.has(value, 'id') && Reflect.has(value, 'name') && compareFun(value)) {
                arr.push({id: value.id, name: value.name});
            }
        }
        return arr;
    }
    
    /**
     * 获取名
     */
    getName(id: ID): NAME {
        return Object.values(this).find(value => value?.id === id)?.name;
    }
}
