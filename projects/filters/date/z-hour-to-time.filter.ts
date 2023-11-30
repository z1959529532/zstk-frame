import {FieldUtil} from '#';

// safari不支持MM-dd-yyyy的格式,先进行替换. 有可能返回的是时间戳，如果是时间戳，直接使用

/**
 * 小时转时分秒
 *
 * @author chaimzhang
 * @since 2021/4/6 10:21
 */
export default function(value: string | number) {
    if (!FieldUtil.isValid(value)) {
        return value;
    }
    
    let totalSeconds = Number(value) * 60 * 60;
    let hour = Math.floor(totalSeconds / (60 * 60));
    let minute = Math.floor((totalSeconds - hour * 60 * 60) / 60);
    let second = totalSeconds - hour * 60 * 60 - minute * 60;
    
    return `${getFullText(hour)}:${getFullText(minute)}:${getFullText(second)}`;
}

/**
 * @ignore
 * @param i
 */
function getFullText(i: number): string {
    return String(i).padStart(2, '0');
}

