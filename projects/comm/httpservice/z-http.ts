import axios, {AxiosRequestConfig} from 'axios';
import {Observable, Subscription} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map, timeout} from 'rxjs/operators';
import {ZCommLog, ZCommOption, ZCommReplyDefault, ZHttpHeader, ZHttpHeaders, ZToastUtil} from '../..';
import {ZComm} from '../z-comm';

/**
 * ZHttpConfig
 *
 * @author ZColin
 * @since 2020/8/29 20:17
 */
export interface ZHttpConfig {
    /** 是否发送json */
    readonly isSendJson?: boolean;
    /** 全局headerMap */
    readonly globalHeaders?: Record<string, ZHttpHeader>;
    /** 全局超时时间 */
    readonly timeout: number
}

/**
 * Http 服务类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class ZHttp extends ZComm {
    /** 是否发送json， false发送form数据 */
    private readonly isSendJson: boolean = true;
    /** 全局headerMap */
    private readonly globalHeaderMap: Map<string, ZHttpHeader>;
    /** 全局超时时间 */
    private readonly timeout: number = 5000;
    
    constructor(config?: ZHttpConfig) {
        super();
        this.globalHeaderMap = new Map();
        //默认加入zh-app的识别标识
        this.globalHeaderMap.set('zh-app', 'zh-app');
        
        if (config) {
            this.isSendJson = config.isSendJson ?? this.isSendJson;
            this.timeout = config.timeout > 0 ? config.timeout : this.timeout;
            if (typeof config.globalHeaders === 'object') {
                for (const key of Object.keys(config.globalHeaders)) {
                    this.globalHeaderMap.set(key, config.globalHeaders[key]);
                }
            }
        }
    }
    
    /**
     * 网络请求，处理完所有业务数据，不会回调HttpResult中方法，返回Observable，可以进行进一步处理
     *
     * @param  zOption 请求参数信息，{@link ZCommOption}
     * @returns Observable<T>  返回请求结果，需要使用{@link Observable#subscribe}进行订阅
     */
    public requestObservable<T>(zOption: ZCommOption<T>): Observable<T> {
        this.preProcessOnRequest(zOption);
        // 添加通用header
        zOption.header = ZHttpHeaders.processHeaders(zOption.header, this.globalHeaderMap);
        zOption.zReply = zOption.zReply ?? new ZCommReplyDefault();
        const observable = fromPromise(axios.request(this.getAxiosOptions(zOption)));
        //打印日志
        ZCommLog.request(zOption);
        return observable.pipe(timeout(zOption.timeout), map(res =>
                this.processResponse<T>(zOption, zOption.zReply, res.request.response)),
            catchError(error => this.processCatch(zOption, zOption.isShowToastError ?? true, error)));
    }
    
    /**
     * 请求字符串数据
     *
     * @param zOption  请求参数 {@link ZCommOption}
     * @return Subscription  取消请求的对象
     */
    public requestText(zOption: ZCommOption<string>): Subscription {
        zOption.result = zOption.result ?? {};
        zOption.zReply = zOption.zReply ?? new ZCommReplyDefault();
        // 添加通用header
        zOption.header = ZHttpHeaders.processHeaders(zOption.header, this.globalHeaderMap);
        const loadingId = zOption.isShowLoading ? null : ZToastUtil.showLoading(zOption.loadingMsg, {duration: 0});
        zOption.options = zOption.options ?? {};
        zOption.options.responseType = 'text';
        
        const observable = fromPromise(axios.request(this.getAxiosOptions(this.getAxiosOptions(zOption))));
        return observable.pipe(timeout(zOption.timeout),
            catchError(error => this.processCatch(zOption, zOption.isShowToastError, error)))
                         .subscribe(
                             this.successResult(zOption.result, loadingId),
                             this.errorResult(zOption.result, loadingId)
                         );
        
    }
    
    /**
     * 根据zOption生成axios请求时的配置
     * @param zOption ZCommOption
     * @private
     */
    private getAxiosOptions(zOption: ZCommOption): AxiosRequestConfig {
        zOption.type = zOption.type ?? 'post';
        zOption.timeout = zOption.timeout > 0 ? zOption.timeout : this.timeout;
        
        const options = {
            url: zOption.url,
            method: zOption.type,
            transformResponse: data => data?.data,
            headers: zOption.header,
            timeout: zOption.timeout,
            withCredentials: zOption.options?.withCredentials ?? true,
            responseType: (zOption.options?.responseType) ?? (this.isSendJson ? 'json' : undefined)
        };
        
        if (['post', 'put', 'patch'].includes(zOption.type)) {
            // data中内容放到请求体中
            Reflect.set(options, 'data', zOption.body);
        } else if (zOption.body) {
            // params中内容放到url参数中
            Reflect.set(options, 'params', zOption.body);
        }
        return options;
    }
}
