import {compact} from 'lodash';

/**
 * 创建新数组，包含原数组的非假元素
 *
 * @example
 *
 * [1,2,0,false,'',6] => [1,2,6]
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function(value: any[]): any[] {
    return compact(value);
}
