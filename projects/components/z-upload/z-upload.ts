import {UploadFile} from 'ant-design-vue/types/upload';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {FileReply, FileUtil, LogUtil, StringUtil, ZComm, ZConfig, ZToastUtil} from '../..';
import ZFile from '../z-file/z-file.vue';
import ZImage from '../z-image/z-image.vue';

/**
 * 上传文件回调对象
 * @ignore
 */
interface UploadObj {
    data: Blob;
    file: UploadFile;
    filename: string;
    onProgress: (e) => void;
    onError: (err, ret) => void;
    onSuccess: (ret, xhr) => void;
}

/**
 * # 上传文件组件
 *
 * # `z-upload`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * | fileList | 【sync】已上传文件列表 |  `FileReply[]`  |  -  |
 * | file |  【sync】已上传文件<br>单个文件上传时使用  |  `FileReply`  |  -  |
 * | btnText |   上传按钮文字  |  `string`  |  `上传`  |
 * | uploadServerPath |  上传文件存放路径文件夹   |  `string`  |  -  |
 * | isPreview |   是否需要生成预览的pdf  |  `boolean`  |  `false`  |
 * | isShowList |  是否展示已上传文件列表   |  `boolean`  |  `true`  |
 * | acceptType |  文件类型限制   |  `string ｜ string[]`  |  -  |
 * | singleFileSizeMB |  单个文件大小限制(MB)   |  `number`  |  `100`  |
 * | maxNum |   数量限制  |  `number`  |  `9`  |
 * | showType |  文件展示类型   |  `'text'｜'img'`  |  `'text'`  |
 * | multiple |  允许一次上传多个   |  `boolean`  |  `false`  |
 * | customButton |   是否自定义上传按钮  |  `boolean`  |  `false`  |
 * | overNumShowBtn |  达到限制时是否还显示上传按钮   |  `boolean`  |  `false`  |
 * | loading |  【sync】是否正在上传文件   |  `boolean`  |  `false`  |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   update:fileList  |   上传文件发生变化    |   `Function(fileList:FileReply[])`    |
 * |   update:file  |   上传文件发生变化    |   `Function(file:FileReply)`    |
 * |   update:loading  |   上传状态发生变化    |   `Function(loading:boolean)`    |
 *
 * @author chaimzhang
 * @since 2021/4/7 9:16
 *
 * @see {@link FileReply}
 */
@Component({
    name: 'ZUpload',
    components: {
        ZFile,
        ZImage
    }
})
export default class ZUpload extends Vue {
    /**
     * 上传按钮文字
     * @ignore
     */
    @Prop({type: String, default: '上传'}) readonly btnText: string;
    /**
     * 上传文件存放路径文件夹
     * @ignore
     */
    @Prop({type: String}) readonly uploadServerPath: string;
    /**
     * 是否需要生成预览的pdf
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly isPreview: boolean;
    /**
     * 是否展示已上传文件列表
     * @ignore
     */
    @Prop({type: Boolean, default: true}) readonly isShowList: boolean;
    /**
     * 文件类型限制
     * @ignore
     */
    @Prop({type: [String, Array]}) readonly acceptType: string | string[];
    /**
     * 单个文件大小限制
     * @ignore
     */
    @Prop({type: Number, default: 100}) readonly singleFileSizeMB: number;
    /**
     * 数量限制,为0时不限制
     * @ignore
     */
    @Prop({type: Number, default: 9}) readonly maxNum: number;
    /**
     * 文件展示类型
     * @ignore
     */
    @Prop({type: String, default: 'text'}) readonly showType: 'text' | 'img';
    /**
     * 允许一次上传多个
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly multiple: boolean;
    /**
     * 是否自定义上传按钮
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly customButton: boolean;
    /**
     * 达到限制时是否还显示上传按钮
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly overNumShowBtn: boolean;
    
    /**
     * 已上传文件列表
     * @ignore
     */
    @Prop({type: Array, default: () => []}) readonly fileList: FileReply[];
    zFileList: FileReply[] = [];
    
    @Watch('fileList', {immediate: true, deep: true})
    onFileListChange(newVal: FileReply[]) {
        this.zFileList = newVal;
        if (this.zFileList?.length > 0) {
            this.zFile = this.zFileList[this.zFileList.length - 1];
        }
    }
    
    /**
     * 已上传文件(单个文件上传时使用)
     * @ignore
     */
    @Prop(FileReply) readonly file: FileReply;
    private zFile!: FileReply;
    
    @Watch('file', {immediate: true, deep: true})
    onFileChange(newVal: FileReply) {
        this.zFile = newVal;
        this.zFileList = [newVal];
    }
    
    /**
     * 是否正在上传文件
     * @ignore
     */
    @Prop({type: Boolean, default: false}) readonly loading: boolean;
    private zLoading!: boolean;
    
    /**
     * @ignore
     */
    @Watch('loading')
    onLoadingChange(newVal: boolean) {
        this.zLoading = newVal;
    }
    
    /**
     * 正在上传的请求数
     * @private
     */
    private flag = 0;
    
    /**
     * 自定义上传方法
     * @ignore
     */
    upload = (uploadObj: UploadObj) => {
        if (this.singleFileSizeMB > 0 && uploadObj.file.size > (this.singleFileSizeMB) * FileUtil.MB) {
            ZToastUtil.showWarning(`${uploadObj.filename || ''}文件过大,不能超过${this.singleFileSizeMB}MB!`);
            uploadObj.onError(null, uploadObj.file);
            return null;
        }
        if (this.zFileList?.length >= this.maxNum) {
            ZToastUtil.showWarning(`已达到最大上传数量！`);
            uploadObj.onError(null, uploadObj.file);
            return null;
        }
        const formData = new FormData();
        formData.append('file', uploadObj.file as never, uploadObj.file.name);
        formData.append('preview', (this.isPreview as never));
        if (StringUtil.isNotEmpty(this.uploadServerPath)) {
            formData.append('path', this.uploadServerPath);
        }
        this.flag++;
        this.$emit('update:loading', true);
        return ZComm.uploadFile<FileReply>(ZConfig.UPLOAD_FILE_URL, formData, {
            timeout: ZConfig.UPLOAD_FILE_TIMEOUT,
            isShowLoading: true,
            loadingMsg: '文件上传中...'
        }, {
            onProgress: (num) => {
                const event = {percent: num};
                uploadObj.onProgress(event);
            },
            success: (reply) => {
                uploadObj.file.url = ZConfig.OPEN_FILE_URL_PREFIX + reply.filePath;
                uploadObj.onSuccess(null, uploadObj.file);
                try {
                    if (!this.zFileList) {
                        this.zFileList = [];
                    }
                    if (this.maxNum == 1) {
                        this.zFileList = [reply];
                    } else {
                        this.zFileList = [...this.zFileList, reply];
                    }
                    this.zFile = reply;
                    this.$emit('update:fileList', this.zFileList);
                    this.$emit('update:file', this.zFile);
                } catch (e) {
                    LogUtil.error(e);
                }
            },
            error: () => {
                uploadObj.onError(null, uploadObj.file);
            },
            complete: () => {
                this.flag--;
                this.$emit('update:loading', this.flag !== 0);
            }
        });
    };
    
    /**
     * 删除已上传文件
     * @param filePath filePath
     * @ignore
     */
    deleteFile(filePath: string) {
        if (this.maxNum == 1) {
            this.zFileList.length = 0;
        } else {
            this.zFileList = this.zFileList.filter(a => a.filePath != filePath);
        }
        this.zFile = null;
        this.$emit('update:fileList', this.zFileList);
        this.$emit('update:file', this.zFile);
    }
}
