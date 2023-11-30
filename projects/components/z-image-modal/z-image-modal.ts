import {FileUtil} from '#';
import {Component, Model, Prop, Vue, Watch} from 'vue-property-decorator';
import errorImg from '../../directives/error-img.directive';

/**
 * # 图片预览弹窗
 *
 * # `z-image-modal`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * |  v-model |   弹窗是否显示   |   `number`    |    `100`   |
 * |  imageUrl   | 图片地址   |   `string`    |   -    |
 * |  fileId  |  图片文件id    |   `string`    |    -   |
 * |  fileName  |  图片名称    |   `string`    |    -   |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   change  |   弹窗关闭回调    |   `Function(visible: boolean)`    |
 *
 * @author chaimzhang
 * @since 2021/4/7 10:41
 */
@Component({
    name: 'ZImageModal',
    directives: {
        errorImg
    }
})
export default class ZImageModal extends Vue {
    /**
     * 弹窗是否显示
     * @ignore
     */
    @Model('change', {type: Boolean, default: false}) readonly isOpen;
    /**
     * 图片详情地址
     * @ignore
     */
    @Prop({type: String}) imageUrl: string;
    /**
     * 文件Id
     * @ignore
     */
    @Prop({type: String, default: ''}) fileId: string;
    /**
     * 文件名称
     * @ignore
     */
    @Prop({type: String, default: ''}) fileName: string;
    
    /**
     * 图片详情宽度
     * @ignore
     */
    width = 500;
    /**
     * 图片详情高度
     * @ignore
     */
    height = 500;
    
    /**
     * 弹窗当前是否可见
     * @ignore
     */
    modalVisible = false;
    
    /**
     * @ignore
     */
    @Watch('isOpen')
    openChange(newVal) {
        if (newVal) {
            this.calculateImage();
        } else {
            this.modalVisible = false;
        }
    }
    
    /**
     * @ignore
     */
    downloadImg() {
        const index = this.imageUrl.lastIndexOf('/');
        const name = this.imageUrl.slice(index + 1);
        FileUtil.download(this.imageUrl, this.fileName || name);
    }
    
    /**
     * 显示照片详情
     * @private
     */
    private calculateImage() {
        const img = new Image();
        img.src = this.imageUrl;
        if (img.complete) {
            this.openImageModal(img);
        } else {
            img.onload = () => this.openImageModal(img);
        }
    }
    
    /**
     * 打开图片弹窗
     * 自动计算图片比列
     * @private
     */
    private openImageModal(img: HTMLImageElement) {
        let h = img.height;
        let w = img.width;
        const maxH = window.innerHeight * 0.8;
        const maxW = window.innerWidth * 0.9;
        const minH = 90;
        const minW = 160;
        const rate = w / (h ? h : 1);
        if (h > maxH) {
            h = maxH;
            w = h * rate;
        } else if (w > maxW) {
            w = maxW;
            h = w / rate;
        } else if (h < minH) {
            h = minH;
            w = h * rate;
        } else if (w < minW) {
            w = minW;
            h = w / rate;
        }
        if (h > maxH) {
            h = maxH;
        }
        if (w > maxW) {
            w = maxW;
        }
        this.height = h;
        this.width = w;
        this.modalVisible = true;
    }
    
    /**
     * @ignore
     */
    afterModalClose() {
        this.$emit('change', false);
    }
    
}
