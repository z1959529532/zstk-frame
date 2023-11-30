import {Subscription} from 'rxjs';
import {RxBusUtil} from './rx-bus.util';

/**
 * RxBus接收器装饰器，需要配合{@link ZComponent} 使用
 *
 * 使用方法：
 *   @RxReceiver(FirstPageComponent.MESSAGE_REFRESH_CHART)
 *   show(data: string) {
 *           this.refreshChart(data);
 *   }
 */
export function RxReceiver(...events: string[]) {
    
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (!target.__rx_receiver) {
            target.__rx_receiver = [];
        }
        
        //被装饰的原型方法的对象
        let originalMethod = descriptor.value;
        events?.forEach(event => {
            //将注册rxjs的方法压入目标类原型对象的方法数组中
            target.__rx_receiver.push(
                (__thisObj): Subscription => {
                    return RxBusUtil.subscribe(event, value => {
                        let returnValue = originalMethod.apply(__thisObj, [value]);
                        
                        //如果需要返回值，进行后续处理
                        if (returnValue) {
                        
                        }
                    });
                });
        });
        return descriptor;
    };
}

