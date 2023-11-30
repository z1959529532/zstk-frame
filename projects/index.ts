import loadComponents, {ALL_COMPONENT} from './components';
import loadDirectives, {ALL_DIRECTIVE} from './directives';
import loadFilters, {ALL_FILTER} from './filters';

/**
 * @ignore
 */
const install = (Vue): void => {
    if ((install as any).installed) {
        return;
    }
    (install as any).installed = true;
    loadComponents(Vue);
    loadFilters(Vue);
    loadDirectives(Vue);
};

/**
 * 导出用于插件加载
 *
 * @author chaimzhang
 * @since 2021/4/6 14:51
 * @ignore
 */
export default {
    install
};
export {ALL_FILTER, ALL_DIRECTIVE, ALL_COMPONENT};
//  Util    //////////////////////////////////////////////////
export * from './utils/z.util';
export * from './utils/aes.util';
export * from './utils/api-encrypt.util';
export * from './utils/array.util';
export * from './utils/base64.util';
export * from './utils/browser.util';
export * from './utils/clone.util';
export * from './utils/date.util';
export * from './utils/field.util';
export * from './utils/file.util';
export * from './utils/format.util';
export * from './utils/geo-location.util';
export * from './utils/id.util';
export * from './utils/image.util';
export * from './utils/log.util';
export * from './utils/param.util';
export * from './utils/print.util';
export * from './utils/random.util';
export * from './utils/regex.util';
export * from './utils/rsa.util';
export * from './utils/session-storage.util';
export * from './utils/storage.util';
export * from './utils/string.util';
export * from './utils/url.util';
export * from './utils/app-service.util';
export * from './utils/z-toast.util';
export * from './utils/read-config.util';

//  Entity  //////////////////////////////////////////////////
export * from './entitys/id-name';
export * from './entitys/base-apply';
export * from './entitys/base-reply';
export * from './entitys/file-reply';
export * from './entitys/id-name';
export * from './entitys/name-count';
export * from './entitys/name-value';
export * from './entitys/id-name-value';
export * from './entitys/id-name-count';
export * from './entitys/page-reply';

//  Decorator   //////////////////////////////////////////////////
export * from './decorators/url-prefix.decorator';

//  Constant    //////////////////////////////////////////////////
export * from './constants/z-config';
export * from './constants/z-const';

//  Type  //////////////////////////////////////////////////
export * from './types/z-type';

//  Rx  //////////////////////////////////////////////////
export * from './rx/rx-bus.util';
export * from './rx/rx-receiver-decorator';

//  Base    //////////////////////////////////////////////////
export * from './base/z-page';
export * from './base/z-component';

//  Comm    //////////////////////////////////////////////////
export * from './comm/z-comm';
export * from './comm/httpservice/z-http';
export * from './comm/zcefservice/z-cef';
export * from './comm/entity/z-comm-error';
export * from './comm/entity/z-comm-error-reply';
export * from './comm/entity/z-comm-log';
export * from './comm/entity/z-comm-multi-request-option';
export * from './comm/entity/z-comm-option';
export * from './comm/entity/z-comm-reply-default';
export * from './comm/entity/z-comm-reply';
export * from './comm/entity/z-comm-result';
export * from './comm/entity/z-http-headers';

//  Service    //////////////////////////////////////////////////
export * from './services/z-ui.service';
export * from './services/z-base-dict.service';

//  ZAnalyze    //////////////////////////////////////////////////
export * from './zanalyze/z-analyze';
export * from './zanalyze/entity/apply/z-analyze-session-apply';
export * from './zanalyze/entity/base/z-analyze-base-property';
export * from './zanalyze/entity/base/z-analyze-base';
export * from './zanalyze/entity/base/z-analyze-property';
export * from './zanalyze/entity/session/z-analyze-session';
export * from './zanalyze/entity/session/z-analyze-user';
export * from './zanalyze/entity/z-analyze-event';
export * from './zanalyze/entity/z-analyze-exception';
export * from './zanalyze/entity/z-analyze-page-focus';
export * from './zanalyze/entity/z-analyze-page-visit';

