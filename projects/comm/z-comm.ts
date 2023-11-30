import axios from 'axios';
import {Observable, Subscription, TimeoutError} from 'rxjs';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {throwError} from 'rxjs/internal/observable/throwError';
import {ApiEncryptUtil, FieldUtil, LogUtil, ZCommMethod, ZConfig, ZToastUtil} from '..';
import {ZCommError} from './entity/z-comm-error';
import {ZCommErrorReply} from './entity/z-comm-error-reply';
import {ZCommLog} from './entity/z-comm-log';
import {ZCommMultiRequestOption} from './entity/z-comm-multi-request-option';
import {ZCommOption} from './entity/z-comm-option';
import {ZCommReply} from './entity/z-comm-reply';
import {ZCommResult} from './entity/z-comm-result';

/**
 * 通讯 服务类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export abstract class ZComm {
    private static comm: ZComm = null;
    private static readonly HTTP_ERROR_TOAST_ID = 'Z_HTTP_ERROR_TOAST';
    /** 请求错误拦截器,返回值intercept为true，代表消费错误处理，不再继续向下执行 */
    errorIntercept: (zOption: ZCommOption, isShowToastError: boolean,
                     error) => { intercept: boolean, errorReply: ZCommErrorReply };
    
    /** 请求成功拦截器, 返回值intercept为true，代表消费错误处理，不再继续向下执行 */
    successIntercept: (zOption: ZCommOption, zReply: ZCommReply,
                       res: any) => { intercept: boolean, result: any };
    
    /**
     * 获取通讯单例
     * @private
     */
    private static getInstance() {
        return ZComm.comm;
    }
    
    /**
     * 设置通讯实现策略，支持ZHttp和ZCef
     * @param comm 通讯策略实现类对象
     */
    public static setComm(comm: ZComm) {
        ZComm.comm = comm;
    }
    
    //=================================语法糖，省去单例调用=========================================================
    /**
     * post请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url             请求地址
     * @param zOption         请求参数
     * @param result          回调接口
     */
    public static post<T>(url: string, zOption: ZCommOption<T>, result: ZCommResult<T>): Subscription {
        return ZComm.restfulRequest<T>('post', url, zOption, result);
    }
    
    /**
     * put请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url             请求地址
     * @param zOption         请求参数
     * @param result          回调接口
     */
    public static put<T>(url: string, zOption: ZCommOption<T>, result: ZCommResult<T>): Subscription {
        return ZComm.restfulRequest<T>('put', url, zOption, result);
    }
    
    /**
     * get请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url             请求地址
     * @param zOption         请求参数
     * @param result          回调接口
     */
    public static get<T>(url: string, zOption: ZCommOption<T>, result: ZCommResult<T>): Subscription {
        return ZComm.restfulRequest<T>('get', url, zOption, result);
    }
    
    /**
     * delete请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url             请求地址
     * @param zOption         请求参数
     * @param result          回调接口
     */
    public static delete<T>(url: string, zOption: ZCommOption<T>, result: ZCommResult<T>): Subscription {
        return ZComm.restfulRequest<T>('delete', url, zOption, result);
    }
    
    /**
     * 上传文件到服务器
     *
     * @param url               请求地址
     * @param file          表单数据，文件流信息设置在此对象中
     * @param options           请求参数
     * @param zHttpResult       回调接口
     */
    public static uploadFile<T>(url: string, file: FormData, options: ZCommOption<T>, zHttpResult: ZCommResult<T>) {
        options.body = file;
        return ZComm.post<T>(url, options, zHttpResult);
    }
    
    /**
     * restful请求
     * @param method                请求方法
     * @param url                   请求地址
     * @param zOption               请求参数
     * @param result                回调接口
     * @private
     */
    private static restfulRequest<T>(method: ZCommMethod, url: string, zOption: ZCommOption<T>, result: ZCommResult<T>): Subscription {
        zOption = zOption ?? {};
        zOption.type = method;
        zOption.url = url ?? zOption.url;
        zOption.result = result ?? zOption.result ?? {};
        return ZComm.request<T>(zOption);
    }
    
    /**
     * 网络请求， 按自定义回调方法进行回调
     *
     * @param   zOption         请求参数
     * @returns Subscription    取消请求对象
     */
    public static request<T>(zOption: ZCommOption<T>): Subscription {
        const loadingId = zOption.isShowLoading
                          ? ZToastUtil.showLoading(zOption.loadingMsg, {duration: 0}) :
                          null;
        return ZComm.getInstance().requestObservable<T>(zOption)
                    .subscribe(
                        ZComm.getInstance().successResult(zOption.result, loadingId),
                        ZComm.getInstance().errorResult(zOption.result, loadingId)
                    );
    }
    
    /**
     * 同时发起多个Get请求， 按自定义回调方法进行回调，回调顺序按发起顺序。有一个接口失败，则所有请求失败。
     *
     * @param   requestMulti        requestMulti   多个请求参数对象
     * @returns Subscription        Subscription   取消请求对象
     */
    public getMultiRequest(requestMulti: ZCommMultiRequestOption): Subscription {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach(value => value.type = 'get');
        }
        return this.requestMulti(requestMulti);
    }
    
    /**
     * 同时发起多个Post请求， 已按自定义回调方法进行回调，回调数据未数组，回调顺序按发起顺序
     *
     * @param   requestMulti        requestMulti   多个请求对象
     * @returns Subscription        Subscription   取消请求对象
     */
    public postMultiRequest(requestMulti: ZCommMultiRequestOption): Subscription {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach(value => value.type = 'post');
        }
        return this.requestMulti(requestMulti);
    }
    
    /**
     * 同时发起多个网络请求， 已按自定义回调方法进行回调，回调顺序按发起顺序。有一个接口失败，则所有请求失败。
     *
     * @param multiRequestOption    requestMulti   多个请求对象
     * @returns Subscription        Subscription   取消请求对象
     */
    public requestMulti(multiRequestOption: ZCommMultiRequestOption): Subscription {
        const obArray: Observable<any>[] = [];
        const loadingId = multiRequestOption.isHideLoading ?
                          null :
                          ZToastUtil.showLoading(multiRequestOption.loadingMsg, {duration: 0});
        if (multiRequestOption.option && multiRequestOption.option.length > 0) {
            for (const request of multiRequestOption.option) {
                request.result = request.result ?? {};
                obArray.push(this.requestObservable(request));
            }
        }
        
        return forkJoin<any>(...obArray).subscribe(
            (obj) => {
                ZToastUtil.close(loadingId);
                for (let i = 0; i < obj.length; i++) {
                    const item = obj[i];
                    if (multiRequestOption.option[i].result.success) {
                        multiRequestOption.option[i].result.success(item);
                        
                        this.postProcessRequest(multiRequestOption.option[i], true);
                    }
                    if (multiRequestOption.option[i].result.complete) {
                        multiRequestOption.option[i].result.complete();
                    }
                }
            },
            (error) => {
                ZToastUtil.close(loadingId);
                for (let i = 0; i < multiRequestOption.option.length; i++) {
                    if (multiRequestOption.option[i].result.error) {
                        multiRequestOption.option[i].result.error(error);
                        
                        this.postProcessRequest(multiRequestOption.option[i], true);
                    }
                    if (multiRequestOption.option[i].result.complete) {
                        multiRequestOption.option[i].result.complete();
                    }
                }
            });
    }
    
    /**
     * 通讯请求，由各子类实现
     *
     * @param  zOption          请求参数
     * @returns Observable<T>   取消请求对象
     */
    public abstract requestObservable<T>(zOption: ZCommOption<T>): Observable<T>;
    
    // ==================================================返回TEXT的请求===============================================================
    /**
     * get请求
     *
     * @param url               请求地址
     * @param zOption           请求参数
     * @param result            回调接口
     */
    public getText(url: string, zOption: ZCommOption<string>, result: ZCommResult<string>): Subscription {
        zOption = zOption ?? {};
        zOption.type = 'get';
        zOption.url = url ?? zOption.url;
        zOption.result = result ?? zOption.result;
        return this.requestText(zOption);
    }
    
    /**
     * post请求
     *
     * @param url               请求地址
     * @param zOption           请求参数
     * @param result            回调接口
     */
    public postText(url: string, zOption: ZCommOption<string>, result: ZCommResult<string>): Subscription {
        zOption = zOption ?? {};
        zOption.type = 'post';
        zOption.url = url ?? zOption.url;
        zOption.result = result ?? zOption.result;
        return this.requestText(zOption);
    }
    
    /**
     * 请求字符串数据 由各子类实现
     * @param zOption         请求参数
     */
    public abstract requestText(zOption: ZCommOption<string>): Subscription;
    
    /**
     * 获取组合ErrorReply对象
     *
     * @param message           错误信息
     * @param code              错误码
     */
    protected getErrorReply(message: string, code?: number): ZCommErrorReply {
        const errorObj = new ZCommErrorReply();
        // 自定义错误标识
        errorObj.code = code;
        errorObj.msg = (message == null) ? 'null' : message;
        return errorObj;
    }
    
    /**
     * 处理成功回调
     *
     * @param  result           返回结果对象
     * @param loadingId         加载进度条的Id
     */
    protected successResult<T>(result: ZCommResult<T>, loadingId: string) {
        return (obj) => {
            ZToastUtil.close(loadingId);
            if (obj?.type == 'progress') {
                result.onProgress?.(obj.progress);
            } else {
                result.success?.(obj);
                result.complete?.();
            }
        };
    }
    
    /**
     * 处理错误回调
     *
     * @param  result           返回结果对象
     * @param loadingId         加载进度条的Id
     */
    protected errorResult<T>(result: ZCommResult<T>, loadingId: string) {
        return (error) => {
            ZToastUtil.close(loadingId);
            result.error?.(error);
            result.complete?.();
        };
    }
    
    /**
     * 处理返回信息
     *
     * @param zOption  请求参数
     * @param zReply   请求相应处理对象
     * @param res      响应信息
     */
    protected processResponse<T>(zOption: ZCommOption<T>, zReply: ZCommReply, res: any) {
        let jsonObj = res;
        //如果设置了自定义的成功处理，则首先使用拦截处理
        if (this.successIntercept) {
            let result = this.successIntercept(zOption, zReply, res);
            //如果拦截了请求，则直接返回结果，不再进行后续处理
            if (result?.intercept) {
                return result?.result;
            }
        }
        
        // zCef返回string，需要手动转换为json对象
        if (FieldUtil.isString(res)) {
            jsonObj = JSON.parse(res);
            if (!jsonObj) {
                throw new ZCommError(1001, '数据解析错误：\n' + JSON.stringify(res));
            }
        }
        
        //如果是返回的上传进度，则直接返回进度
        if (zOption?.options?.observe == 'events' && FieldUtil.isValid(res.type)) {
            if (res?.loaded >= 0 && res?.total >= 0) {
                const progress = Math.round(100 * res.loaded / res.total);
                LogUtil.log('PROGRESS  :  ' + progress);
                return {type: 'progress', progress: progress};
            } else {
                return {type: 'progress', progress: 0};
            }
        }
        
        if (zReply.isSuccess(jsonObj[zReply.codeKey])) {
            this.postProcessRequest(zOption, true);
            
            if (FieldUtil.isValid(jsonObj[zReply.dataKey]) && !zOption.requireOriginResponseData) {
                if (!ApiEncryptUtil.apiEncrypt) {
                    ZCommLog.response(zOption, jsonObj);
                    return jsonObj[zReply.dataKey];
                } else {
                    const desc = ApiEncryptUtil.decrypt(jsonObj[zReply.dataKey]);
                    ZCommLog.response(zOption, desc);
                    return JSON.parse(desc);
                }
            } else {
                ZCommLog.response(zOption, jsonObj);
                return jsonObj;
            }
        }
        
        if (!zReply.isSuccess(jsonObj[zReply.codeKey]) && (jsonObj[zReply.codeKey] ?? jsonObj[zReply.msgKey])) {
            // 是json对象，但是不是约定中的数据
            throw new ZCommError(jsonObj[zReply.codeKey], jsonObj[zReply.msgKey]);
        } else {
            // 解析的json数据不符合规范
            throw new ZCommError(1001, '数据不符合规范：\n' + JSON.stringify(res));
        }
    }
    
    /**
     * 处理异常信息
     *
     * @param zOption               请求参数
     * @param isShowToastError      是否显示errorToast
     * @param error                 错误对象
     */
    protected processCatch<T>(zOption: ZCommOption<T>, isShowToastError: boolean, error) {
        this.postProcessRequest(zOption, false);
        ZCommLog.response(zOption, {code: error?.code, msg: error?.message});
        
        //如果设置了自定义的错误处理，则首先使用错误处理
        if (this.errorIntercept) {
            let result = this.errorIntercept(zOption, isShowToastError, error);
            //如果拦截了请求，则直接返回错误，不再进行后续处理
            if (result?.intercept) {
                return throwError(result?.errorReply);
            }
        }
        
        let errorObj: ZCommErrorReply;
        if (axios.isAxiosError(error)) {
            if (error.response.status == 404) {
                errorObj = this.getErrorReply(error.response.statusText, error.response.status);
            } else if (error.response.status == 0) {
                // 连接超时
                errorObj = this.getErrorReply('连接服务器超时', -1);
            } /*else if (error.response.error && error.error.response.error instanceof SyntaxError) {
             // 语法错误，比如json转换失败
             errorObj = this.getErrorReply(error.response.error.error.message, error.response.status);
             }*/
            else {
                // 通讯级别的错误，比如500等
                errorObj = this.getErrorReply(error.response.statusText, error.response.status);
            }
            // 自己定义的错误 instanceof判断不出来？
        } else if (error instanceof ZCommError || (FieldUtil.isValid(error.code) && FieldUtil.isValid(error.message))) {
            if (error.code === 401) {
                // 服务器返回的错误
                errorObj = this.getErrorReply('请登录!');
                ZConfig.REDIRECT_LOGIN_FUNCTION?.(error.message, errorObj);
            } else {
                // 服务器返回的错误
                errorObj = this.getErrorReply(error.message, error.code);
            }
        } else if (error instanceof TimeoutError) {
            // 连接超时
            errorObj = this.getErrorReply('连接服务器超时', -1);
        } else if (error instanceof Error) {
            // 程序级别的错误或者未知错误类型的错误，比如语法错误等
            errorObj = this.getErrorReply(error.message);
        } else {
            errorObj = this.getErrorReply(error.message, error.status);
        }
        
        if (isShowToastError) {
            const msg = FieldUtil.isValid(errorObj.code) ? errorObj.msg + '(' + errorObj.code + ')' : errorObj.msg;
            ZToastUtil.showError(msg, {key: ZComm.HTTP_ERROR_TOAST_ID});
        }
        return throwError(errorObj);
    }
    
    /**
     * 请求前处理
     */
    protected preProcessOnRequest<T = any>(zOption: ZCommOption<T>) {
        //增加调用计数
        // if (zOption.loadingContext) {
        //     zOption.loadingContext.addRequestTimes();
        // }
        
        //对于增加zWaitResponse指令的组件，
        // if (zOption.zComponent?.waitResponseChildren?.length > 0) {
        //     zOption.zComponent.waitResponseChildren.forEach(v => {
        //         v.setDisabled(true);
        //     });
        // }
    }
    
    /**
     * 请求结束后处理
     */
    protected postProcessRequest(zOption: ZCommOption<any>, success: boolean) {
        //处理加载中状态
        // if (zOption.loadingContext) {
        //     if (success) {
        //         zOption.loadingContext.successLoad();
        //     } else {
        //         zOption.loadingContext.failedLoad();
        //     }
        // }
        
        //zComponent处理等待返回状态按钮可用
        // if (zOption.zComponent?.waitResponseChildren?.length > 0) {
        //     zOption.zComponent.waitResponseChildren.forEach(v => {
        //         v.setDisabled(false);
        //     });
        // }
    }
}
