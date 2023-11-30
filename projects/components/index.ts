import ZFile from './z-file/z-file.vue';
import ZImageModal from './z-image-modal/z-image-modal.vue';
import ZImage from './z-image/z-image.vue';
import ZListContainer from './z-list-container/z-list-container.vue';
import ZPagination from './z-pagination/z-pagination.vue';
import ZTimeDurationPicker from './z-time-duration-picker/z-time-duration-picker.vue';
import ZUpload from './z-upload/z-upload.vue';

export const ALL_COMPONENT = {
    ZFile,
    ZImage,
    ZUpload,
    ZTimeDurationPicker,
    ZImageModal,
    ZListContainer,
    ZPagination
};

/**
 * @ignore
 */
export default function(Vue) {
    for (const component of Object.values(ALL_COMPONENT)) {
        Vue.component((component as any).extendOptions.name, component);
    }
}
