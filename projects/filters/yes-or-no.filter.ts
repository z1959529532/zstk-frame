/**
 * ## 转换为汉字 '是'|'否'
 * - "1" -> '是'
 * -  1  -> '是'
 * - true -> '是'
 *
 * - "0" -> '否'
 * -  0  -> '否'
 * - false -> '否'
 *
 * @author chaimzhang
 * @since 2021/5/21 11:14
 */
export default function(value: any) {
    if (value !== '0' && value) {
        return '是';
    }
    return '否';
}
