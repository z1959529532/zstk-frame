import {ZCommErrorReply} from '..';

/**
 * 全局通用配置
 *
 * @author ZColin
 * @since 2021/1/12 18:03
 */
export class ZConfig {
    /** 表格每页记录数 */
    static TABLE_PAGE_SIZE = 12;
    
    /** base_url */
    static BASE_URL = '';
    
    /** 下载文件URL前缀 */
    static DOWNLOAD_FILE_URL_PREFIX: string = undefined;
    /** 打开文件URL前缀 */
    static OPEN_FILE_URL_PREFIX: string = undefined;
    /** 预览文件URL */
    static VIEW_FILE_URL: string = undefined;
    
    /** 文件上传服务器URL */
    static UPLOAD_FILE_URL: string = undefined;
    /** 上传文件超时时间 */
    static UPLOAD_FILE_TIMEOUT: number = 60 * 1000;
    
    /** 转向到登录页方法 */
    static REDIRECT_LOGIN_FUNCTION: (msg, errorObj?: ZCommErrorReply) => void = undefined;
    /** 获取用户登录名方法 */
    static GET_USER_NAME_FUNCTION: () => string = undefined;
}
