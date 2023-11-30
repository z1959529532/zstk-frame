import {Observable} from 'rxjs';

/**
 * 字段类型判断工具
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class FieldUtil {
    
    /**
     * 是否是可用字段，不是undefined、null、NaN
     */
    static isValid(value: any): boolean {
        return !((typeof value === 'number' && isNaN(value)) || value === undefined || value == null);
    }
    
    /**
     * 值是否未定义
     */
    static isUndefined(value: any): boolean {
        return value === undefined || (typeof value === 'number' && isNaN(value));
    }
    
    /**
     * 是否boolean类型
     */
    static isBoolean(val: any): boolean {
        return typeof val === 'boolean';
    }
    
    /**
     * 是否string类型
     */
    static isString(val: any): boolean {
        return typeof val === 'string';
    }
    
    /**
     * 是否number类型
     */
    static isNumber(val: any): boolean {
        return typeof val === 'number';
    }
    
    /**
     * 值是否是对象
     */
    static isObject(value: any): boolean {
        return value !== null && typeof value === 'object';
    }
    
    /**
     * 值是否是方法
     */
    static isFunction(val: any): boolean {
        return typeof val === 'function';
    }
    
    /**
     * 值是否是数组
     */
    static isArray(value: any): boolean {
        return Array.isArray(value);
    }
    
    /**
     * 值是否是promise
     */
    static isPromise(obj: any): boolean {
        return !!obj && typeof obj.then === 'function';
    }
    
    /**
     * 值是否是observable
     */
    static isObservable(obj: any | Observable<any>): boolean {
        return !!obj && typeof obj.subscribe === 'function';
    }
}
