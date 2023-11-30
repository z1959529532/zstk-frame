import {ZAnalyzeProperty} from '../..';

/**
 * 分析-应用进入渠道实体类
 * @ignore
 *
 * @author chaimzhang
 * @since 2020/7/13 10:51
 */
export class ZAnalyzeWayUtil {
    /**
     * 获取进入渠道
     */
    static getWay(): ZAnalyzeProperty[] {
        return [new ZAnalyzeProperty('way', '进入渠道', 'web')];
    }
}
