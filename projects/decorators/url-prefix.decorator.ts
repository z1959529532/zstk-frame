import {ZConfig} from '..';

/**
 * url静态类装饰器配置项
 *
 * @author chaimzhang
 * @since 2021/4/13 15:09
 */
export interface UrlPrefixConfig {
    /**
     * 基础url
     *
     * @example https://192.168.1.1:8080
     * @example http://192.168.1.1:8080/user
     * @default {@link ZConfig.BASE_URL}
     */
    readonly baseUrl?: string;
    /**
     * 基础url后的额外前缀
     * @example ['user']
     * @example ['user','login']
     */
    readonly prefix?: string[];
}

/**
 * url静态类装饰器
 *
 * 为url添加前缀
 *
 * @author chaimzhang
 * @since 2020/10/30 13:27
 */
export function UrlPrefix(config?: UrlPrefixConfig) {
    return <T extends object>(o: T) => new Proxy<T>(o, {
        get(target, key) {
            const baseUrl = config?.baseUrl || ZConfig.BASE_URL;
            const prefix = config?.prefix || [];
            let prefixStr = '';
            if (prefix.length > 0) {
                prefixStr += (prefix.join('/') + '/');
            }
            return formatUrl(baseUrl + '/' + prefixStr + Reflect.get(target, key));
        }
    });
}

/**
 * 去除url多余的/
 *
 * @author chaimzhang
 * @since 2021/4/13 16:10
 * @ignore
 */
function formatUrl(url: string): string {
    let suffix = '://';
    const start = url.indexOf(suffix);
    const protocol = url.slice(0, start);
    
    for (let i = start + 3, j = 2; i < url.length; i++) {
        if (url[i] !== '/' || suffix[j] !== '/') {
            suffix += url[i];
            j++;
        }
    }
    return protocol + suffix;
}
