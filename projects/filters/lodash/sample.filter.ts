import {sample} from 'lodash';

/**
 * 从集合中随机取出一个元素
 *
 * @example
 *
 * [1, 2, 3] => 2
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */


export default function(value: any): any {
    return sample(value);
}

