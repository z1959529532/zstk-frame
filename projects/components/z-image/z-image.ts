import {ZConfig} from '#';
import {Component, Prop, Vue} from 'vue-property-decorator';
import errorImg from '../../directives/error-img.directive';
import ZImageModal from '../z-image-modal/z-image-modal.vue';

/**
 * # 图片展示组件
 *
 * # `z-image`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * |  src   | 全路径<br>`src`和`path`传一个即可。   |   `string`    |   -    |
 * |  path  | 相对路径<br>自动添加{@link ZConfig.OPEN_FILE_URL_PREFIX}前缀   |   `string`    |    -   |
 * |  fileId    |  图片文件id     |   `string`    |    -   |
 * |  fileName  |  图片文件名称    |   `string`    |    -   |
 * |  width |   容器宽度   |   `number`    |    `100`   |
 * |  height    |  容器高度   |   `number`    |   `100`    |
 * |  overridePreview   |   是否重写预览事件    |   `boolean`    |   `false`    |
 * |  showPreview   |  显示预览按钮     |   `boolean`    |    `true`   |
 * |  showDelete    |   显示删除按钮   |   `boolean`    |    `true`   |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   delete  |   点击删除回调    |   `Function()`    |
 * |   preview  |   点击预览回调    |   `Function()`    |
 *
 * @author chaimzhang
 * @since 2021/4/7 10:41
 *
 * @see {@link ZConfig}
 */
@Component({
    name: 'ZImage',
    components: {ZImageModal},
    directives: {errorImg}
})
export default class ZImage extends Vue {
    /**
     * 全路径
     * @ignore
     */
    @Prop({type: String, default: ''}) readonly src: string;
    /**
     * 相对路径
     * -自动添加{@link ZConfig.OPEN_FILE_URL_PREFIX}前缀
     * @ignore
     */
    @Prop({type: String, default: ''}) readonly path: string;
    /**
     * 显示的宽度
     * @ignore
     */
    @Prop({type: Number, default: 100}) readonly width: number;
    /**
     * 显示的高度
     * @ignore
     */
    @Prop({type: Number, default: 100}) readonly height: number;
    /**
     * 文件id
     * @ignore
     */
    @Prop({type: String, default: ''}) readonly fileId: string;
    /**
     * 文件id
     * @ignore
     */
    @Prop({type: String, default: ''}) readonly fileName: string;
    /**
     * 是否重写预览事件
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly overridePreview: boolean;
    /**
     * 显示预览按钮
     * @ignore
     */
    @Prop({type: Boolean, default: true}) readonly showPreview: boolean;
    /**
     * 显示删除按钮
     * @ignore
     */
    @Prop({type: Boolean, default: true}) readonly showDelete: boolean;
    /**
     * 宽高样式
     * @ignore
     */
    styles = {};
    /**
     * 控制弹窗
     * @ignore
     */
    modalVisible = false;
    /**
     * 图片url
     * @ignore
     */
    imageSrc = '';
    
    /**
     * @ignore
     */
    beforeMount() {
        this.styles = {
            width: (this.width || 100) + 'px!important',
            height: (this.height || 100) + 'px!important'
        };
        this.imageSrc = this.src ?? (ZConfig.OPEN_FILE_URL_PREFIX ?? '') + this.path;
    }
    
    /**
     * 删除点击事件
     * @ignore
     */
    deleteClick() {
        this.$emit('delete');
    }
    
    /**
     * 预览点击事件
     * @ignore
     */
    previewClick() {
        this.$emit('preview');
        if (this.overridePreview) {
            return;
        }
        this.modalVisible = true;
    }
}
