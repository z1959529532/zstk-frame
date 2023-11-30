import * as _ from 'lodash';

/**
 * 随机数工具
 *
 * @author chaimzhang
 * @since 2020/10/15 10:11
 */
export class RandomUtil {
    /**
     * 获取指定范围随机数
     * @param min 最小值
     * @param max 最大值
     * @param float 是否包含浮点数
     */
    static number(min: number = 0, max: number = 10, float: boolean = false): number {
        return _.random(min, max, float);
    }
    
    /**
     * 获取指定范围和个数的随机数列表
     * @param length 总个数
     * @param min 最小值
     * @param max 最大值
     * @param float 是否包含浮点数
     */
    static list(length: number, min: number = 1, max: number = 10, float: boolean = false): number[] {
        const list: number[] = [];
        if (length > 0) {
            for (let i = 0; i < length; i++) {
                list.push(_.random(min, max, float));
            }
        }
        return list;
    }
}
