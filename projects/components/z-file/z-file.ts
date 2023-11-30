import {Component, Prop, Vue} from 'vue-property-decorator';
import {FileReply, FileUtil, ZComm, ZConfig} from '../..';

/**
 * # 文件展示组件
 *
 * # `z-file`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * |  file   |   文件对象    |   `FileReply`    |   -    |
 * |  name   |  文件名<br>可替换{@link FileReply.originFileName}的显示     |   `string`    |    -   |
 * |  edit   |   是否可编辑,为`true`时显示删除按钮    |   `boolean`    |    `false`   |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   delete  |   点击删除事件    |   `Function(file: FileReply)`    |
 *
 * @author chaimzhang
 * @since 2021/4/7 10:24
 *
 * @see {@link FileReply}
 */
@Component({
    name: 'ZFile'
})
export default class ZFile extends Vue {
    /**
     * 文件对象
     * @ignore
     */
    @Prop({type: FileReply}) readonly file: FileReply;
    /**
     * 文件名
     * 如果传值则代替file中的originFileName显示
     * @ignore
     */
    @Prop(String) readonly name: string;
    /**
     * 是否可编辑
     * @ignore
     */
    @Prop(Boolean) readonly edit: boolean;
    
    /**
     * 点击删除事件
     * @ignore
     */
    onDelete() {
        this.$emit('delete', this.file);
    }
    
    /**
     * pdf预览
     * @ignore
     */
    previewPdf() {
        if (this.file.pdfFilePath) {
            ZComm.post(ZConfig.VIEW_FILE_URL, {body: {fileId: this.file.id}, isShowToastError: true}, {
                success: () => {
                    window.open(ZConfig.OPEN_FILE_URL_PREFIX + this.file.pdfFilePath);
                }
            });
        }
    }
    
    /**
     * 文件下载
     * @ignore
     */
    download() {
        const name = this.name ? (this.name + '.' + this.file.fileType) : this.file.originFileName;
        if (this.file.id) {
            FileUtil.download(ZConfig.DOWNLOAD_FILE_URL_PREFIX + '?fileId=' + this.file.id, name);
        } else {
            FileUtil.download(ZConfig.OPEN_FILE_URL_PREFIX + this.file.filePath, name);
        }
    }
}
