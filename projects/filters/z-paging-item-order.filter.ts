/**
 * 计算分页条目的次序
 * @param index 索引值(从0开始)
 * @param pageNum 当前页码
 * @param pageSize 页大小
 *
 * @author chaimzhang
 * @since 2021/4/6 11:24
 */
export default function(index: number, pageNum?: number, pageSize?: number): number {
    if (pageNum > 0 && pageSize > 0) {
        return (pageNum - 1) * pageSize + index + 1;
    }
    return index + 1;
}
