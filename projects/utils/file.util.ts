/**
 * 文件相关工具类
 *
 * @author ZColin
 * @since 2020/5/16 13:31
 */
import axios from 'axios';

export class FileUtil {
    /** K字节 */
    static readonly KB = 1024;
    /** M字节 */
    static readonly MB = 1024 * FileUtil.KB;
    /** G字节 */
    static readonly GB = 1024 * FileUtil.MB;
    
    /**
     * 获取文件大小（以B，KB，MB，GB显示）
     */
    static getFileSizeStr(value: number): string {
        if (value < FileUtil.KB) {
            return value + 'B';
        } else {
            const g = (value / FileUtil.GB);
            const m = (value / FileUtil.MB);
            const k = (value / FileUtil.KB);
            
            let str = '';
            if (g >= 1) {
                str = g.toFixed(2) + 'GB';
            } else if (m >= 1) {
                str = m.toFixed(2) + 'MB';
            } else if (k >= 1) {
                str = k.toFixed(2) + 'KB';
            }
            return str;
        }
    }
    
    /**
     * 下载文件
     * @param url get请求的完整url
     * @param fileName 下载文件名，应包含后缀名（下载后重命名为此值）
     */
    static download(url: string, fileName?: string) {
        const a = document.createElement('a');
        a.style.display = 'none';
        if (fileName) {
            axios.get(url, {
                headers: {'Content-Type': 'application/octet-stream'},
                responseType: 'blob',
                withCredentials: true
            }).then((res: any) => {
                a.href = window.URL.createObjectURL(new Blob([res.data]));
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(a.href);
                document.body.removeChild(a);
            });
        } else {
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}
