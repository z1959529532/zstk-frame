import {Base64Util} from '#';

/**
 * {@link Base64Util.encode}加密
 *
 * @author chaimzhang
 * @since 2021/4/6 11:21
 */
export default function(value: any): string {
    if (!value) {
        return null;
    }
    
    return Base64Util.encode(value);
}

