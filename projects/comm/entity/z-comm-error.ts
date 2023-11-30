/**
 * 通用通讯异常
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class ZCommError extends Error {
    
    /**
     * @param code      错误码
     * @param message   错误信息
     */
    constructor(public code: number, public message: string) {
        super(message);
    }
}

