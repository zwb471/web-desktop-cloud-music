import {
    Button,
    Layout,
    // ConfigProvider,
    // LocaleProvider,
    Input,
    Popover,
    Menu,
    Avatar,
    Spin,
    Row,
    Col,
    Modal,
    Tabs,
    Tag,
    Card,
    Pagination,
    Table,
    Divider,
    List,
    Breadcrumb,
    Progress,
    Slider,
    Tooltip,
    Descriptions,
    Drawer,
    Dropdown,
    Space,
    Checkbox,
    Image,
    Comment,
    Form,
} from "ant-design-vue"

import {
    LeftOutlined,
    RightOutlined,
    ReloadOutlined,
    SettingOutlined,
    SearchOutlined,
    CloseOutlined,
    CloseCircleOutlined,
    UserOutlined,
    SmileOutlined,
    CheckCircleOutlined,
    SkinOutlined,
    ShrinkOutlined,
    MinusOutlined,
    SwitcherOutlined,
    BorderOutlined,
    QqOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    HeartTwoTone,
    FrownOutlined,
    TeamOutlined,
    VideoCameraAddOutlined,
    RedditOutlined,
    WifiOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    UserAddOutlined,
    CustomerServiceOutlined,
    HeartOutlined,
    PlayCircleOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
    ArrowRightOutlined,
    PlusOutlined,
    DownloadOutlined,
    ShareAltOutlined,
    FolderAddOutlined,
    DownOutlined,
    FolderOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    CaretRightOutlined,
    PauseOutlined,
    AudioMutedOutlined,
    AudioOutlined,
    HistoryOutlined,
    OrderedListOutlined,
    CloudOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    PushpinOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    WomanOutlined,
    ManOutlined,
    DeleteOutlined,
}  from "@ant-design/icons-vue"

import MenuIcon from "../components/Global/MenuIcon"


export default {
    install(App){
        App.component('LeftOutlined',LeftOutlined)
        App.component('RightOutlined',RightOutlined)
        App.component('ReloadOutlined',ReloadOutlined)
        App.component('SettingOutlined',SettingOutlined)
        App.component('SearchOutlined',SearchOutlined)
        App.component('CloseOutlined',CloseOutlined)
        App.component('CloseCircleOutlined',CloseCircleOutlined)
        App.component('UserOutlined',UserOutlined)
        App.component('SmileOutlined',SmileOutlined)
        App.component('CheckCircleOutlined',CheckCircleOutlined)
        App.component('SkinOutlined',SkinOutlined)
        App.component('ShrinkOutlined',ShrinkOutlined)
        App.component('MinusOutlined',MinusOutlined)
        App.component('SwitcherOutlined',SwitcherOutlined)
        App.component('BorderOutlined',BorderOutlined)
        App.component('QqOutlined',QqOutlined)
        App.component('MailOutlined',MailOutlined)
        App.component('CalendarOutlined',CalendarOutlined)
        App.component('AppstoreOutlined',AppstoreOutlined)
        App.component('HeartTwoTone',HeartTwoTone)
        App.component('FrownOutlined',FrownOutlined)
        App.component('TeamOutlined',TeamOutlined)
        App.component('VideoCameraAddOutlined',VideoCameraAddOutlined)
        App.component('RedditOutlined',RedditOutlined)
        App.component('WifiOutlined',WifiOutlined)
        App.component('CloudDownloadOutlined',CloudDownloadOutlined)
        App.component('CloudUploadOutlined',CloudUploadOutlined)
        App.component('UserAddOutlined',UserAddOutlined)
        App.component('CustomerServiceOutlined',CustomerServiceOutlined)
        App.component('HeartOutlined',HeartOutlined)
        App.component('PlayCircleOutlined',PlayCircleOutlined)
        App.component('MenuIcon',MenuIcon)
        App.component('LeftCircleOutlined',LeftCircleOutlined)
        App.component('RightCircleOutlined',RightCircleOutlined)
        App.component('ArrowRightOutlined',ArrowRightOutlined)
        App.component('PlusOutlined',PlusOutlined)
        App.component('DownloadOutlined',DownloadOutlined)
        App.component('ShareAltOutlined',ShareAltOutlined)
        App.component('FolderAddOutlined',FolderAddOutlined)
        App.component('DownOutlined',DownOutlined)
        App.component('FolderOutlined',FolderOutlined)
        App.component('StepBackwardOutlined',StepBackwardOutlined)
        App.component('StepForwardOutlined',StepForwardOutlined)
        App.component('CaretRightOutlined',CaretRightOutlined)
        App.component('PauseOutlined',PauseOutlined)
        App.component('AudioMutedOutlined',AudioMutedOutlined)
        App.component('AudioOutlined',AudioOutlined)
        App.component('HistoryOutlined',HistoryOutlined)
        App.component('OrderedListOutlined',OrderedListOutlined)
        App.component('CloudOutlined',CloudOutlined)
        App.component('FullscreenOutlined',FullscreenOutlined)
        App.component('FullscreenExitOutlined',FullscreenExitOutlined)
        App.component('PushpinOutlined',PushpinOutlined)
        App.component('DoubleRightOutlined',DoubleRightOutlined)
        App.component('DoubleLeftOutlined',DoubleLeftOutlined)
        App.component('ManOutlined',ManOutlined)
        App.component('WomanOutlined',WomanOutlined)
        App.component('DeleteOutlined',DeleteOutlined)



        App
            .use(Button)
            .use(Layout)
            .use(Input)
            .use(Popover)
            .use(Menu)
            .use(Avatar)
            .use(Spin)
            .use(Row)
            .use(Col)
            .use(Tabs)
            .use(Tag)
            .use(Card)
            .use(Pagination)
            .use(Table)
            .use(Divider)
            .use(List)
            .use(Breadcrumb)
            .use(Progress)
            .use(Slider)
            .use(Tooltip)
            .use(Descriptions)
            .use(Drawer)
            .use(Dropdown)
            .use(Space)
            .use(Checkbox)
            .use(Image)
            .use(Comment)
            .use(Form)

        App.config.globalProperties.$info = Modal.info
        App.config.globalProperties.$success = Modal.success
        App.config.globalProperties.$error = Modal.error
        App.config.globalProperties.$warning = Modal.warning
        App.config.globalProperties.$confirm = Modal.confirm
    }

}
