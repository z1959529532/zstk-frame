/**
 * 日志工具类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class LogUtil {
    /** 是否开启debug模式，false时不输出日志 */
    static DEBUG = true;
    
    /**
     * {@link console#log}
     * @param message           日志信息
     * @param optionalParams    日志参数
     */
    static log(message?: any, ...optionalParams: any[]): void {
        if (LogUtil.DEBUG) {
            console.log(message, ...optionalParams);
        }
    }
    
    /**
     * {@link console#error}
     * @param message           日志信息
     * @param optionalParams    日志参数
     */
    static error(message?: any, ...optionalParams: any[] | any): void {
        if (LogUtil.DEBUG) {
            console.error(message, ...optionalParams);
        }
        
    }
    
    /**
     * {@link console#warn}
     * @param message           日志信息
     * @param optionalParams    日志参数
     */
    static warn(message?: any, ...optionalParams: any[] | any): void {
        if (LogUtil.DEBUG) {
            console.warn(message, ...optionalParams);
        }
    }
    
    /**
     * {@link console#clear}
     */
    static clear(): void {
        if (LogUtil.DEBUG) {
            console.clear();
        }
    }
    
    /**
     * {@link console#log}打印日志对象
     * @param message           日志对象
     */
    static logObject(message?: object) {
        if (LogUtil.DEBUG) {
            console.log(JSON.stringify(message, null, 2));
        }
    }
}
