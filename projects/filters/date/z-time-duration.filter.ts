import {ConvertibleDate} from '#';

/**
 * @ignore
 */
const minute = 60_000;
/**
 * @ignore
 */
const hour = minute * 60;
/**
 * @ignore
 */
const day = hour * 24;

/**
 * 获取中文分隔字符串
 * @ignore
 */
function getChineseStr(value: number, format: 'HHmm' | 'ddHHmm' = 'ddHHmm'): string {
    if (value < minute) {
        return '0分钟';
    } else {
        let str = '';
        let dayC = 0;
        if (format === 'ddHHmm') {
            dayC = (value / day) >> 0;
            value = value - (dayC * day);
        }
        
        const hourC = (value / hour) >> 0;
        value = value - (hourC * hour);
        
        const minC = (value / minute) >> 0;
        if (dayC > 0) {
            str = dayC + '天';
        }
        if (hourC > 0) {
            str = str + hourC + '小时';
        }
        if (minC > 0) {
            str = str + minC + '分钟';
        }
        return str;
    }
}

/**
 * 获取冒号分隔字符串
 * @ignore
 */
function getColonStr(value: number, format: 'HHmm' | 'ddHHmm' = 'ddHHmm'): string {
    if (value < minute) {
        return '0:00';
    } else {
        let str = '';
        let dayC = 0;
        if (format === 'ddHHmm') {
            dayC = (value / day) >> 0;
            value = value - (dayC * day);
        }
        
        const hourC = (value / hour) >> 0;
        value = value - (hourC * hour);
        
        const minC = (value / minute) >> 0;
        if (dayC > 0) {
            str = dayC + ' ';
        }
        if (hourC > 0) {
            str = str + hourC + ':';
        }
        if (minC >= 0) {
            if (minC > 9) {
                str = str + minC;
            } else {
                str = str + '0' + minC;
            }
            
        }
        return str;
    }
}

/**
 * [秒数]或[毫秒数]转换为x天x小时x分钟
 *
 * @param value  毫秒数
 * @param format 目标格式：'HHmm' | 'ddHHmm'（默认）
 * @param mode 显示模式
 *
 * @author chaimzhang
 * @since 2021/4/6 10:44
 */
export default function(value: ConvertibleDate, format: 'HHmm' | 'ddHHmm' = 'ddHHmm',
                        mode: 'colon' | 'chinese' = 'chinese'): string {
    if (typeof value != 'number' || value < 0) {
        return '';
    }
    
    switch (mode) {
        case 'chinese':
            return getChineseStr(value, format);
        case 'colon':
            return getColonStr(value, format);
        default:
            return '';
    }
}
