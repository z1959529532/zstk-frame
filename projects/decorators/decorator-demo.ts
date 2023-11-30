/**
 * =================================================================================
 *  装饰器分为：
 *   类装饰器： （target） => {}
 * 方法装饰器： （target, methodName:string, descriptor:PropertyDescriptor） => {}
 * 参数装饰器： （target, methodName:string, paramIndex:number） => {}
 * 属性装饰器： （target, propertyName:string） => {}
 * =================================================================================
 */

/**
 * 类装饰器
 * @ignore
 */
export function ClassDecorDemo(...param: string[]) {
    return (target) => {
        console.log('\n***********>' + param);
        target.prototype.__desc = 'text';
    };
}

/**
 * 方法装饰器，
 * @ignore
 */
export function MethodDecorDemo(...param: string[]) {
    /**
     * @param target 被装饰的原型对象
     * @param methodName 被装饰的方法名称
     * @param descriptor 被装饰的对象原型描述
     */
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        /* 被装饰的方法所在的类加载时调用*/
        console.log(
            '---MethodDecorDemo-->param:' + param + ', target:' + JSON.stringify(target) + ', methodName:' +
            methodName + ', desc:' +
            JSON.stringify(descriptor));
        
        /*被装饰的方法所在的类加载时调用*/
        let originalMethod = descriptor.value;
        let returnValue = originalMethod(param);
        console.log('method:' + originalMethod + '\n paramLength:' + originalMethod.length + ', returnValue:' +
            returnValue);
        
        /* 被装饰的方法调用时调用回调的内容*/
        descriptor.value = (...args: any[]) => {
            returnValue = originalMethod.apply(this, args);
            console.log('method:' + originalMethod + '\n paramLength:' + originalMethod.length + ', returnValue:' +
                returnValue);
        };
        
        return descriptor;
    };
}

/**
 * 参数装饰器
 * 参数装饰器并不能改变其值，只能对参数做标注，比如在target上，做属性标注
 * 一般配合methodDecorator使用。
 * @ignore
 */
export function ParamDecorDemo(...param: string[]) {
    /**
     * @param target 被装饰的原型对象
     * @param methodName 被装饰的方法名称
     * @param paramIndex 参数index
     */
    return (target: any, methodName: string, paramIndex: number) => {
        /* 被装饰的方法所在的类加载时调用*/
        console.log(
            '----ParamDecorDemo---->param:' + param + ', target:' + JSON.stringify(target) + ', methodName:' +
            methodName + ', paramIndex:' +
            paramIndex);
        
        //在目标方法原型上，定义一个检查数组，插入参数索引后，可以在后续的方法装上器上做相应处理
        target.__valid = [];
        target.__valid.push(paramIndex);
    };
}

/**
 * 属性装饰器
 * 参数装饰器一般直接通过改变对象的set get方法进行处理
 * @ignore
 */
export function AttrDecorDemo(...param: string[]) {
    /**
     * @param target 被装饰的原型对象
     * @param key 属性名称
     */
    return (target: any, key: string) => {
        /* 被装饰的方法所在的类加载时调用*/
        console.log(
            '----AttrDecorDemo---->param:' + param + ', target:' + JSON.stringify(target) + ', key:' +
            key);
        let val = target[key];
        
        let getter = () => {
            console.log('++++++++++++++++++get调用' + val);
            return val;
        };
        
        let setter = (v: any) => {
            console.log('++++++++++++++++++set调用：' + v);
            val = v + '装饰过的内容';
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
        
    };
}
