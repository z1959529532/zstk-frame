import {reverse} from 'lodash';

/**
 * 反转数组
 *
 * @example
 *
 * [1,2,3,4,5,6] => [6,5,4,3,2,1]
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function<T>(value: T[]): T[] {
    return reverse(value);
}

