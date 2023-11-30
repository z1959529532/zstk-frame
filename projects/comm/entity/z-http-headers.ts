import {isFunction} from 'lodash';

/**
 * ZHttp请求头类型
 *
 * @author chaimzhang
 * @since 2021/4/9 9:09
 */
export type ZHttpHeader = string | string[] | (() => string);

/**
 * ZHttp（多个）请求头对象
 *
 * @author chaimzhang
 * @since 2021/4/9 9:09
 */
export class ZHttpHeaders implements Partial<Record<string, ZHttpHeader>> {
    
    /**
     * 处理请求头
     * @param zHttpHeaders 本次设置的Headers
     * @param globalHeaderMap 全局Headers
     */
    static processHeaders(zHttpHeaders = new ZHttpHeaders(), globalHeaderMap: Map<string, ZHttpHeader> = new Map()): ZHttpHeaders {
        const headersMap = new Map<string, Set<string>>();
        
        //遍历添加本次请求设置的header
        for (let key of Object.keys(zHttpHeaders)) {
            ZHttpHeaders.setHeadersMap(Reflect.get(zHttpHeaders, key), key, headersMap);
        }
        
        //遍历添加全局header
        globalHeaderMap.forEach((v, key) => {
            if (!headersMap.has(key)) {
                ZHttpHeaders.setHeadersMap(v, key, headersMap);
            }
        });
        
        const result = new ZHttpHeaders();
        headersMap.forEach((set, name) => {
            result[name] = Array.from(set);
        });
        
        return result;
    }
    
    /**
     * 往headersMap里放置请求头
     * @private
     */
    private static setHeadersMap(zHttpHeader: ZHttpHeader, key: string, headersMap: Map<string, Set<string>>) {
        const headerValues = ZHttpHeaders.getHeaderValues(zHttpHeader);
        if (headersMap.has(key)) {
            const set = headersMap.get(key);
            for (let item of headerValues) {
                set.add(item);
            }
        } else if (headerValues.length > 0) {
            headersMap.set(key, new Set(headerValues));
        }
    }
    
    /**
     * 获取请求头的值
     * @private
     */
    private static getHeaderValues(zHttpHeader: ZHttpHeader): string[] {
        if (zHttpHeader) {
            if (typeof zHttpHeader === 'string') {
                return [zHttpHeader];
            }
            if (Array.isArray(zHttpHeader)) {
                return zHttpHeader;
            }
            if (isFunction(zHttpHeader)) {
                return ZHttpHeaders.getHeaderValues(zHttpHeader());
            }
        }
        
        return [];
    }
}
