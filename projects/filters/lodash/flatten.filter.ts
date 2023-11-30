import {flattenDeep} from 'lodash';

/**
 * 转为一维数组
 *
 * @example
 *
 * [1, [2, [3, [4]],5]] =>[1,2,3,4,5]
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function(value: any[]): any[] {
    return flattenDeep(value);
}
