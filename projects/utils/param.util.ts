/**
 * url-para工具类
 *
 * @author ZColin
 * @since 2020/5/8 20:58
 */
export class ParamUtil {
    /**
     * 获取url传入的参数值
     * @param key 指定key
     * @param url 指定url（默认使用浏览器当前url）
     */
    static getQueryParam(key: string, url: string = window.location.href): any {
        const urlObj = new URL(url);
        return urlObj.searchParams.get(key);
    }
    
    /**
     * 获取url传入的参数对象
     * @param url 指定url（默认使用浏览器当前url）
     */
    static getQueryParams(url: string = window.location.href): Record<string, any> {
        const urlObj = new URL(url);
        const params = {};
        urlObj.searchParams.forEach((v, k) => {
            Reflect.set(params, k, v);
        });
        return params;
    }
}
