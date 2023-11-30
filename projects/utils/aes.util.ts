import * as CryptoJS from 'crypto-js/index';

/**
 * Aes加密解密
 * 此方法使用AES-128-ECB加密模式，key需要为16位
 * 加密解密key必须相同，如：abcd1234abcd1234
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class AesUtil {
    
    private static key = CryptoJS.enc.Utf8.parse('*&s@md^^es?cxa2w');
    private static iv = CryptoJS.enc.Utf8.parse('mm%td==xxk+l?lx2');
    
    /**
     * 加密
     *
     * @param text       加密字段
     * @param key       密钥
     */
    public static encrypt(text: string, key?: string): string {
        key = key || AesUtil.key;
        let encrypted = CryptoJS.AES.encrypt(text, key,
            {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: AesUtil.iv});
        return encrypted.ciphertext.toString();
    }
    
    /**
     * 解密
     *
     * @param text      加密字段
     * @param key       密钥
     */
    public static decrypt(text: string, key?: string): string {
        key = key || AesUtil.key;
        let decrypt = CryptoJS.AES.decrypt(text, key,
            {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: AesUtil.iv});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}
