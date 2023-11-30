import {FieldUtil} from './field.util';
import {LogUtil} from './log.util';
import {StringUtil} from './string.util';

/**
 * base64加密解密
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */

export class Base64Util {
    private static _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    
    /**
     * 加密
     */
    static encode(content: any): string {
        if (!FieldUtil.isValid(content)) {
            return content;
        }
        let input: string = content;
        if (typeof content !== 'string') {
            input = JSON.stringify(content);
        }
        let output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = Base64Util.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                     Base64Util._keyStr.charAt(enc1) + Base64Util._keyStr.charAt(enc2) +
                     Base64Util._keyStr.charAt(enc3) + Base64Util._keyStr.charAt(enc4);
        }
        return output;
    }
    
    /**
     * 解密
     */
    static decode(input: string): string {
        if (StringUtil.isEmpty(input)) {
            return input;
        }
        let output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = Base64Util._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64Util._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64Util._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64Util._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64Util.utf8_decode(output);
        return output;
    }
    
    /**
     * 解密并Json.parse
     */
    static decodeAndParse<T>(input: string): T {
        const decode = Base64Util.decode(input);
        if (StringUtil.isNotEmpty(decode)) {
            try {
                return JSON.parse(decode) as T;
            } catch (e) {
                LogUtil.error(e);
                return null;
            }
        }
        return null;
    }
    
    /**
     * 获取移除头部的base64数据
     * @param data   data
     * @returns string
     */
    static getRealData(data: string) {
        const result = data?.replace(/^data:image\/(jpeg|png|gif);base64,/, '');
        return result;
    }
    
    /**
     * @private
     */
    private static utf8_encode(string) {
        string = string.replace(/\r\n/g, '\n');
        let utftext = '';
        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            
        }
        return utftext;
    }
    
    /**
     * @private
     */
    private static utf8_decode(utftext) {
        let string = '', i = 0, c = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
    
}
