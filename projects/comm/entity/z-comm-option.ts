import {ResponseType} from 'axios';
import {ZComponent, ZHttpHeaders, ZPage} from '../..';
import {ZCommLogEntity} from './z-comm-log';
import {ZCommReply} from './z-comm-reply';
import {ZCommResult} from './z-comm-result';

/**
 * ZComm支持的restful请求类型
 *
 * @author chaimzhang
 * @since 2021/4/12 15:07
 */
export type ZCommMethod = 'get' | 'post' | 'delete' | 'put';

/**
 * 通讯请求参数类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export interface ZCommOption<T = any> {
    /** log实体，本地使用 */
    log?: ZCommLogEntity;
    /** 请求地址 */
    url?: string;
    /** 请求参数 */
    body?: any;
    /** 是否显示进度条，此属性在multiRequest中失效 */
    isShowLoading?: boolean;
    /** 进度条信息，，此属性在multiRequest中失效 */
    loadingMsg?: string;
    /** 是否显示错误toast */
    isShowToastError?: boolean;
    /** 请求超时时间 */
    timeout?: number;
    /** 返回值错误处理对象 */
    zReply?: ZCommReply;
    /** 返回处理回调对象 */
    result?: ZCommResult<T>;
    /** 加载中，上下文对象 */
    loadingContext?: ZPage;
    /** ZComponent对象，用户回调ZComponent对象相关方法，如配合zWaitResponse使用 */
    zComponent?: ZComponent;
    /** 请求头 */
    header?: ZHttpHeaders;
    /** 请求类型 ,http使用 */
    type?: ZCommMethod;
    /** 是否需要返回原始数据对象，如果为否，在返回 obj['dataKey']的内容 */
    requireOriginResponseData?: boolean;
    /** 如果options有值，则使用options,http使用 */
    options?: {
        observe?: 'body' | 'events' | 'response';
        reportProgress?: boolean;
        responseType?: ResponseType;
        withCredentials?: boolean;
    };
}
