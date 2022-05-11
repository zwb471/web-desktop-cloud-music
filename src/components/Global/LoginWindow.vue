<template>
    <div class="LoginWindow" v-if="isShowLoginWindow">
        <p class="hdbar">
            <span class="title">手机号登录</span>
            <i class="close"></i>
        </p>

        <div class="userInputArea">
            <div class="login-wrapper">
                <div class="mphone">
                    <a class="number-area" href="javascript:">
                        <span class="current">+86</span>
                        <i class="toggle"></i>
                    </a>

                    <div class="txtwrap">
                        <input v-model="phone" class="phone" type="number" placeholder="请输入手机号" autocomplete="off" />
                    </div>
                </div>

                <div class="passwordWrap">
                    <input v-model="password" class="password-field" type="text" placeholder="请输入密码" />
                </div>

                <div class="loginBtn" @click="handleLogin()">登录</div>
            </div>
        </div>

        <div class="other">
            <a href="https://music.163.com">没有帐号？点击去网易云音乐官网注册吧 ~</a>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Cookies from "js-cookie";
// import api from "@/common/baseProxy"
import { getCheckTelReg, PostLogin } from "../../common/api";

export default {
    name: "LoginWindow",
    alias: "登录窗口",
    data() {
        return {
            phone: "",
            password: "",
            phoneReg:
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            passwordReg: /^\w{8,20}$/,
        };
    },
    updated() {
        this.listenLoginWindow();
    },
    mounted() {
        this.listenLoginWindow();
    },
    computed: {
        ...mapState(["isShowLoginWindow"]),
    },
    methods: {
        ...mapMutations([
            "setIsShowLoginWindow",
            "setUserId",
            "setIsLogin",
            "setUserInfo",
        ]),
        async handleLogin() {
            const { phone, password, phoneReg, passwordReg, $error, $warning } =
                this;
            //  console.log(phone);
            if( !phoneReg.test(phone) ){
                const modal = $error({
                  title: '你输入的手机号格式不对'
                })
                setTimeout(()=>{
                  modal.destroy()
                },2000)
                return
            }
            // if ( !passwordReg.test(password) ){
            //   const modal = $error({
            //     title: '你输入的密码格式不对'
            //   })
            //   setTimeout(()=>{
            //     modal.destroy()
            //   },2000)
            //   return
            // }

            try {
                const res = await $axios.get(`/api/login/cellphone?phone=${phone}&password=${password}`)
                // const res = await PostLogin(phone,password);

                // const res = await axios.post("/login/cellphone", {
                //     phone: phone,
                //     password: password,
                // });
                // console.log(res);
                const result = res["data"];
                if (res["status"] === 200 && result["code"] === 200) {
                    Cookies["set"]("token", result.token, { expires: 7 });
                    Cookies["set"]("cookie", result.cookie, { expires: 7 });
                    Cookies["set"]("userId", result.profile.userId, {
                        expires: 7,
                    });
                //   console.log(result.profile);
                    this.setUserId(result.profile.userId);
                    this["setIsShowLoginWindow"](false);
                    this["setUserInfo"]({
                        nickname: result.profile.nickname,
                        avatarUrl: result.profile.avatarUrl,
                        backgroundUrl: result.profile.backgroundUrl,
                    });

                    this["setIsLogin"](true);

                    this.phone = "";
                    this.password = "";
                } else {
                    $warning({
                        title: "登录失败",
                        content: `${result["msg"]},请重新登录`,
                    });
                }
            } catch (e) {
                console.log(e.message);
            }
        },

        listenLoginWindow() {
            if (this.isShowLoginWindow) {
                const This = this;
                var oLogin = document.querySelector(".btn");
                var oTitle = document.querySelector(".hdbar");
                var oClose = document.querySelector(".close");
                var oLoginface = document.querySelector(".LoginWindow");

                var onOff = true;
                if (oLogin)
                    oLogin.addEventListener("click", () => {
                        // This.isShowLoginWindow = true
                        This["setIsShowLoginWindow"](true);

                        autoCenter();
                    });
                if (oClose)
                    oClose.addEventListener("click", () => {
                        console.log("oClose");
                        // This.isShowLoginWindow = false
                        This["setIsShowLoginWindow"](false);

                        autoCenter();
                    });

                window.onresize = function () {
                    autoCenter();
                };

                function autoCenter() {
                    oLoginface.style.left =
                        (document.documentElement.clientWidth -
                            oLoginface.offsetWidth) /
                            2 +
                        "px";
                    oLoginface.style.top =
                        (document.documentElement.clientHeight -
                            oLoginface.offsetHeight) /
                            2 +
                        "px";
                }

                var prevX = 0;
                var prevY = 0;

                var iSpeedX = 0;
                var iSpeedY = 0;

                var timer = null;
                oTitle.onmousedown = function (e) {
                    var e = e || event;
                    var disX = e.clientX - oLoginface.offsetLeft;
                    var disY = e.clientY - oLoginface.offsetTop;

                    prevX = e.clientX;
                    prevY = e.clientY;

                    clearInterval(timer);

                    document.onmousemove = function (e) {
                        var e = e || event;
                        var L = e.clientX - disX;
                        var T = e.clientY - disY;
                        oLoginface.style.left = L + "px";
                        oLoginface.style.top = T + "px";
                        /*
                var oDiv = document.createElement('div');
                oDiv.style.cssText = 'z-index:9999;width:5px;height:5px;background:red;position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px';
                this.body.appendChild(oDiv);
            */
                        iSpeedX = e.clientX - prevX;
                        iSpeedY = e.clientY - prevY;

                        prevX = e.clientX;
                        prevY = e.clientY;
                    };

                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                        startMove();
                    };
                    return false;
                };

                function startMove() {
                    clearInterval(This.timer);
                    This.timer = setInterval(function () {
                        iSpeedY += 3;
                        var L = oLoginface.offsetLeft + iSpeedX;
                        var T = oLoginface.offsetTop + iSpeedY;

                        if (L < 0) {
                            L = 0;
                            iSpeedX *= -1;
                            iSpeedX *= 0.75;
                        } else if (
                            L >
                            document.documentElement.clientWidth -
                                oLoginface.offsetWidth
                        ) {
                            L =
                                document.documentElement.clientWidth -
                                oLoginface.offsetWidth;
                            iSpeedX *= -1;
                            iSpeedX *= 0.75;
                        }

                        if (T < 0) {
                            T = 0;
                            iSpeedY *= -1;
                            iSpeedY *= 0.75;
                        } else if (
                            T >
                            document.documentElement.clientHeight -
                                oLoginface.offsetHeight
                        ) {
                            T =
                                document.documentElement.clientHeight -
                                oLoginface.offsetHeight;
                            iSpeedY *= -1;
                            iSpeedY *= 0.75;
                            iSpeedX *= 0.75;
                        }

                        oLoginface.style.left = L + "px";
                        oLoginface.style.top = T + "px";

                        // console.log(Math.abs(iSpeedY).toFixed(2))
                        if (Math.abs(iSpeedY).toFixed(2) == 1.29) {
                            clearInterval(This.timer);
                        }
                    }, 30);
                }
            }
        },
    },
};
</script>

<style lang="less" scoped>
.LoginWindow {
    position: fixed;
    left: calc((100vw - 530px) / 2);
    top: calc((100vh - 330px) / 2);
    z-index: 999;
    overflow: hidden;
    width: 530px;
    height: 310px;
    border-radius: 4px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
    background: #fff;

    display: flex;
    flex-direction: column;

    .hdbar {
        border-bottom: 1px solid #191919;
        border-radius: 4px 4px 0 0;
        background: #2d2d2d;

        height: 38px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        cursor: move;

        .title {
            padding-right: 45px;
            padding-left: 18px;

            border-radius: 3px 3px 0 0;
            font-weight: bold;
            font-size: 14px;
            color: #fff;
        }

        .close {
            margin-right: 20px;
            width: 10px;
            height: 10px;
            overflow: hidden;
            cursor: pointer;
            background: url("/static/layer.png") no-repeat 0 -95px;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
        }
    }

    .userInputArea {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        .login-wrapper {
            width: 220px;

            .mphone {
                height: 30px;
                margin: 0;
                border: 1px solid #cdcdcd;
                border-radius: 2px;

                display: flex;

                .number-area {
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 18px 0 5px;
                    border-right: 1px solid #cdcdcd;

                    position: relative;
                    background: #eee;

                    &:hover {
                        text-decoration: none;
                    }

                    .current {
                    }

                    .toggle {
                        position: absolute;
                        top: 14px;
                        right: 7px;
                        width: 7px;
                        height: 4px;
                        background: url("/static/icon2.png") no-repeat -260px -450px;
                    }
                }

                .txtwrap {
                    flex: 1;
                    overflow: hidden;
                    box-sizing: content-box;
                    display: flex;

                    .phone {
                        flex: 1;
                        //padding: 5px 8px 5px;
                        //height: 20px;
                        line-height: 20px;
                        border: none;
                        //outline: none;
                        text-indent: 0.5em;
                    }
                }
            }

            .passwordWrap {
                margin-top: 10px;
                display: flex;

                .password-field {
                    flex: 1;
                    height: 19px;
                    padding: 5px 6px 6px;
                    border: 1px solid #cdcdcd;
                    border-radius: 2px;
                    line-height: 19px;
                    box-sizing: content-box;
                }
            }

            .loginBtn {
                margin-top: 20px;

                height: 31px;
                line-height: 31px;
                text-align: center;
                color: #fff;
                cursor: pointer;

                opacity: 1;
                background: linear-gradient(180deg, #4da1e0, #1d6ebe);

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }

    .other {
        padding: 0 19px;
        height: 48px;
        border-top: 1px solid #c6c6c6;
        border-radius: 0 0 4px 4px;
        line-height: 48px;
        background-color: #f7f7f7;

        text-align: right;

        a {
            font-size: 12px;
            color: #999;
        }
    }
}
</style>
