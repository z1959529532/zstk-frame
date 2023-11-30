/**
 * 移除后缀名
 * @param value   需要移除后缀的字符串
 * @param suffix  后缀
 * @ignore
 */
function removeSuffix(value: string, suffix?: string): string {
    if (!value) {
        return value;
    }
    if (!suffix) {
        suffix = value?.substr(value.lastIndexOf('.') + 1);
    }
    
    suffix = '.' + suffix;
    return value?.substr(0, value.lastIndexOf(suffix));
}


/**
 * 忽略掉后缀
 *
 * @author chaimzhang
 * @since 2021/4/6 11:19
 */
export default function(value: string, suffix?: string) {
    return removeSuffix(value, suffix);
}

