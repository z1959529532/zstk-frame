/**
 * url工具
 *
 * @author chaimzhang
 * @since 2020/8/26 9:29
 */
export class UrlUtil {
    /**
     * 获取不含参数的url
     * @param  url url
     * @return 默认返回当前url
     */
    static getUrlWithoutParam(url?: string): string {
        if (url) {
            const urlObj = new URL(url);
            return urlObj?.origin + urlObj?.pathname;
        }
        return window.location.origin + window.location.pathname;
    }
    
    /**
     * 获取url参数对象
     */
    static getUrlParams<T extends object>(url: string = window.location.href): Record<keyof T, string> {
        const params = {} as Record<keyof T, string>;
        if (url) {
            new URL(url)?.searchParams?.forEach((v, k) => {
                Reflect.set(params, k, v);
            });
            
        }
        return params;
    }
    
    /**
     * 获取url参数
     */
    static getUrlParam(key: string, url: string = window.location.href): string {
        return new URL(url)?.searchParams?.get(key);
    }
    
    /**
     * 拼接get请求的Url
     * @param url 地址
     * @param params 参数对象
     */
    static joinGetUrl(url: string, params: Record<string, string | number>): string {
        const urlObj = new URL(url);
        
        for (const key of Object.keys(params)) {
            urlObj.searchParams.set(key, params[key] as string);
        }
        return urlObj.toString();
    }
}
