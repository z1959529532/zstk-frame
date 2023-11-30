import {AesUtil} from '..';

/**
 * AES加密
 *
 * @author chaimzhang
 * @since 2021/4/6 11:18
 */
export default function(text: string | object): string {
    if (!text) {
        return null;
    }
    
    if (typeof text === 'string') {
        return AesUtil.encrypt(text);
    } else {
        return AesUtil.encrypt(JSON.stringify(text));
    }
}
