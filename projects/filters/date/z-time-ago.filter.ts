import {ConvertibleDate, DateUtil} from '#';

/**
 * 获取时间用..以前的形式
 *
 * @author chaimzhang
 * @since 2021/4/6 10:44
 */
export default function(value: ConvertibleDate) {
    return DateUtil.getTimeAgo(value);
}

