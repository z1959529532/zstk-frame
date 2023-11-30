/**
 * 文件上传响应实体
 *
 * @author chaimzhang
 * @since 2020/3/2 20:50
 */
export class FileReply {
    /** 主键 */
    id: string;
    /** 文件上传编码 */
    fileCode: string;
    /** 存放文件名 */
    fileName: string;
    /** 资料路径 */
    filePath: string;
    /** pdf相对路径 */
    pdfFilePath: string;
    /** 文件大小 */
    fileSize: number;
    /** 文件类型 */
    fileType: string;
    /** 原始文件名 */
    originFileName: string;
    /** 更新时间 */
    updateTime: string;
    /** 删除标识 */
    updateUserCode: string;
    /** 上传人内码 */
    updateUserName: string;
    /** 上传人姓名 */
    uploadTime: string;
    /** 更新人内码 */
    uploadUserCode: string;
    /** 更新人姓名 */
    uploadUserName: string;
}
