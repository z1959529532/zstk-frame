import {v4 as uuidv4} from 'uuid';

/**
 * @ignore
 */
const _regExp = new RegExp('-', 'g');

/**
 * Id工具类
 *
 * @author ZColin
 * @since 2020/5/8 20:10
 */
export class IdUtil {
    /**
     * 生成指定值的随机数
     * @param min      最小值
     * @param max      最大值
     */
    static random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * 获取32位uuid
     * @example xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     * @see {@link simpleUUID}
     */
    static randomUUID(): string {
        return (uuidv4() as string);
    }
    
    /**
     * 获取32位uuid
     * @example xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     * @see {@link randomUUID}
     */
    static simpleUUID() {
        return IdUtil.randomUUID().replace(_regExp, '');
    }
}
