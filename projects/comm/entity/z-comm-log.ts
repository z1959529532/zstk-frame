import {LogUtil} from '../..';
import {ZCommOption} from './z-comm-option';

/**
 * 通讯日志信息
 *
 * @author ZColin
 * @since 2020/5/26 11:39
 */
export class ZCommLogEntity {
    /** url */
    url: string;
    /** header */
    header: string;
    /** 请求参数 */
    requestArgs: string;
    /** 显示加载 */
    showLoading: boolean;
    /** toast的变量 */
    showToast: boolean;
    // /** zComponent对象 */
    // zComponent: ZComponent;
    // /** zpage对象 */
    // zLoadingContext: ZPage;
    /** 返回参数 */
    responseArgs: string;
    /** 开始时间 */
    startTime: number;
    /** 消耗时间 */
    timeConsuming: number;
}

/**
 * 通讯日志记录工具类
 *
 * @author ZColin
 * @since 2020/5/26 11:39
 */
export class ZCommLog {
    
    /**
     * 请求日志记录
     */
    static request<T>(zOption: ZCommOption<T>) {
        if (LogUtil.DEBUG) {
            let log = new ZCommLogEntity();
            log.url = zOption.url;
            if (zOption['header']) {
                //ZHttpOption
                log.header = JSON.stringify(zOption['header']);
            }
            log.startTime = new Date().getTime();
            log.showLoading = zOption.isShowLoading;
            log.showToast = zOption.isShowToastError;
            // log.zLoadingContext = zOption.loadingContext;
            // log.zComponent = zOption.zComponent;
            log.requestArgs = zOption.body ? JSON.stringify(zOption.body) : '';
            zOption.log = log;
        }
    }
    
    /**
     * 返回日志输入
     */
    static response<T>(zOption: ZCommOption<T>, res: any) {
        if (LogUtil.DEBUG) {
            let logInfo = zOption.log;
            logInfo.responseArgs = JSON.stringify(res);
            logInfo.timeConsuming = new Date().getTime() - logInfo.startTime;
            LogUtil.log('');
            LogUtil.log(
                '=========================================== Start ===========================================');
            LogUtil.log(`* URL                :`, logInfo.url);
            if (logInfo.header) {
                LogUtil.log('* Header             :%s', logInfo.header);
            }
            LogUtil.log('* Loading | Toast    :%s', logInfo.showLoading, logInfo.showToast);
            LogUtil.log('* ZPage | ZComponent :%s', '');//!!logInfo.zLoadingContext, !!logInfo.zComponent);
            LogUtil.log('* Time Consuming     :%d ms', logInfo.timeConsuming);
            LogUtil.log('----------------------------------------');
            LogUtil.log('////////////  Request Args ////////////: ');
            LogUtil.log(logInfo.requestArgs);
            LogUtil.log('//////////// Response Args ////////////:');
            LogUtil.log(logInfo.responseArgs);
            LogUtil.log(
                '===========================================  End  ===========================================');
        }
    }
}


