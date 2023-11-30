/**
 * @ignore
 */
export default class {
    /** 缓存的disabled状态， 用于记录请求之前组件状态 */
    private isSetDisable: boolean;
    private el: HTMLElement & { disabled: boolean };
    
    bind(el) {
        this.el = el;
    }
    
    /**
     * 设置是否可用
     */
    setDisabled(isDisabled: boolean) {
        const disabled = this.el.disabled;
        //如果组件可用，并且此次设置位不可用
        if (!disabled && isDisabled) {
            this.isSetDisable = true;
            this.el.disabled = isDisabled;
        }
        //如果使用指令设置了不可用状态，则可以进行还原
        else if (this.isSetDisable && !isDisabled) {
            this.el.disabled = isDisabled;
        }
    }
}
