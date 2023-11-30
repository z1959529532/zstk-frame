import {UrlPrefix} from '#';

@UrlPrefix({
    baseUrl: 'http://192.168.1.8:8081/',
    prefix: ['/h', 'w']
})
export class Url {
    static TEST = 'test';
}


export type ZCommMethod = 'get' | 'post' | 'delete' | 'put';
