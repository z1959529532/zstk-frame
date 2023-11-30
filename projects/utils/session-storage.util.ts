/**
 * session存储工具类
 *
 * @author chaimzhang
 * @since 2020/4/17 11:21
 */
export class SessionStorageUtil {
    /**
     * 通过键获取值
     * @param key 键
     */
    public static get(key: string): string {
        return sessionStorage.getItem(key);
    }
    
    /**
     * 是否存在键
     * @param key 键
     */
    public static has(key: string): boolean {
        return Object.keys(sessionStorage).includes(key);
    }
    
    /**
     * 将map中各项存入session
     * @param map map
     */
    public static setMap(map: Map<string, string>): void {
        if (map && map.size > 0) {
            map.forEach((value, key) => sessionStorage.setItem(key, value));
        }
    }
    
    /**
     * 存储键值对
     * @param key 键
     * @param value 值
     */
    public static set(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }
    
    /**
     * 移除一个键值对
     * @param key 键
     */
    public static remove(key: string): void {
        sessionStorage.removeItem(key);
    }
    
    /**
     * 清除所有键值对
     */
    public static clear(): void {
        sessionStorage.clear();
    }
}
