/**
 * 保留小数位数
 * @param value      要转换的值
 * @param precision 保留的小数位数,默认小数点后1位
 * @param divideBy  除以某个数默认1
 *
 * @author chaimzhang
 * @since 2021/4/6 11:22
 */
export default function(value: number | string, precision: number = 1, divideBy: number = 1): string {
    if (value == 0) {
        return '0';
    } else if (!value) {
        return null;
    }
    
    let n = typeof value === 'string' ? Number(value) : value;
    return (n / divideBy).toFixed(precision);
}
