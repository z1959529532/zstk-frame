import {FieldUtil} from '#';

/**
 * 对对象数组中的某字段Join
 * @param objList 对象数组
 * @param k 对象的键
 * @param separator 分隔符 默认是 ，
 *
 * @author chaimzhang
 * @since 2021/4/6 11:23
 */
export default function <T>(objList: T[], k: keyof T, separator: string = '，'): string {
    const strList: string[] = [];
    if (objList?.length > 0 && k) {
        for (let i = 0; i < objList.length; i++) {
            let obj = objList[i];
            if (FieldUtil.isValid(obj[k])) {
                strList.push(String(obj[k]));
            }
        }
    }
    return strList.join(separator);
}
