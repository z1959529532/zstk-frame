import axios from 'axios';

/**
 * 读取配置文件工具
 *
 * @author chaimzhang
 * @since 2021/4/2 16:59
 */

export class ReadConfigUtil {
    /**
     * 读取配置文件
     *
     * 生产环境时public/config-prod.json会覆盖public/config.json中同名配置项
     * @param configSrc 开发配置文件路径
     * @param prodConfigSrc 生产配置文件路径
     */
    static read(configSrc: string = 'public/config.json',
                prodConfigSrc: string = 'public/config-prod.json'): Promise<any> {
        const promiseList = [axios.get(configSrc)];
        if (process.env.NODE_ENV === 'production') {
            promiseList.push(axios.get(prodConfigSrc));
        }
        return new Promise<any>(resolve => {
            Promise.all(promiseList).then((res) => {
                let obj = {};
                res.forEach(o => obj = {...obj, ...o});
                resolve(obj);
            });
        });
    }
}
