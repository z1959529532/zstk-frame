/**
 * 计算字体显示宽度
 *
 * @author chaimzhang
 * @since 2020/9/2 10:47
 */
export class TextUtil {
    /**
     * 获取文字显示的宽度
     */
    static getWidth(str: string, fontSize?: string, fontFamily?: string): number {
        if (!str) {
            return 0;
        }
        const span = document.createElement('span');
        span.style.color = 'transparent';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        if (fontSize) {
            span.style.fontSize = fontSize;
        }
        if (fontFamily) {
            span.style.fontFamily = fontFamily;
        }
        str = str.replace('/\\n/g', '').replace('/\\r/g', ' ');
        span.innerText = str;
        
        document.documentElement.append(span);
        
        const width = Math.floor(Number(window.getComputedStyle(span).width.replace('px', '')));
        document.documentElement.removeChild(span);
        return width;
    }
    
    /**
     * 获取指定宽度下能显示的文字，超出宽度的部分显示...
     */
    static getTextByWidth(str: string, width: number, fontSize?: number, fontFamily?: string) {
        if (!str || !width || TextUtil.getWidth(str) <= width) {
            return str;
        }
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.color = 'transparent';
        
        if (fontSize) {
            span.style.fontSize = fontSize + 'px';
        }
        if (fontFamily) {
            span.style.fontFamily = fontFamily;
        }
        str = str.replace('/\\n/g', '').replace('/\\r/g', ' ');
        span.innerText = str + '...';
        
        document.documentElement.append(span);
        
        while (Math.floor(Number(window.getComputedStyle(span).width.replace('px', ''))) > width) {
            span.innerText = span.innerText.substring(0, span.innerText.length - 4) + '...';
        }
        
        return span.innerText;
    }
}
