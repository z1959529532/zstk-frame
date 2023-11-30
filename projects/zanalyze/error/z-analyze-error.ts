/**
 * 统计分析异常
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class ZAnalyzeError extends Error {
    
    /**
     * @param message 错误信息
     */
    constructor(public message: string) {
        super(message);
    }
}
