import {Component, Emit, Prop, PropSync, Vue} from 'vue-property-decorator';

/**
 * @internal
 * @ignore
 */
type ZPaginationAlign = 'left' | 'center' | 'right';
/**
 * # 分页器组件
 *
 * # `z-pagination`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * |  pageNum   |   【sync】分页器当前页码    |   `number`    |    `1`   |
 * |  pageSize   |    【sync】分页器每页条数   |   `number`    |   `10`    |
 * |  total   |    分页器总条数   |   `number`    |   -    |
 * |  pages   |    分页器总页数   |   `number`    |   -    |
 * |  showQuickJumper   |   分页器是否显示快速跳转    |   `boolean`    |    `true`   |
 * |  showSizeChanger   |   分页器是否可以改变页大小   |   `boolean`    |    `false`   |
 * |  pageSizeOptions   |    改变页码选项   |   `string[]`    |    `['10', '20', '30', '40', '50']`   |
 * |  align   |    分页器对齐位置   |   `'left'｜'center'｜'right'`  |    `'right'`   |
 * |  showTotal   |    用于显示数据总量和当前数据顺序   |   `Function({pageNum, pageSize, total, pages}):string`  |    共`${pages}`页/共`${total}`条   |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   change  |   页码或页大小改变    |   `Function({pageNum: number, pageSize: number})`    |
 * |   update:pageNum  |   页码改变    |   `Function({pageNum: number, pageSize: number})`    |
 * |   update:pageSize  |   页大小改变    |   `Function({pageNum: number, pageSize: number})`    |
 *
 * @author chaimzhang
 * @since 2021/4/8 19:34
 */
@Component({
    name: 'ZPagination'
})
export default class ZPagination extends Vue {
    /**
     * 总页数
     * @ignore
     */
    @Prop(Number) readonly pages: number;
    /**
     * 总条数
     * @ignore
     */
    @Prop(Number) readonly total: number;
    /**
     * 对齐方式
     * @ignore
     */
    @Prop({type: String, default: 'right'}) readonly align: ZPaginationAlign;
    /**
     * 对齐方式
     * @ignore
     */
    @Prop({type: Function, default: () => (() => ``)}) readonly showTotal: ({}) => string;
    
    /**
     * 当前页码
     * @ignore
     */
    @PropSync('pageNum', {type: Number, default: 1}) readonly zPageNum: number;
    /**
     * 每页大小
     * @ignore
     */
    @PropSync('pageSize', {type: Number, default: 10}) readonly zPageSize: number;
    
    /**
     * 显示跳页
     * @ignore
     */
    @Prop({type: Boolean, default: true}) readonly showQuickJumper: boolean;
    /**
     * 显示改变页码
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly showSizeChanger: boolean;
    /**
     * 改变页码选项
     * @ignore
     */
    @Prop({type: Array, default: () => ['10', '20', '30', '40', '50']}) readonly pageSizeOptions: string[];
    
    /**
     * @ignore
     */
    showTotalTemplate() {
        let str: string;
        if (this.showTotal) {
            str = this.showTotal({
                pageNum: this.zPageNum,
                pageSize: this.zPageSize,
                total: this.total,
                pages: this.pages
            });
        }
        return str || `共${this.pages}页/共${this.total}条`;
    }
    
    /**
     * @ignore
     */
    @Emit('change')
    emitChange() {
        return {pageNum: this.zPageNum, pageSize: this.zPageSize};
    }
}
