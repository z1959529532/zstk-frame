import {ConfigOnClose, ConfigType, MessageOptions} from 'ant-design-vue/types/message';
import {AppServiceUtil, IdUtil} from '..';

/**
 * ZToast配置选项
 *
 * @author chaimzhang
 * @since 2021/4/1 20:34
 */
export interface ZToastOption {
    /** 持续时间 */
    duration?: number;
    /** 关闭回调 */
    onClose?: ConfigOnClose;
    /** 唯一标识 */
    key?: string;
}

/**
 * - 可提供成功、警告和错误等反馈信息。
 * - 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。
 * - 对ant-design-vue {@link $message} 的封装，增加了关闭功能。
 * - 对{@link vue.$message}的配置和样式修改也会影响此功能。
 *
 * @author chaimzhang
 * @since 2021/4/1 16:29
 */
export class ZToastUtil {
    /**
     * 保存已打开Toast的key和配置
     * @private
     */
    private static map: Map<string, MessageOptions> = new Map();
    
    /**
     * 显示进度圈
     * @param content 内容
     * @param options 配置项
     * @return toastId
     */
    static showLoading(content?: ConfigType, options?: ZToastOption): string {
        return ZToastUtil.show({
            content,
            type: 'loading',
            ...options
        });
    }
    
    /**
     * 显示信息
     * @param content 内容
     * @param options 配置项
     * @return toastId
     */
    static showInfo(content: ConfigType, options?: ZToastOption): string {
        return ZToastUtil.show({
            content,
            type: 'info',
            ...options
        });
    }
    
    /**
     * 显示成功信息
     * @param content 内容
     * @param options 配置项
     * @return toastId
     */
    static showSuccess(content: ConfigType, options?: ZToastOption): string {
        return ZToastUtil.show({
            content,
            type: 'success',
            ...options
        });
    }
    
    /**
     * 显示警告信息
     * @param content 内容
     * @param options 配置项
     * @return toastId
     */
    static showWarning(content: ConfigType, options?: ZToastOption): string {
        return ZToastUtil.show({
            content,
            type: 'warning',
            ...options
        });
    }
    
    /**
     * 显示错误信息
     * @param content 内容
     * @param options 配置项
     * @return toastId
     */
    static showError(content: ConfigType, options?: ZToastOption): string {
        return ZToastUtil.show({
            content,
            type: 'error',
            ...options
        });
    }
    
    /**
     * 关闭Toast
     * @param key Toast-Key
     * @return toastId
     */
    static close(key: string) {
        if (key && ZToastUtil.map.has(key)) {
            ZToastUtil.show({...ZToastUtil.map.get(key), duration: 0.001});
        }
    }
    
    /**
     * 显示Toast
     * @param options 配置项
     * @return toastId
     * @private
     */
    private static show(options: MessageOptions): string {
        let key = options.key as string || IdUtil.simpleUUID();
        const config = {...options, key};
        ZToastUtil.map.set(key, config);
        AppServiceUtil.getVue().$message.open(config)
                      .then(() => {
                          ZToastUtil.map.delete(key);
                          key = null;
                      }, () => {
                      });
        return key;
    }
}
