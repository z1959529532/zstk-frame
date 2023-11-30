import {ConvertibleDate, DateUtil} from '#';

/**
 * 日期格式转换,默认HH:mm
 *
 * @author chaimzhang
 * @since 2021/4/6 10:17
 */
export default function(value: ConvertibleDate, formatter: string = 'HH:mm') {
    const date = DateUtil.getDate(value);
    
    if (!date) {
        return '';
    }
    
    return DateUtil.getDateStr(date, formatter);
}

