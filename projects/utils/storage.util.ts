/**
 * 本地存储工具类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class StorageUtil {
    /**
     * 通过键获取值
     * @param key 键
     */
    public static get(key: string): string | null {
        return window.localStorage.getItem(key);
    }
    
    /**
     * 是否存在键
     * @param key 键
     */
    public static has(key: string): boolean {
        return Object.keys(window.localStorage).includes(key);
    }
    
    /**
     * 将map中各项存入本地
     * @param map map
     */
    public static setMap(map: Map<string, string>): void {
        if (map && map.size > 0) {
            map.forEach((value, key) => window.localStorage.setItem(key, value));
        }
    }
    
    /**
     * 存储键值对
     * @param key 键
     * @param value 值
     */
    public static set(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }
    
    /**
     * 移除一个键值对
     * @param key 键
     */
    public static remove(key: string): void {
        window.localStorage.removeItem(key);
    }
    
    /**
     * 清除所有键值对
     */
    public static clear(): void {
        window.localStorage.clear();
    }
}
