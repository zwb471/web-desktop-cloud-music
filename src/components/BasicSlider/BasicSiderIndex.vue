<template>
    <div class="BasicSiderIndex">
        <a-menu v-model:openKeys="openKeys" :inlineCollapsed="false" mode="inline" theme="light" @openChange="onOpenChange">

            <a-menu-item-group key="sub1" :style="{color: $store.state.themeColor}">
                <template #title>
                    <span>
                        <SmileOutlined spin style="font-size: 16px" />
                        <span style="margin-left: 5px">推荐</span>
                    </span>
                </template>
                <a-menu-item v-for="(item,index) in recommendRoutes" :key="item.path || item['name']">
                     <router-link :to="item['path']" class="link" :style="{ color: $store.state.themeColor }">
                    <MenuIcon :icon="item['meta']['icon']" />
                    {{ item['meta']['title'] }}
                     </router-link>
                </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="sub2" :style="{color: $store.state.themeColor}">
                <template #title>
                    <span>
                        <SmileOutlined spin style="font-size: 16px;" />
                        <span style="margin-left: 5px;">我的音乐</span>
                    </span>
                </template>
                <a-menu-item
                v-for="(item,index) in myMusicRoutes"
                :key="item.path || item['name']"
                >
                  <router-link
                      :to="item['path']"
                  >
                    <MenuIcon :icon="item['meta']['icon']" />
                    {{item['meta']['title']}}
                  </router-link>

                </a-menu-item>

            </a-menu-item-group>

            <a-sub-menu key="sub3"   :style="{color: $store.state.themeColor}">
                <template #title>
                    <span>
                        <FrownOutlined style="font-size: 16px; color: #c62f2f;" />
                        <span style="font-size:14px">创建歌单 </span>
                    </span>
                    <!--动态创建歌单-->
                    <a-popover v-model:visible="visible" title="新建歌单" trigger="click" placement="rightTop" @click.stop>
                        <template #content>
                            <Create v-model:songSheetName="songSheetName" v-model:songSheetPrivacy="songSheetPrivacy" />

                            <a-button type="primary" :loading="loading" @click.stop="addSongSheet()">
                                创建
                            </a-button>
                            <a-button @click="visible = false">取消</a-button>
                        </template>

                        <a-button>
                            <FolderAddOutlined />/
                        </a-button>
                    </a-popover>
                </template>
                <!--  <a-menu-item>Option 3</a-menu-item> -->

                <a-menu style="margin-left: 8px;">
                    <a-menu-item v-for="(item) in createSongList" :key="item['id']">
                        <!--右键菜单-->
                        <a-dropdown :trigger="['contextmenu']">
                            <router-link to="/" class="link">
                                <OrderedListOutlined />
                                {{ item['name'] }}
                            </router-link>

                            <!--右键要删除的歌单-->
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="1">
                                        <div @click="handleDelSongSheet(item['id'])">
                                            <DeleteOutlined />
                                            <span>删除歌单</span>
                                        </div>
                                    </a-menu-item>

                                    <a-menu-item key="2">
                                        <div>
                                            <PlayCircleOutlined />
                                            <span>播放全部</span>
                                        </div>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <!--右键菜单-->
                    </a-menu-item>
                </a-menu>
            </a-sub-menu>

        </a-menu>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import Create from "@/components/BasicSlider/Create";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import myMusicRoutes from "@/router/modules/myMusic"
import recommendRoutes from "@/router/modules/recommend"
import {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from "@ant-design/icons-vue";
import api from "@/common/baseProxy";
export default {
    name: "BasicSiderIndex",
    components: { Create },
    setup() {
        const recommend = [
            {
                name: "discover_music",
                meta: { title: "发现音乐", icon: () => <WifiOutlined /> },
            },
            {
                name: "private_fm",
                meta: { title: "私人FM", icon: () => <RedditOutlined /> },
            },
            {
                name: "mv",
                meta: { title: "视频", icon: () => <VideoCameraAddOutlined /> },
            },
        ];
        const { state } = useStore();

        const sideState = reactive({
            openKeys: ["sub1", "sub2", "sub3"],
            selectedKeys: ["/"],
            rootSubmenuKeys: ["sub1", "sub2", "sub3"],
            onOpenChange: (openKeys) => {
                const latestOpenKey = openKeys.find(
                    (key) => sideState.openKeys.indexOf(key) === -1
                );

                if (sideState.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    sideState.openKeys = openKeys;
                } else {
                    sideState.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            },
        });

        const sideCreateState = reactive({
            createSongList: [],
            visible: false,
            loading: false,
            songSheetName: "",
            songSheetPrivacy: false,

            //创建歌单
            async addSongSheet() {
                try {
                    const { songSheetName, songSheetPrivacy, visible } = this;
                    this.loading = true;
                    // this.visible = true;
                    const res = await $axios.get(
                        "/api/playlist/create?name=" +
                            songSheetName +
                            "&privacy=" +
                            (songSheetPrivacy ? "10" : "")
                    );
                    const code = res["data"] && res["data"]["code"];
                    if (code === 200) {
                        await this.getUserPlayList();
                        setTimeout(() => {
                            this.visible = false;
                            this.loading = false;
                        }, 300);
                    }
                } catch (e) {}
            },

            async getUserPlayList() {
                try {
                    const userId = Cookies.get("userId") || 32953014;
                    const res = await $axios.get(
                        // '/user/playlist?uid=' + userId + '&t=' + Date.now(),
                        "/api/user/playlist",
                        {
                            params: {
                                uid: userId,
                                t: Date.now(),
                            },
                        }
                    );
                    // console.log(res.data);
                    this.createSongList = res["data"]["playlist"];
                } catch (e) {
                    console.log(e.message);
                }
            },

            //删除歌单
            async handleDelSongSheet(id) {
                try {
                    // const res = await $axios.get( api + '/playlist/delete?id='+id)
                    const res = await $axios.get("/api/playlist/delete", {
                        params: {
                            id: id,
                        },
                    });
                    const code = res["data"] && res["data"]["code"];
                    if (code === 200) {
                        await this.getUserPlayList();
                    }
                } catch (e) {
                    console.log(e.message);
                }
            },
        });

        //登录之后才可以调用接口getUserPlayList
        watchEffect(() => {
            if (state.isLogin) {
                sideCreateState.getUserPlayList();
            }
        });
        return {
            ...toRefs(sideState),
            ...toRefs(sideCreateState),
            recommend,
          recommendRoutes,
          myMusicRoutes
        };
    },
};
</script>

<style lang="less" scoped>
.basic-sider {
    background: #fff;
    user-select: none;

    //左侧菜单-左边框
    /deep/ .ant-menu-item-selected {
        color: rgba(0, 0, 0, 0.95);
    }

    /deep/ .ant-menu-vertical .ant-menu-item::after,
    /deep/ .ant-menu-vertical-left .ant-menu-item::after,
    /deep/ .ant-menu-vertical-right .ant-menu-item::after,
    /deep/ .ant-menu-inline .ant-menu-item::after {
        left: 0;
        border-left: 3px solid #c62f2f !important;
        border-right: none;
    }

    /deep/ .ant-menu-submenu-title {
        padding-left: 16px !important;
        text-overflow: clip;
    }

    /deep/ .ant-menu-item {
        margin-bottom: 0 !important;
    }

    /deep/ .ant-btn {
        padding: 0 !important;
        margin-left: 20px;
        // border: none !important;
    }
    /deep/
        .ant-menu-item-group
        .ant-menu-submenu-title
        .ant-menu-inline.ant-menu-root
        .ant-menu-submenu-title
        > .ant-menu-title-content {
        font-size: 14px;
        // text-emphasis: none;
        text-overflow: clip !important;
    }
    /deep/ .anticon .anticon-folder-add {
        display: block;
    }
}
</style>