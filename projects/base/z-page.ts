import {interval} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {ZComponent} from './z-component';

/**
 * 页面基类, 自定义页面需要继承此类，继承此类如果实现ngOnInit或ngOnDestroy需要调用super.ngOnInit()或者super.ngOnDestroy()
 *
 * <p></p>
 * <ol>
 *    <li>配合{@link ZPageComponent}组件实现组件的加载状态显示及重新加载功能</li>
 *    <li>使用setDelayRender，实现延迟加载功能</li>
 * </ol>
 * <p></p>
 *
 * @author ZColin
 * @since 2020/8/20 20:24
 */
    // tslint:disable-next-line:directive-class-suffix
export abstract class ZPage extends ZComponent {
    private analyzePageId: string;
    
    // @ViewChild(ZPageComponent, {static: true}) zPageComponent: ZPageComponent;
    
    /**
     * 加载内容调用的方法
     */
    abstract onLoad(): void;
    
    created(): void {
        super.created();
        // if (this.zPageComponent) {
        //     //开始同步加载，次数+1
        //     this.startLoad(1);
        //     this.zPageComponent.setReLoadListener(() => {
        //         this.onLoad();
        //     });
        // }
        this.onLoad();
        //完成同步加载，次数-1
        this.successLoad();
        
        //记录页面开始事件
        // if (ZAnalyze.getInstance().isInit()) {
        //     this.analyzePageId = ZAnalyze.getInstance().pageStartWithFocus();
        // }
    }
    
    beforeDestroy(): void {
        super.beforeDestroy();
        
        //记录页面失焦事件
        if (this.analyzePageId) {
            // ZAnalyze.getInstance().pageEndWithBlur(this.analyzePageId);
        }
    }
    
    /**
     * 开始加载，当前状态加载中
     *
     * @requestTimes 请求次数，当调用successLoad或failedLoad次数达到此数后，才刷新页面
     */
    startLoad(requestTimes = 1): void {
        // if (this.zPageComponent) {
        //     this.zPageComponent.startLoad(requestTimes);
        // }
    }
    
    /**
     *  重新开始加载
     *
     *  @requestTimes 请求次数，当调用successLoad或failedLoad次数达到此数后，才刷新页面
     */
    startReload(requestTimes = 1): void {
        // if (this.zPageComponent) {
        //     this.zPageComponent.startReload(requestTimes);
        // }
    }
    
    /**
     * 加载成功，当前状态加载成功
     */
    successLoad(): void {
        // if (this.zPageComponent) {
        //     this.zPageComponent.successLoad();
        // }
    }
    
    /**
     *  加载失败，当前状态加载失败
     */
    failedLoad(): void {
        // if (this.zPageComponent) {
        //     this.zPageComponent.failedLoad();
        // }
    }
    
    /**
     * 手工调用增加requestTime次数
     */
    addRequestTimes(): void {
        // if (this.zPageComponent) {
        //     this.zPageComponent.addRequestTimes();
        // }
    }
    
    /**
     * 延迟加载，
     * @param elementId 要获取的html元素的id
     * @param callback  回调函数
     * @param maxDelay  最大延迟时间
     */
    setDelayRender(elementId: string, callback: (element: HTMLElement) => void, maxDelay = 2000): void {
        const totalCount = maxDelay / 100;
        const delaySubscription = interval(100).pipe(take(totalCount), filter(x => {
            return !!document.getElementById(elementId);
        })).subscribe(value => {
            callback(document.getElementById(elementId));
        });
    }
}
