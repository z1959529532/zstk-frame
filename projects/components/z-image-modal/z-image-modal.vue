<template>
    <a-modal v-model="modalVisible"
             @change="afterModalClose"
             wrap-class-name="z-image-modal"
             :closable="false"
             :destroyOnClose="true"
             :centered="true"
             :width="width"
             :bodyStyle="{padding:'0'}">
        <div :style="{height:height+'px'}">
            <div style="border-radius:5px;background-size: 100% 100%"
                 :style="{'width':width+'px',height:height+'px'}">
                <img :src="imageUrl"
                     alt
                     v-error-img
                     style="width: 100%;height: 100%;">
            </div>
        </div>
        <template slot="footer">
            <a-button
                title="下载到本地"
                shape="circle"
                ghost
                icon="download" @click="downloadImg">
            </a-button>
            <a-button title="关闭"
                      shape="circle"
                      ghost
                      icon="close" @click="afterModalClose">
            </a-button>
        </template>
    </a-modal>
</template>
<style lang="less" src="./z-image-modal.less"></style>
<script lang="ts" src="./z-image-modal.ts"></script>
