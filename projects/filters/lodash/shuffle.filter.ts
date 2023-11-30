import {shuffle} from 'lodash';

/**
 * 打乱数组
 *
 * @example
 *
 * [1,2,3,4,5] => [5,2,3,1,4]
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function<T>(value: T[]): T[] {
    return shuffle(value);
}
