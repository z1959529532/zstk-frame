/**
 * 自定义排序字段基类，如果使用排序，实例需要实现此接口并设置orderNum值
 */
export interface IOrderNum {
    /** 排序值 */
    orderNum: number;
    
    /** 字段值 */
    [key: string]: any;
}

/**
 * 数组工具类
 *
 * @author ZColin
 * @since 2020/8/20 20:53
 */
export class ArrayUtil {
    /**
     * 值是否是数组
     */
    public static isArray(value: any): boolean {
        return Array.isArray(value);
    }
    
    /**
     * 是否为空
     */
    public static isEmpty(arr) {
        return arr === undefined || arr === null || arr.length == 0;
    }
    
    /**
     * 判断是否包含
     */
    public static isContains(arr, item) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 获取包含元素索引
     */
    public static getIndex(arr, item) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return undefined;
    }
    
    /**
     * 为含有orderNum字段元素的数组设置order顺序
     */
    public static setOrderNum<T extends IOrderNum>(...args: T[][]) {
        args.forEach(list => {
            for (let i = 0; i < list.length; i++) {
                list[i].orderNum = i;
            }
        });
    }
}


