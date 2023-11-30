/**
 * 正则匹配工具类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class RegexUtil {
    
    /**
     * Url是否合法
     */
    static isUrl(value): boolean {
        const regStr = '^((https|http|ftp|rtsp|mms)?://)'
            // ftp的user@
            + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?'
            // IP形式的URL- 199.194.52.184
            + '(([0-9]{1,3}\.){3}[0-9]{1,3}'
            // 允许IP和DOMAIN（域名）
            + '|'
            // 域名- www.
            + '([0-9a-z_!~*\'()-]+\.)*'
            // 二级域名
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.\''
            // first level domain- .com or .museum
            + '[a-z]{2,6})'
            // 端口- :80
            + '(:[0-9]{1,4})?'
            // a slash isn't required if there is no file name
            + '((/?)|'
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
        const v = new RegExp(regStr);
        return v.test(value);
    }
    
    /**
     * 电话是否合法
     */
    static isPhone(value) {
        return RegexUtil.isMobile(value) || RegexUtil.isPlane(value);
    }
    
    /**
     * 手机是否合法
     */
    static isMobile(value): boolean {
        let result = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/.test(value);
        return result;
    }
    
    /**
     * 座机是否合法
     */
    static isPlane(value): boolean {
        let result = /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value);
        return result;
    }
    
    /**
     * 删除末尾标点 （非成对标点）
     * @param input 原始字符串
     * @param arg 替换的标点
     */
    static replaceEndPunctuation(input: string, arg: string = ''): string {
        const rep = new RegExp(/[-；。.+=!@#$%^&*？?，：/\\！￥…~|(<[{《【]/g);
        if (input?.length > 0) {
            const char = input.charAt(input.length - 1);
            if (rep.test(char)) {
                return RegexUtil.replaceEndPunctuation(input.substring(0, input.length - 1), arg);
            }
            return input + arg;
        }
        return input;
    }
}

