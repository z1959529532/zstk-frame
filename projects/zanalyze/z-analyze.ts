import axios from 'axios';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {DateUtil, IdUtil, ZAnalyzeEvent, ZAnalyzeException, ZAnalyzePageFocus, ZAnalyzePageVisit, ZAnalyzeProperty, ZAnalyzeSession, ZAnalyzeSessionApply, ZHttpHeaders} from '..';
import {ZAnalyzeError} from './error/z-analyze-error';
import {ZAnalyzeErrorListener} from './error/z-analyze-error-listener';
import {ZAnalyzeHttpReply} from './http/z-analyze-http-reply';
import {ZAnalyzeUrl} from './http/z-analyze-url';
import {ZAnalyzeTerminalUtil} from './util/z-analyze-terminal.util';
import {ZAnalyzeWayUtil} from './util/z-analyze-way.util';

/**
 * 用户行为分析
 *
 * @author ZColin
 * @since 2020/5/11 20:05
 */
export class ZAnalyze {
    /** 单例 */
    private static instance: ZAnalyze = new ZAnalyze();
    /** 服务是否可用 */
    private enable = true;
    
    /** 根url */
    private baseUrl: string;
    /** 应用key */
    private appKey: string;
    /** 应用访问session */
    private session: ZAnalyzeSession;
    
    /** pageVisit缓存 */
    private pageVisitMap: Map<string, ZAnalyzePageVisit> = new Map<string, ZAnalyzePageVisit>();
    /** visitTime缓存 */
    private pageFocusMap: Map<string, ZAnalyzePageFocus> = new Map<string, ZAnalyzePageFocus>();
    
    /**
     * 单例获取
     */
    static getInstance(): ZAnalyze {
        return ZAnalyze.instance;
    }
    
    /**
     * 获取正确的基地址
     * @param url  baseUrl
     */
    private static getBaseUrl(url: string): string {
        if (url != null && !url.endsWith('\\') && !url.endsWith('/')) {
            url += '/';
        }
        return url;
    }
    
    /**
     * 设置用户行为分析是否可用
     */
    setEnable(enable: boolean) {
        this.enable = enable;
    }
    
    /**
     * 是否初始化了SDK
     */
    isInit() {
        return this.enable && this.session?.appId && this.appKey;
    }
    
    /**
     * 检查是否初始化了SDK，即是否调用了{@link #appStart(String, String, String, String, ZAnalyzeTerminal)}
     */
    checkInit() {
        if (this.enable) {
            if (!this.session.appId || !this.appKey) {
                throw new ZAnalyzeError('请调用appStart进行应用初始化');
            }
        }
    }
    
    /**
     * 应用启动
     *
     * @param baseUrl      起始URL
     * @param appId        服务端分配的应用Id
     * @param appKey       服务端分配的应用key
     * @param appVersion   应用版本
     * @param userProperty 用户属性
     */
    appStart(baseUrl: string, appId: string, appKey: string, appVersion: string,
             userProperty?: ZAnalyzeProperty[]) {
        if (!this.enable) {
            return;
        }
        
        //注册错误监听
        ZAnalyzeErrorListener.addErrorListener();
        
        //本地如果没有id，则存入
        if (!localStorage.getItem('ZANALYZE-UUID')) {
            localStorage.setItem('ZANALYZE-UUID', IdUtil.simpleUUID());
        }
        
        this.baseUrl = ZAnalyze.getBaseUrl(baseUrl);
        this.appKey = appKey;
        
        //如果sessionStore存储了session的值，认为时一次会话，不用再次开启会话
        let storeSession = sessionStorage.getItem('zanalyze-session');
        if (storeSession) {
            this.session = JSON.parse(storeSession);
        }
        
        if (!this.session || !this.session.id) {
            let session = new ZAnalyzeSession();
            session.id = IdUtil.simpleUUID();
            session.appId = appId;
            session.appVersion = appVersion;
            session.time = DateUtil.getCurTimeSecondStamp();
            session.terminalUUID = localStorage.getItem('ZANALYZE-UUID');
            session.terminal = ZAnalyzeTerminalUtil.getTerminal();
            session.user = userProperty;
            session.way = ZAnalyzeWayUtil.getWay();
            this.session = session;
            //将session保存到会话中
            sessionStorage.setItem('zanalyze-session', JSON.stringify(session));
            
            let apply = new ZAnalyzeSessionApply();
            apply.session = session;
            apply.key = this.appKey;
            this.save<string>(ZAnalyzeUrl.ADD_SESSION, apply).subscribe(res => {
                if (!res) {
                    //如果session建立没有成功，则session置为空， 后续请求不再发送
                    this.session = null;
                }
            });
        }
    }
    
    /**
     * 添加异常信息
     * @param url    文件名或url
     * @param line   行号
     * @param message 错误信息
     */
    exception(url: string, line: string, message: string) {
        if (!this.enable) {
            return;
        }
        
        this.checkInit();
        if (this.session) {
            let info = new ZAnalyzeException();
            info.info = message;
            info.sessionId = this.session.id;
            info.time = new Date().getTime();
            info.className = url;
            info.line = line;
            this.save(ZAnalyzeUrl.ADD_EXCEPTION, info).subscribe(() => {});
        }
    }
    
    /**
     * 添加事件
     *
     * @param analyzeEvent 自定义事件
     */
    event(analyzeEvent: ZAnalyzeEvent) {
        if (!this.enable) {
            return;
        }
        
        this.checkInit();
        if (this.session && analyzeEvent) {
            analyzeEvent.sessionId = this.session.id;
            this.save(ZAnalyzeUrl.ADD_EVENT, analyzeEvent).subscribe(() => {});
        }
    }
    
    /**
     * 添加页面开始事件，并且同时添加聚焦事件
     */
    pageStartWithFocus(pageName?: string): string {
        let visitPageId = this.pageStart(pageName);
        if (visitPageId) {
            this.focus(visitPageId);
        }
        return visitPageId;
    }
    
    /**
     * 添加页面开始事件
     *
     * @param name  页面名称
     */
    pageStart(name?: string): string {
        if (!this.enable) {
            return null;
        }
        
        this.checkInit();
        if (this.session) {
            let page = new ZAnalyzePageVisit();
            page.id = IdUtil.simpleUUID();
            page.sessionId = this.session.id;
            page.path = window.location.pathname;
            page.page = name;
            page.startTime = new Date().getTime();
            
            //缓存页面对象
            this.pageVisitMap.set(page.id, page);
            return page.id;
        }
        return null;
    }
    
    /**
     * 添加页面聚焦事件
     *
     * @param visitPageId  访问页面的Id
     */
    focus(visitPageId: string) {
        if (!this.enable) {
            return;
        }
        
        this.checkInit();
        if (this.session) {
            let focus = new ZAnalyzePageFocus();
            focus.visitId = visitPageId;
            focus.focusTime = new Date().getTime();
            
            //缓存聚焦事件
            this.pageFocusMap.set(visitPageId, focus);
        }
    }
    
    /**
     * 页面结束，并且执行页面失焦
     *
     * @param visitPageId 进入页面时Id
     */
    pageEndWithBlur(visitPageId: string) {
        return this.pageEnd(visitPageId, () => {
            this.blur(visitPageId);
        });
    }
    
    /**
     * 页面结束
     *
     * @param visitPageId 进入页面时Id
     * @param successCallback  完成回调
     */
    pageEnd(visitPageId: string, successCallback?: () => void) {
        if (!this.enable) {
            return;
        }
        
        this.checkInit();
        if (this.session) {
            let page = this.pageVisitMap.get(visitPageId);
            if (page) {
                page.endTime = new Date().getTime();
                this.save<string>(ZAnalyzeUrl.VISIT, page).subscribe(res => {
                    if (successCallback && res.success) {
                        successCallback();
                    }
                });
            }
        }
    }
    
    /**
     * 添加页面失焦事件
     *
     * @param visitPageId  访问页面的Id
     */
    blur(visitPageId: string) {
        if (!this.enable) {
            return;
        }
        
        this.checkInit();
        if (this.session) {
            let blur = this.pageFocusMap.get(visitPageId);
            if (blur) {
                blur.blurTime = new Date().getTime();
                this.save(ZAnalyzeUrl.VISIT_TIME, blur).subscribe(() => {
                });
            }
        }
    }
    
    /**
     * 发送数据
     */
    private save<T>(url: string, body: any, options?: {
        headers?: ZHttpHeaders;
        observe?: 'body';
        params?: any;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<ZAnalyzeHttpReply<T>> {
        return fromPromise<ZAnalyzeHttpReply<T>>(axios.post(this.baseUrl + url, body, options));
    }
}
