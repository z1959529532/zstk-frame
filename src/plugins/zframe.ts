import {ALL_COMPONENT, ALL_DIRECTIVE, ALL_FILTER, ZComm, ZConfig, ZHttp} from '#';
import moment from 'moment';
import Vue from 'vue';

moment.locale('zh-cn');

for (const key of Object.keys(ALL_DIRECTIVE)) {
    Vue.directive(key, ALL_DIRECTIVE[key]);
}

for (const key of Object.keys(ALL_FILTER)) {
    Vue.filter(key, ALL_FILTER[key]);
}

for (const component of Object.values(ALL_COMPONENT)) {
    Vue.component((component as any).extendOptions.name, component);
}

ZConfig.BASE_URL = 'http://192.168.1.143:8504/';
ZConfig.UPLOAD_FILE_URL = ZConfig.BASE_URL + 'zcommon/fileupload/uploadfile';

ZComm.setComm(new ZHttp());

