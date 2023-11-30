import {clone, cloneDeep} from 'lodash';

/**
 * 克隆工具类
 *
 * @author ZColin
 * @since 2020/5/8 20:06
 */
export class CloneUtil {
    /**
     * 对象浅拷贝
     */
    static shallowClone<T>(source: T): T {
        return clone(source);
    }
    
    /**
     * 对象深拷贝
     */
    static deepClone<T>(source: T): T {
        return cloneDeep(source);
    }
    
    /**
     * static对象变量拷贝成普通成员变量
     */
    static staticClone(source) {
        let target = {};
        for (let constructorKey in source.constructor) {
            if (source.constructor.hasOwnProperty(constructorKey)) {
                target[constructorKey] = source.constructor[constructorKey];
            }
        }
    }
}
