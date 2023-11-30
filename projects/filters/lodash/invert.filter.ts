import {invert} from 'lodash';

/**
 * 键值反转，如果object有重复的值，后面的会覆盖前面的值
 *
 * @example
 *
 * {'a':1,'b':2,'c':1}=>{'1':'c','1':'b'}
 *
 * @author ZColin
 * @since 2020/5/11 15:16
 */
export default function(value: any): any {
    return invert(value);
}
