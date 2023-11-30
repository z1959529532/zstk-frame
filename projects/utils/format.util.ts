/**
 * 格式化相关工具类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class FormatUtil {
    
    /**
     * 格式“是”or“否”
     */
    static formatYesOrNo(value: number | string): string {
        return (value === '1' || value === 1) ? '是' : ((value === '0' || value === 0) ? '否' : null);
    }
    
    /**
     * 前面补零
     * @param number 被操作数
     * @param n      总位数
     */
    static prefixZero(number, n) {
        return (Array(n).join('0') + number).slice(-n);
    }
    
    /**
     * 去掉所有的html标记
     */
    static delHtmlTag(str: string) {
        str = str.replace(/(\n)/g, '');
        str = str.replace(/(\t)/g, '');
        str = str.replace(/(\r)/g, '');
        str = str.replace(/<\/?[^>]*>/g, '');
        str = str.replace(/\s*/g, '');
        // 去掉nbsp
        str = str.replace(/&nbsp;/ig, '');
        // 去掉npsp
        str = str.replace(/&npsp;/ig, '');
        return str;
    }
    
    /**
     * json 格式化
     */
    static jsonFormat(jsonStr: string): string {
        let jsonObj;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (error) {
            return jsonStr;
        }
        return JSON.stringify(jsonObj, null, '\t');
    }
}
