import {ZCommOption} from './z-comm-option';

/**
 * 多个通讯合并请求参数
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export interface ZCommMultiRequestOption {
    /** 单个请求参数数组 */
    option: ZCommOption<any>[];
    /** 是否显示进度条 */
    isHideLoading?: boolean;
    /** 进度条信息 */
    loadingMsg?: string;
}
