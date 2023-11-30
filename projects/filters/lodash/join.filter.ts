import {join} from 'lodash';

/**
 * array中的元素转换为separator分割的字符串
 *
 * @example
 *
 * [1,2,0] => join(array, '_') => 1_2_0
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function(value: any[], separator?: string): string {
    return join(value, separator);
}
