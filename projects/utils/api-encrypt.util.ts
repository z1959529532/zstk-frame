import {AesUtil} from './aes.util';
import {LogUtil} from './log.util';

/**
 * 加密解密服务类
 * 在{@link apiEncrypt}为true时才会开启加密
 *
 * @author ZColin
 * @since 2020/5/23 13:36
 */
export class ApiEncryptUtil {
    /**
     * 加密开关
     */
    static apiEncrypt = false;
    
    /**
     * 加密
     */
    public static encrypt(text: string | object, key?: string): string {
        if (!text) {
            return null;
        }
        
        if (!ApiEncryptUtil.apiEncrypt) {
            if (typeof text === 'string') {
                return text;
            } else {
                return JSON.stringify(text);
            }
        } else {
            if (typeof text === 'string') {
                return AesUtil.encrypt(text, key);
            } else {
                return AesUtil.encrypt(JSON.stringify(text), key);
            }
        }
    }
    
    /**
     * 解密
     */
    public static decrypt(text: string | object, key?: string): string {
        if (!text) {
            return null;
        }
        if (!ApiEncryptUtil.apiEncrypt) {
            if (typeof text === 'string') {
                return text;
            } else {
                return JSON.stringify(text);
            }
        } else {
            if (typeof text === 'string') {
                return AesUtil.decrypt(text, key);
            } else {
                return AesUtil.decrypt(JSON.stringify(text), key);
            }
        }
    }
    
    /**
     * 解密为对象
     */
    public static decryptToObj<T = any>(text: string | object, key?: string): T {
        const decrypt = ApiEncryptUtil.decrypt(text, key);
        try {
            const obj = JSON.parse(decrypt);
            return obj as T;
        } catch (e) {
            LogUtil.error(e);
            return null;
        }
    }
}
