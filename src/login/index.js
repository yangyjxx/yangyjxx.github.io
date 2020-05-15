import React, {Component} from 'react';
import './style.scss'
import axios from "axios";
import qs from 'qs';
import {Link} from "react-router-dom";

class Index extends Component {

    state={
        mobile:'',
        password:'',
        access_key: '27949e2e0bd17f64a48baab97f9da39d',   // 公共参数
    }

    isPhone=()=>{                                              // 判断手机号码格式是否正确
        let res = this.state.mobile.match(/^1[0-9]{10}$/);
        if(res === null && this.state.mobile !== ''){
            return (
                <span className={'false1'}>请输入正确的手机号码</span>
            )
        }
    }

    isPassword=()=>{                                           // 判断密码格式是否正确
        let res = this.state.password.match(/.{6}/);
        if(res === null && this.state.password !== ''){
            return (
                <span className={'false3'}>请输入至少6位的密码</span>
            )
        }
    }

    deng=()=> {
        let data = {
            mobile:this.state.mobile,
            password:this.state.password,
        }

        if (this.state.mobile.match(/^1[0-9]{10}$/) && (this.state.password.match(/.{6}/))) {
            axios.post('https://www.it266.com/api/customer/token?access_key='+this.state.access_key,qs.stringify(data))
                .then((response) =>{
                    if(response.data.status===true){
                        // console.log(response)
                        window.localStorage.setItem('token',response.data.data.token)
                        this.props.history.replace('/pages')
                    }else{
                        window.alert(response.data.data)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className={'Login'}>
                <div className="top">
                    登录
                </div>
                <div className="weui-form">
                    <div className="weui-form__control-area">
                        <div className="weui-cells__group weui-cells__group_form">
                            <div className="weui-cells weui-cells_form">
                                <div className="weui-cell weui-cell_active">
                                    <div className="weui-cell__bd">
                                        <input className="weui-input" type="number" pattern="[0-9]*"
                                               placeholder="请输入手机号"
                                               onChange={(e)=>{
                                                   this.setState({mobile: e.target.value})
                                               }}
                                        />
                                    </div>
                                    <div className="weui-cell__ft">
                                        <a className="weui-btn_reset weui-btn_icon">
                                            <span className={'iconfont'}>&#xe600;</span>
                                        </a>
                                    </div>
                                    {this.isPhone()}
                                </div>
                                <div className="weui-cell weui-cell_active weui-cell_vcode">
                                    <div className="weui-cell__bd">
                                        <input autoFocus className="weui-input" type="password" pattern="[0-9]*"
                                               id="js_input" placeholder="输入密码"
                                               onChange={(e)=>{
                                                   this.setState({password: e.target.value})
                                               }}
                                        />
                                    </div>
                                    <div className="weui-cell__ft">
                                        <a className="weui-btn_reset weui-btn_icon">
                                            <span className={'iconfont'}>&#xe644;</span>
                                        </a>
                                    </div>
                                    {this.isPassword()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="weui-form__opr-area">
                        <a className="weui-btn weui-btn_primary"
                           href="javascript:"
                           id="showTooltips"
                           onClick={this.deng}
                        > 登录</a>
                    </div>
                </div>
                <div className={'last'}>
                    没有账号 <Link to={'/'} className={'last-a'} href="javascript:">立即注册</Link>
                </div>
            </div>
        )
    }
}

export default Index;