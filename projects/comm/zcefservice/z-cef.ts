import {Observable, Subscription} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {LogUtil, ZCommError, ZCommLog, ZCommOption, ZCommReplyDefault, ZToastUtil} from '../..';
import {ZComm} from '../z-comm';

/**
 * 混编框架cef浏览器通讯服务类
 *
 * @author ZColin
 * @since 2020/8/29 20:17
 */
export class ZCef extends ZComm {
    
    /**
     * 增加数据监听，原生调用js方式，会进入此监听
     *
     * @param event    事件名称
     * @param listener 监听回调方法
     */
    public static addListener(event: string, listener: (v) => void) {
        if (this.isRegisterCefClient()) {
            window['ZCefClient'].addEventListener(event, listener);
        }
    }
    
    /**
     * 移除数据监听
     *
     * @param event      事件名称
     * @param listener   监听回调方法
     */
    public static removeListener(event: string, listener?: (v) => void) {
        if (this.isRegisterCefClient()) {
            window['ZCefClient'].removeEventListener(event, listener);
        }
    }
    
    /**
     * 直接调用原生方法，没有返回值
     *
     * @param methodName  方法名称
     * @param value       参数,对应原生方法的参数列表
     */
    public static invoke(methodName: string, ...value: any[]) {
        if (this.isRegisterCefClient()) {
            window['ZCefClient'].invokeMethod(methodName, ...value);
        }
    }
    
    /**
     * 检查是否在window对象注册了ZCefClient
     * @private
     */
    private static isRegisterCefClient(): boolean {
        if (!window['ZCefClient']) {
            LogUtil.log('ZCefClient 没有注册！');
            return false;
        }
        return true;
    }
    
    /**
     * 检查是否在window对象注册了ZCefQuery
     * @private
     */
    private static isRegisterCefQuery(): boolean {
        if (!window['ZCefQuery']) {
            LogUtil.log('ZCefQuery 没有注册！');
            ZToastUtil.showWarning('ZCefQuery没有注册');
            return false;
        }
        return true;
    }
    
    /**
     * 通讯请求，处理完所有业务数据，不会回调ZCommResult中方法，返回Observable，自己自定义处理
     *
     * @param  zOption 请求参数信息
     * @returns Observable<T>
     */
    public requestObservable<T>(zOption: ZCommOption<T>): Observable<T> {
        if (!ZCef.isRegisterCefQuery()) {
            return null;
        }
        
        this.preProcessOnRequest(zOption);
        zOption.zReply = zOption.zReply || new ZCommReplyDefault();
        zOption.timeout = zOption.timeout || 3000;
        zOption.body = Object.assign(zOption.body, {url: zOption.url});
        
        //打印日志
        ZCommLog.request(zOption);
        
        let observable = new Observable(observer => {
            window['ZCefQuery']({
                request: JSON.stringify(zOption.body),
                onSuccess: (response) => {
                    observer.next(response);
                    observer.complete();
                },
                onFailure: (errCode, errMessage) => {
                    let err = new ZCommError(errCode, errMessage);
                    observer.error(err);
                }
            });
        });
        
        return observable.pipe(
            timeout(zOption.timeout), //
            map(res => this.processResponse(zOption, zOption.zReply, res)),
            catchError(error => this.processCatch(zOption, zOption.isShowToastError, error)));
    }
    
    /**
     * 请求字符串数据，本处实现同{@link ZComm#request}
     */
    requestText(zOption: ZCommOption<string>): Subscription {
        return ZComm.request(zOption);
    }
}
