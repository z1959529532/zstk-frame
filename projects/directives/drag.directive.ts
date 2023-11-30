import {DirectiveBinding} from 'vue/types/options';

/**
 * Ant-Design-Vue Modal 弹窗可拖动指令
 *
 * @author chaimzhang
 * @since 2021/5/10 20:08
 */
export const modalDrag = dragDirective('.ant-modal-header', '.ant-modal-content');

/**
 * Element Dialog 弹窗可拖动指令
 *
 * @author chaimzhang
 * @since 2021/5/10 20:00
 */
export const dialogDrag = dragDirective('.el-dialog__header', '.el-dialog');

/**
 * 弹窗可拖动函数
 *
 * @author chaimzhang
 * @since 2021/5/11 8:52
 */
function dragDirective(headerSelector, dragSelector) {
    return {
        bind(el: HTMLImageElement, binding: DirectiveBinding) {
            const dialogHeaderEl = el.querySelector(headerSelector);
            const dragDom = el.querySelector(dragSelector);
            const originCursor = dialogHeaderEl.style.cursor;
            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
            
            dialogHeaderEl.onmousedown = e => {
                dialogHeaderEl.style.cursor = 'move';
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                const disY = e.clientY - dialogHeaderEl.offsetTop;
                
                // 获取到的值带px 正则匹配替换
                let styL, styT;
                
                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (sty.left.includes('%')) {
                    styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                    styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
                } else {
                    styL = +sty.left.replace(/\px/g, '');
                    styT = +sty.top.replace(/\px/g, '');
                }
                
                document.onmousemove = e => {
                    // 通过事件委托，计算移动的距离
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;
                    
                    // 移动当前元素
                    dragDom.style.left = `${l + styL}px`;
                    dragDom.style.top = `${t + styT}px`;
                    
                    //将此时的位置传出去
                    binding.value({x: e.pageX, y: e.pageY});
                };
                
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    dialogHeaderEl.style.cursor = originCursor;
                };
            };
        }
    };
}

