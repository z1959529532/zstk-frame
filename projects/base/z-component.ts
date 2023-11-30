import {Subscription} from 'rxjs';
import {Vue} from 'vue-property-decorator';
import {RxBusUtil} from '..';

/**
 * 组件基类，自定义组件需要继承此类，继承此类如果实现ngOnInit或ngOnDestroy需要调用super.ngOnInit()或者super.ngOnDestroy()
 *
 * <p></p>
 * <ol>
 *    <li>{@link RxReceiver}装饰器, 需要配合此类或者此类的子类{@link ZPage}使用</li>
 *    <li>{@link zWaitResponse}指令，配合此类或者此类的子类{@link ZPage}使用</li>
 * </ol>
 * <p></p>
 *
 *
 * @author ZColin
 * @since 2020/8/20 20:12
 */
    // tslint:disable-next-line:directive-class-suffix
export abstract class ZComponent extends Vue {
    /** 增加zWaitResponse的指令，在请求时禁用该组件，返回时启用该组件 */
    // @ViewChildren(ZWaitResponseDirective) waitResponseChildren: QueryList<ZWaitResponseDirective>;
    
    /** rxbus注册的接收器取消对象 */
    private __rx_receiver_subscription: Subscription[] = [];
    /** rxbus注册的接收器 */
    private __rx_receiver: ((thisObj) => Subscription)[];
    
    /**
     * __rx_receiver是通过{@link RxReceiver}经过原型注入的数组，用于保存rxjs注册接收器的函数
     * 注册收到内容的监听器，在页面开始前注册，页面结束后销毁
     */
    created(): void {
        if (this.__rx_receiver && this.__rx_receiver.length > 0) {
            this.__rx_receiver.forEach(fn => {
                const subscription = fn(this);
                if (subscription) {
                    this.__rx_receiver_subscription.push(subscription);
                }
            });
        }
    }
    
    /**
     * 页面结束时销毁监听器
     */
    beforeDestroy(): void {
        if (this.__rx_receiver_subscription && this.__rx_receiver_subscription.length > 0) {
            this.__rx_receiver_subscription.forEach(value => {
                RxBusUtil.unSubscribe(value);
            });
            this.__rx_receiver_subscription.length = 0;
        }
    }
}
