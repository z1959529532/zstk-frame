import {Subject} from 'rxjs/internal/Subject';
import {Subscription} from 'rxjs/internal/Subscription';
import {StringUtil, ZUiService} from '..';

/**
 * 事件总线参数
 *
 * @author ZColin
 * @since 2020/9/14 13:56
 */
export interface RxBusOptions {
    /** 为true时，自动使用NgZone通知界面刷新，使用cef时需要手动通知 */
    reRender?: boolean;
    /** 是否粘性广播，粘性广播发送时会缓存，在下次注册时发送该广播 */
    sticky?: boolean;
    /** 是否在收到粘性广播后自动移除此粘性广播 */
    autoRemoveSticky?: boolean;
}

/**
 * 事件总线的Service
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class RxBusUtil {
    /** 事件总线中介 */
    private static subject: Subject<any> = new Subject();
    /** 粘性广播缓存map */
    private static stickyEvent: Map<string, { value: any } & RxBusOptions> = new Map();
    
    /**
     * 发送命令消息
     * @param type  全局唯一的字符串命令代号
     * @param val    传值
     * @param opts  发布消息的参数
     */
    public static publish(type: any, val?: any, opts?: RxBusOptions) {
        RxBusUtil.subject.next({msgType: type, value: val, reRender: opts?.reRender});
        if (opts?.sticky) {
            RxBusUtil.stickyEvent.set(type,
                {value: val, reRender: opts?.reRender, autoRemoveSticky: opts?.autoRemoveSticky});
        }
    }
    
    /**
     * 移除粘性广播
     * @param type 全局唯一的字符串命令代号
     */
    public static removeSticky(type: any) {
        if (RxBusUtil.stickyEvent.has(type)) {
            RxBusUtil.stickyEvent.delete(type);
        }
    }
    
    /**
     * 订阅消息
     * @param msgType  全局唯一的字符串命令代号
     * @param method   回调函数
     */
    public static subscribe(msgType: any, method: (value: any) => void): Subscription {
        let fn;
        /* 如果是粘性广播，则在订阅时直接回调 */
        if (RxBusUtil.stickyEvent.has(msgType)) {
            const options = RxBusUtil.stickyEvent.get(msgType);
            if (options?.reRender) {
                ZUiService.refreshUI().then(() => method(options?.value));
            } else {
                method(options?.value);
            }
            //如果需要自动移除粘性广播，则方法调用完后直接移除
            if (options.autoRemoveSticky) {
                RxBusUtil.removeSticky(msgType);
            }
        } else {
            fn = RxBusUtil.subject.subscribe((value) => {
                if (!StringUtil.isEmpty(msgType) && msgType === value.msgType) {
                    if (value?.reRender) {
                        ZUiService.refreshUI().then(() => method(value?.value));
                    } else {
                        method(value?.value);
                    }
                }
            });
        }
        return fn;
    }
    
    /**
     * 获取发布者
     */
    public static getSubject(): Subject<any> {
        return RxBusUtil.subject;
    }
    
    /**
     * 反订阅
     */
    public static unSubscribe(sub: Subscription) {
        if (sub) {
            sub.unsubscribe();
        }
    }
}
