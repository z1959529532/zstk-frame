import {values} from 'lodash';

/**
 * 创建object自身可枚举属性的数组
 *
 *
 * {'a':1,'b':2,'c':3} = > [1, 2, 3]
 * hello = > ['h','e','l','l','o']
 *
 * @author ZColin
 * @since 2020/5/11 14:54
 */
export default function(value: any): any[] {
    return values(value);
}
