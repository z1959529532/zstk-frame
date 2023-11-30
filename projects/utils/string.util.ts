/**
 * 字符串工具类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class StringUtil {
    
    /**
     * 字符串是否为空
     */
    static isEmpty(value: string): boolean {
        return typeof value !== 'string' || value.length === 0;
    }
    
    /**
     * 字符串非空
     */
    static isNotEmpty(value: string): boolean {
        return (typeof value === 'string' && value.length > 0);
    }
    
    /**
     * 字符串比较（不区分大小写）
     */
    public static equalsIgnoreCase(str1: string, str2: string): boolean {
        return str1?.toUpperCase() === str2?.toUpperCase();
    }
    
    /**
     * 字符串分割为字符串数组
     * @param value 字符串
     * @param separator 分割符
     * @param limit 限制在数组中返回的元素数量的值
     */
    static split(value: string, separator: string | RegExp, limit?: number): string[] {
        if (StringUtil.isNotEmpty(value)) {
            return typeof limit === 'number' ? value.split(separator, limit) : value.split(separator);
        }
        return [];
    }
}
