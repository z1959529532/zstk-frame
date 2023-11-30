import zDateTime from './date/z-date-time.filter';
import zDate from './date/z-date.filter';
import zHourToTime from './date/z-hour-to-time.filter';
import zTimeAgo from './date/z-time-ago.filter';
import zTimeDuration from './date/z-time-duration.filter';
import zTime from './date/z-time.filter';
import ignoreSuffix from './ignore-suffix.filter';
import chunk from './lodash/chunk.filter';
import compat from './lodash/compat.filter';
import flatten from './lodash/flatten.filter';
import invert from './lodash/invert.filter';
import join from './lodash/join.filter';
import reverse from './lodash/reverse.filter';
import sample from './lodash/sample.filter';
import shuffle from './lodash/shuffle.filter';
import values from './lodash/values.filter';
import yesOrNo from './yes-or-no.filter';
import zBase64 from './z-base64.filter';
import zAes from './z-aes.filter';
import zDecimal from './z-decimal.filter';
import zObjJoin from './z-obj-join.filter';
import zItemOrder from './z-paging-item-order.filter';

/**
 * 所有需要导出的过滤器
 *
 * @author chaimzhang
 * @since 2021/4/6 14:49
 */
export const ALL_FILTER = {
    /**
     * - 日期格式转换，默认yyyy-MM-dd
     * - `function(value: ConvertibleDate, formatter: string = 'yyyy-MM-dd'): string`
     *
     * ```
     * <div>{{new Date('2021-05-01 10:10:10')|zDate}}</div>
     * <!--  2021-05-01  -->
     * ```
     * @see {@link DateUtil.getDateStr}
     */
    zDate,
    /**
     * - 日期格式转换, 默认yyyy-MM-dd HH:mm
     * - `function(value: ConvertibleDate, formatter: string = 'yyyy-MM-dd HH:mm'): string`
     *
     * ```
     * <div>{{new Date('2021-05-01 10:10:10')|zDateTime}}</div>
     * <!-- 2021-05-01 10:10 -->
     * ```
     * @see {@link DateUtil.getDateStr}
     */
    zDateTime,
    /**
     * - 日期格式转换, 默认yyyy-MM-dd HH:mm
     * - `function(value: ConvertibleDate, formatter: string = 'HH:mm'): string`
     *
     * ```
     * <div>{{new Date('2021-05-01 10:10:10')|zTime}}</div>
     * <!-- 10:10 -->
     * ```
     * @see {@link DateUtil.getDateStr}
     */
    zTime,
    /**
     * - 获取时间用..以前的形式
     * - `function(value: ConvertibleDate): string`
     *
     * ```
     * <div>{{new Date('2021-05-01 10:10:10')|zTimeAgo}}</div>
     * <!-- if the current time is 2021-05-01 10:20:10,result is [10分钟前] -->
     * ```
     * @see {@link DateUtil.getTimeAgo}
     */
    zTimeAgo,
    /**
     * - [秒数]或[毫秒数]转换为x天x小时x分钟
     * @param value  毫秒数
     * @param format 目标格式：'HHmm' | 'ddHHmm'（默认）
     * @param mode 显示模式
     * - `function(value: ConvertibleDate, format: 'HHmm' | 'ddHHmm' = 'ddHHmm',mode: 'colon' | 'chinese' = 'chinese'): string `
     *
     * ```
     * <div>{{25*60*60*1000|zTimeDuration}}</div>
     * <!-- 1天1小时 -->
     *
     * <div>{{25*60*60*1000|zTimeDuration('HHmm')}}</div>
     * <!-- 25小时 -->
     *
     * <div>{{25*60*60*1000|zTimeDuration('HHmm','colon')}}</div>
     * <!-- 25:00 -->
     * ```
     */
    zTimeDuration,
    /**
     * - 小时转时分秒
     * - `function(value: string | number): string`
     *
     * ```
     * <div>{{ 30.36|zHourToTime }}</div>
     * <!-- 30:21:36 -->
     * ```
     */
    zHourToTime,
    /**
     * - 忽略掉文件名后缀
     * - `function(value: string, suffix?: string): string`
     *
     * ```
     * <div>{{ 测试.txt|ignoreSuffix }}</div>
     * <!-- 测试 -->
     * ```
     */
    ignoreSuffix,
    /**
     * - AES加密
     * - `function(text: string | object): string`
     *
     * ```
     * <div>{{ 123|zAes }}</div>
     * <!-- d82fa4ca085b4a338914a8e3a06e48dc -->
     * ```
     * @see {@link AesUtil.encrypt}
     */
    zAes,
    /**
     * - Base64编码
     * - `function(value: any): string`
     *
     * ```
     * <div>{{ 123|zBase64 }}</div>
     * <!-- MTIz -->
     * ```
     * @see {@link Base64Util.encode}
     */
    zBase64,
    /**
     * - 保留小数位数
     * @param value      要转换的值
     * @param precision 保留的小数位数,默认小数点后1位
     * @param divideBy  除以某个数默认1
     * - `function(value: number | string, precision: number = 1, divideBy: number = 1): string`
     *
     * ```
     * <div>{{ 123.31|zDecimal }}</div>
     * <!-- 123.3 -->
     *
     * <div>{{ 123.31|zDecimal(1,2) }}</div>
     * <!-- 61.7 -->
     * ```
     */
    zDecimal,
    /**
     * - 对对象数组中的某字段Join
     * @param objList 对象数组
     * @param k 对象的键
     * @param separator 分隔符 默认是 ，
     * - `function<T>(objList: T[], k: keyof T, separator: string = '，'): string`
     *
     * ```
     * personList=[ { id:'1',name:'张三' },{ id:'2',name:'李四' } ]
     * <div>{{ personList|zObjJoin('name') }}</div>
     * <!-- 张三，李四 -->
     *
     * <div>{{ personList|zObjJoin('name','、') }}</div>
     * <!-- 张三、李四 -->
     * ```
     */
    zObjJoin,
    /**
     * - 计算分页条目的次序
     * @param index 索引值(从0开始)
     * @param pageNum 当前页码
     * @param pageSize 页大小
     * - `function(index: number, pageNum?: number, pageSize?: number): number`
     *
     * ```
     * i=1;
     * pageNum=2;
     * pageSize=10;
     * <div>{{ i|zItemOrder(pageNum,pageSize) }}</div>
     * <!-- 12 -->
     * ```
     */
    zItemOrder,
    /**
     * - 创建object自身可枚举属性的数组
     * - `function(value: any): any[]`
     *
     * ```
     * {'a':1,'b':2,'c':3} = > [1, 2, 3]
     * hello = > ['h','e','l','l','o']
     * ```
     */
    values,
    /**
     * - 将数组拆分为多个size长度的数组
     * - `function<T>(value: T[], size: number = 1): T[][]`
     *
     * ```
     * [1,2,3,4,5,6] => chunk(arr,2) => [[1,2],[3,4],[5,6]]
     * ```
     */
    chunk,
    /**
     * - 创建新数组，包含原数组的非假元素
     * - `function(value: any[]): any[]`
     *
     * ```
     * [1,2,0,false,'',6] => [1,2,6]
     * ```
     */
    compat,
    /**
     * - 转为一维数组
     * - `function(value: any[]): any[]`
     *
     * ```
     * [1, [2, [3, [4]],5]] =>[1,2,3,4,5]
     * ```
     */
    flatten,
    /**
     * - 键值反转，如果object有重复的值，后面的会覆盖前面的值
     * - `function(value: any): any`
     *
     * ```
     * {'a':1,'b':2,'c':1}=>{'1':'c','1':'b'}
     * ```
     */
    invert,
    /**
     * - array中的元素转换为separator分割的字符串
     * - `function(value: any[], separator?: string): string`
     *
     * ```
     * [1,2,0] => join(array, '_') => 1_2_0
     * ```
     */
    join,
    /**
     * - 反转数组
     * - `function<T>(value: T[]): T[]`
     *
     * ```
     * [1,2,3,4,5,6] => [6,5,4,3,2,1]
     * ```
     */
    reverse,
    /**
     * - 从集合中随机取出一个元素
     * - `function(value: any): any`
     *
     * ```
     * [1, 2, 3] => 2
     * ```
     */
    shuffle,
    /**
     * - 打乱数组
     * - `function<T>(value: T[]): T[]`
     *
     * ```
     * [1,2,3,4,5] => [5,2,3,1,4]
     * ```
     */
    sample,
    /**
     * ## 转换为汉字 '是'|'否'
     * - "1" -> '是'
     * -  1  -> '是'
     * - true -> '是'
     *
     * - "0" -> '否'
     * -  0  -> '否'
     * - false -> '否'
     */
    yesOrNo
};

/**
 * 全局加载过滤器方法
 *
 * @author chaimzhang
 * @since 2021/4/6 14:49
 * @ignore
 */
export default function(Vue) {
    for (const key of Object.keys(ALL_FILTER)) {
        Vue.filter(key, ALL_FILTER[key]);
    }
}
