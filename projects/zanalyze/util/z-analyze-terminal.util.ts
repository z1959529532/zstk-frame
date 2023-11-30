import {ZAnalyzeProperty} from '../..';
import {DeviceUtil} from './device.util';
import {OsUtil} from './os.util';
import {ZAnalyzeBrowserUtil} from './z-analyze-browser.util';

/**
 * web终端属性实体类
 * @ignore
 *
 * @author ZColin
 * @since 2020-05-11 19:05
 */
export class ZAnalyzeTerminalUtil {
    /** 浏览器 */
    browser: string;
    /** 浏览器版本 */
    version: string;
    /** 浏览器内核 */
    kernel: string;
    /** 分辨率 */
    resolution: string;
    /** 是否支持cookie */
    isCookie: boolean;
    /** 终端语言 */
    language: string;
    /** 操作系统 */
    OS: string;
    /** 操作系统版本 */
    OSVersion: string;
    /** 操作系统信息 */
    OSInfo: string;
    
    static getTerminal(): ZAnalyzeProperty[] {
        /** 浏览器名称 */
        const appName = navigator.appName;
        /** 浏览器版本号 */
        const appVersion = navigator.appVersion;
        
        /** 是否启用cookie */
        const cookieEnabled = navigator.cookieEnabled;
        /** 屏幕宽 */
        let width = window.screen.width;
        /** 屏幕高 */
        let height = window.screen.height;
        /** 操作系统平台 */
        let platform = navigator.platform;
        /** 系统语言 */
        const language = navigator.language;
        /** 浏览器信息 */
        const userAgent = navigator.userAgent;
        
        let list: ZAnalyzeProperty[] = [];
        
        let os = new ZAnalyzeProperty('OS', '操作系统', new OsUtil().analyze(navigator.userAgent)?.name);
        let browser = new ZAnalyzeProperty('BROWSER', '浏览器',
            new ZAnalyzeBrowserUtil().analyze(navigator.userAgent)?.name);
        let device = new ZAnalyzeProperty('DEVICE', '设备信息', new DeviceUtil().analyze(navigator.userAgent)?.name);
        list.push(os, browser, device);
        return list;
    }
}
