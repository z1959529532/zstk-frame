/**
 * 打印工具类
 *
 * @author ZColin
 * @since 2020/8/20 20:51
 */
export class PrintUtil {
    /**
     * 调用浏览器打印
     * @param id  布局id
     */
    static print(id: string) {
        const windowPrt = window.open(
            '' /*'channelmode=1,fullscreen=1,left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'*/);
        const content = document.getElementById(id);
        windowPrt.document.write(content.innerHTML);
        
        windowPrt.document.close();
        windowPrt.focus();
        windowPrt.print();
        windowPrt.close();
    }
}
