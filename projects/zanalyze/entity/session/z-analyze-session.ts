import {ZAnalyzeProperty} from '../../..';

/**
 * 会话实体类
 *
 * @author ZColin
 * @since 2020-05-11 19:09
 */
export class ZAnalyzeSession {
    /** id */
    id: string;
    /** 应用id */
    appId: string;
    /** 应用版本（只有在会话建立时候，才能确定应用的版本） */
    appVersion: string;
    /** 会话建立时间 */
    time: number;
    /** 终端唯一id */
    terminalUUID: string;
    /** 终端属性 */
    terminal: ZAnalyzeProperty[];
    /** 用户属性 */
    user: ZAnalyzeProperty[];
    /** 进入渠道 */
    way: ZAnalyzeProperty[];
}
