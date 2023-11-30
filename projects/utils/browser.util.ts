/**
 * 浏览器相关工具类
 *
 * @author ZColin
 * @since 2021/1/12 20:13
 */
export class BrowserUtil {
    private static readonly FIREFOX = 'Firefox';
    private static readonly CHROME = 'Chrome';
    private static readonly OPERA = 'Opera';
    private static readonly SAFARI = 'Safari';
    private static readonly IE = 'compatible';
    
    /**
     * 获取浏览器名称
     */
    static getName(): string {
        const userAgent = navigator.userAgent;
        //判断顺序不可修改
        if (userAgent.includes(BrowserUtil.FIREFOX)) {
            return BrowserUtil.FIREFOX;
        }
        if (userAgent.includes(BrowserUtil.CHROME)) {
            return BrowserUtil.CHROME;
        }
        if (userAgent.includes(BrowserUtil.OPERA)) {
            return BrowserUtil.OPERA;
        }
        if (userAgent.includes(BrowserUtil.SAFARI)) {
            return BrowserUtil.SAFARI;
        }
        if (userAgent.includes(BrowserUtil.IE)) {
            return BrowserUtil.IE;
        }
        return 'unKnow brower';
    }
    
    /**
     * 判断是否是Firefox浏览器
     */
    static isFirefox(): boolean {
        return BrowserUtil.compare(BrowserUtil.FIREFOX);
    }
    
    /**
     * 判断是否是Chrome浏览器
     */
    static isChrome(): boolean {
        return BrowserUtil.compare(BrowserUtil.CHROME);
    }
    
    /**
     * 判断是否是Opera浏览器
     */
    static isOpera(): boolean {
        return BrowserUtil.compare(BrowserUtil.OPERA);
    }
    
    /**
     * 判断是否是Safari浏览器
     */
    static isSafari(): boolean {
        return BrowserUtil.compare(BrowserUtil.SAFARI);
    }
    
    /**
     * 判断是否是IE浏览器
     */
    static isIE(): boolean {
        return BrowserUtil.compare(BrowserUtil.IE);
    }
    
    /**
     * 浏览器比较
     * @param type 浏览器名称
     */
    private static compare(type: string): boolean {
        return BrowserUtil.getName() == type;
    }
}
