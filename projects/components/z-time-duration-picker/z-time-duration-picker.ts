import {Component, Emit, Model, Prop, Vue, Watch} from 'vue-property-decorator';

/**
 * # 持续时间（x小时x分）级联选择器
 *
 * # `z-time-duration-picker`
 *
 * ### Props
 * | 参数 | 说明 | 类型 | 默认值 |
 * |:---:| :---: | :---: | :---: |
 * |  v-model |   毫秒数   |   `number`    |    -   |
 * |  format   | 格式化   |   `'H-m'｜'H-m-s'`    |   `'H-m'`    |
 * |  placeHolder  |  占位文本    |   `string`    |    -   |
 * |  width  |  控件宽度(px)    |   `number`    |    150   |
 *
 * ### Event
 * | 事件名称 | 说明 | 回调函数 |
 * |:---:| :---: | :---: |
 * |   change  |   毫秒数发生变化    |   `Function(m: number)`    |
 * @author chaimzhang
 * @since 2021/4/8 19:39
 */
@Component({
    name: 'ZTimeDurationPicker'
})
export default class ZTimeDurationPicker extends Vue {
    /**
     * 1秒含有的毫秒数
     * @ignore
     */
    private static readonly s: number = 1000;
    /**
     * 1分钟含有的毫秒数
     * @ignore
     */
    private static readonly m: number = 60 * ZTimeDurationPicker.s;
    /**
     * 1小时含有的毫秒数
     * @ignore
     */
    private static readonly h: number = 60 * ZTimeDurationPicker.m;
    /**
     * 格式化
     * @ignore
     */
    @Prop({type: String, default: 'H-m'}) readonly format: 'H-m' | 'H-m-s';
    /**
     * 默认显示文本
     * @ignore
     */
    @Prop({type: String, default: ' '}) readonly placeHolder: string;
    /**
     * 控件宽度
     * @ignore
     */
    @Prop({type: Number, default: 150}) readonly width: number;
    
    /**
     * @ignore
     * 毫秒数
     */
    @Model('change') value: number;
    /**
     * @ignore
     */
    options: SelectOption[] = [];
    
    /**
     * 当前选择
     * @ignore
     */
    curOption: number[] = [];
    /**
     * 是否需要显示秒
     * @ignore
     */
    needSecond: boolean;
    /**
     * @ignore
     */
    style = {};
    
    /**
     * @ignore
     */
    @Prop({default: () => (option => (option?.labels?.join('') ?? ''))}) displayRender;
    
    /**
     * @ignore
     */
    created() {
        this.style = {
            width: (typeof this.width === 'number') ? (this.width) + 'px' : 'auto'
        };
        this.needSecond = this.format == 'H-m-s';
        /** 分钟选择数组 */
        const minuteOptions = [];
        /** 秒选择数组 */
        let secondOptions: SelectOption[];
        if (this.needSecond) {
            secondOptions = [];
            for (let i = 0; i < 60; i++) {
                const option = {
                    label: i + '秒',
                    value: i
                };
                secondOptions.push(option);
            }
        }
        for (let i = 0; i < 60; i++) {
            const option = {
                label: i + '分钟',
                value: i,
                children: secondOptions,
                isLeaf: !this.needSecond
            };
            minuteOptions.push(option);
        }
        for (let i = 0; i < 24; i++) {
            const option = {
                label: i + '小时',
                value: i,
                children: minuteOptions,
                isLeaf: false
            };
            this.options.push(option);
        }
    }
    
    /**
     * @ignore
     */
    @Emit('change')
    onChange(options: number[]) {
        if (options.length > 0) {
            let val = options[0] * ZTimeDurationPicker.h + options[1] * ZTimeDurationPicker.m;
            if (this.needSecond) {
                val += options[2] * ZTimeDurationPicker.s;
            }
            return val;
        }
        return 0;
    }
    
    /**
     * @ignore
     */
    @Watch('value', {immediate: true})
    valueInit(total: number) {
        if (total >= 0) {
            const hour = total / ZTimeDurationPicker.h >> 0;
            total -= ZTimeDurationPicker.h * hour;
            const min = total / ZTimeDurationPicker.m >> 0;
            this.curOption = [hour, min];
            if (this.needSecond) {
                total -= ZTimeDurationPicker.m * min;
                const second = total / ZTimeDurationPicker.s >> 0;
                this.curOption.push(second);
            }
        } else {
            this.curOption = [];
        }
    }
}

/**
 * 选项
 * @ignore
 */
class SelectOption {
    label: string;
    value: number;
    children?: SelectOption[];
}
