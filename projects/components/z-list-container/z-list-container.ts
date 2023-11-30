import {PageReply} from '#';
import {Component, Emit, Prop, PropSync, Vue} from 'vue-property-decorator';
import ZPagination from '../z-pagination/z-pagination.vue';

/**
 * @internal
 * @ignore
 */
type ZPaginationAlign = 'left' | 'center' | 'right';
/**
 * # 列表容器
 * - 数据源为空时展示空图标
 * - 分页数据含分页器
 *
 * # `z-list-container`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * |  list   |   接收一个list    |   `any[]`    |   -    |
 * |  lists   |  接收多个list     |   `any[][]`    |    -   |
 * |  pageNum   |   【sync】分页器当前页码    |   `number`    |    `1`   |
 * |  pageSize   |    【sync】分页器每页条数   |   `number`    |   `10`    |
 * |  total   |    分页器总条数   |   `number`    |   -    |
 * |  pages   |    分页器总页数   |   `number`    |   -    |
 * |  showQuickJumper   |   分页器是否显示快速跳转    |   `boolean`    |    `true`   |
 * |  showSizeChanger   |   分页器是否可以改变页大小   |   `boolean`    |    `false`   |
 * |  showTotal   |    用于显示数据总量和当前数据顺序   |   `Function({pageNum: number, pageSize: number, total: number, pages: number}):string`  |    共`${pages}`页/共`${total}`条   |
 * |  pageSizeOptions   |    改变页码选项   |   `string[]`    |    `['10', '20', '30', '40', '50']`   |
 * |  paginationAlign   |    分页器对齐位置   |   `'left'｜'center'｜'right'`  |    `'right'`   |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   change  |   页码或页大小改变    |   `Function({pageNum: number, pageSize: number})`    |
 * |   update:pageNum  |   页码改变    |   `Function({pageNum: number, pageSize: number})`    |
 * |   update:pageSize  |   页大小改变    |   `Function({pageNum: number, pageSize: number})`    |
 *
 * @author chaimzhang
 * @since 2021/4/8 19:15
 */
@Component({
    name: 'ZListContainer',
    components: {
        ZPagination
    }
})
export default class ZListContainer extends Vue {
    /**
     * 单个list
     * @ignore
     */
    @Prop({type: Array}) readonly list: unknown[];
    /**
     * 多个list
     * @ignore
     */
    @Prop({type: Array}) readonly lists: unknown[][];
    /**
     * 总条数
     * @ignore
     */
    @Prop({type: PageReply}) readonly total: number;
    /**
     * 总页数
     * @ignore
     */
    @Prop({type: PageReply}) readonly pages: number;
    /**
     * 分页是否显示快速跳转
     * @ignore
     */
    @Prop({type: Boolean, default: true}) readonly showQuickJumper;
    /**
     * 改变页码选项
     * @ignore
     */
    @Prop({type: Array, default: () => ['10', '20', '30', '40', '50']}) readonly pageSizeOptions: string[];
    /**
     * 分页器是否显示快速跳转
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly showSizeChanger: boolean;
    /**
     * 分页器对齐位置
     * @ignore
     */
    @Prop({type: String, default: 'right'}) readonly paginationAlign: ZPaginationAlign;
    /**
     * 用于显示数据总量和当前数据顺序
     * @ignore
     */
    @Prop({type: Function, default: () => (() => ``)}) readonly showTotal: ({}) => string;
    /**
     * 分页器当前页码
     * @ignore
     */
    @PropSync('pageNum', {type: Number, default: 1}) readonly zPageNum: number;
    /**
     * 分页器每页条数
     * @ignore
     */
    @PropSync('pageSize', {type: Number, default: 10}) readonly zPageSize: number;
    /**
     * @ignore
     */
    emptyList = [];
    
    /**
     * 判断多个列表是否含有不为空的
     * @ignore
     */
    isNotEmpty(): boolean {
        if (this.lists) {
            return this.lists.some(list => list && list.length > 0);
        }
        return false;
    }
    
    @Emit('change')
    emitChange() {
        return {pageNum: this.zPageNum, pageSize: this.zPageSize};
    }
}
