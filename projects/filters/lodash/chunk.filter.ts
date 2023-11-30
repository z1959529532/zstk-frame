import {chunk} from 'lodash';

/**
 * 将数组拆分为多个size长度的数组
 *
 * @example
 *
 * [1,2,3,4,5,6] => chunk(arr,2) => [[1,2],[3,4],[5,6]]
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function <T>(value: T[], size: number = 1): T[][] {
    return chunk(value, size);
}
