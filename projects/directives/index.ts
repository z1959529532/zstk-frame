import {dialogDrag, modalDrag} from './drag.directive';
import errorImg from './error-img.directive';

/**
 * 所有指令
 *
 * @author chaimzhang
 * @since 2021/4/20 18:53
 */
export const ALL_DIRECTIVE: Readonly<any> = {
    /**
     * # v-error-img
     * - 指定img标签加载失败后显示的图片
     * ```
     * <img :src="imageSrc" v-error-img>
     * <img :src="imageSrc" v-error-img="errorImgSrc">
     * ```
     */
    errorImg,
    /**
     * Ant-Design-Vue Modal 弹窗可拖动指令
     * ```
     *  <a-modal v-modal-drag
     *      title="弹窗标题"
     *      :visible="true">
     *      <p>弹窗内容</p>
     *  </a-modal>
     * ```
     */
    modalDrag,
    /**
     * element Dialog 弹窗可拖动指令
     * ```
     * <el-dialog v-dialog-drag
     *            title="弹窗标题"
     *            :visible="true">
     *     <span>弹窗内容</span>
     *     <div slot="footer" class="dialog-footer">
     *         <el-button>取 消</el-button>
     *         <el-button type="primary">确 定</el-button>
     *     </div>
     * </el-dialog>
     * ```
     */
    dialogDrag
};

/**
 * @ignore
 */
export default function(Vue) {
    for (const key of Object.keys(ALL_DIRECTIVE)) {
        Vue.directive(key, ALL_DIRECTIVE[key]);
    }
}
