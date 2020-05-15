import React, {Component} from 'react';
import 'weui';
import axios from 'axios'
import './style.scss'
import {Link} from 'react-router-dom';
import qs from 'qs';

class Index extends Component {

    state={
        mobile:'',
        password:'',
        nickname:'',
        url:'',           // 验证码弹窗图片网址
        captcha_key:'',   // 图形验证码key
        captcha_code:'',  // 图形验证码内容
        access_key: '27949e2e0bd17f64a48baab97f9da39d',   // 公共参数
        s:'获取验证码',           // 倒计时
        flag:'true',            // 计时器判断，true时可以被点击，false不能被点击
        verification_key:'',    //短信验证码key
        verification_code:'',   // 短信验证码内容
    }

    componentDidMount(error, errorInfo){               // 显示图片验证码
        axios.post('https://www.it266.com/api/image/captcha')
            .then( (response) => {
                // console.log(response)
                this.setState({url:response.data.data.url,captcha_key:response.data.data.captcha_key})  // 安全验证的图片网址,key
            })
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

    isNickname=()=>{                                           // 判断昵称格式是否正确
        let res = this.state.nickname.match(/.{2}/);
        if(res === null && this.state.nickname !== ''){
            return (
                <span className={'false2'}>请输入至少两位的昵称</span>
            )
        }
    }

    // 倒计时
    setTime=()=>{
        let count = 60
        if(this.state.flag === 'true'){
            this.setState({flag:'flase'})
            this.time = setInterval(()=>{
                this.setState({s:count+'s'})
                count--
                if(count<0){
                    clearInterval(this.time)
                    this.setState({flag:'true'})
                    this.setState({s:'获取验证码'})
                    count = 60
                }},1000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.time)
    }

    getMessage=()=>{                      // 图片验证码验证获取手机短信
        let data = {
            access_key:this.state.access_key,
            mobile:this.state.mobile,
            captcha_key:this.state.captcha_key,
            captcha_code:this.state.captcha_code
        }

        if(this.state.captcha_code !== '' && this.state.flag === 'true'){
             this.setState({flag:'flase'})
            axios.post('https://www.it266.com/api/sms/verification',qs.stringify(data))
                .then( (response) => {
                    console.log(response)
                    if(response.data.status === true){
                        this.setState({verification_key:response.data.data.verificationKey})
                        // 计时器
                        {this.setTime()}
                        console.log(this.state.verification_key)
                        window.alert(response.data.data.message)
                    }else{
                        axios.post('https://www.it266.com/api/image/captcha')
                            .then( (response) => {
                                console.log(response)
                                this.setState({url:response.data.data.url,captcha_key:response.data.data.captcha_key})  // 安全验证的图片网址,key
                            })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    istrue=()=>{                                 // 手机短信验证码注册
        let data = {
            mobile:this.state.mobile,
            password:this.state.password,
            nickname:this.state.nickname,
            verification_key:this.state.verification_key,
            verification_code:this.state.verification_code
        }

        if(this.state.verification_code !== ''){
            axios.post('https://www.it266.com/api/customer/create?access_key='+this.state.access_key,qs.stringify(data))
                .then((response) =>{
                    console.log(response)
                    window.localStorage.setItem('token',response.data.data.token)
                    window.alert(response.data.data.message)
                    this.props.history.push('/login')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            window.alert('请输入验证码')
        }
    }

    render() {
        return (
            <div className={'Register'}>
                <div className="top">
                    注册
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
                                        <input autoFocus className="weui-input" type="text" pattern="[0-9]*"
                                               id="js_input" placeholder="输入昵称"
                                               onChange={(e)=>{
                                                   this.setState({nickname: e.target.value})
                                               }}
                                        />
                                    </div>
                                    <div className="weui-cell__ft">
                                        <a className="weui-btn_reset weui-btn_icon">
                                            <span className={'iconfont'}>&#xe602;</span>
                                        </a>
                                    </div>
                                    {this.isNickname()}
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
                                <div className="weui-cell weui-cell_active weui-cell_vcode">
                                    <div className="weui-cell__bd">
                                        <input autoFocus className="weui-input" type="password"
                                               id="js_input" placeholder="输入图片验证码"
                                               onChange={(e)=>{
                                                   this.setState({captcha_code: e.target.value})
                                               }}
                                        />
                                    </div>
                                    <div className={'img-yan'}>
                                        <img src={this.state.url} onClick={()=>{
                                            axios.post('https://www.it266.com/api/image/captcha')
                                                .then( (response) => {
                                                    // console.log(response)
                                                    this.setState({url:response.data.data.url,captcha_key:response.data.data.captcha_key})  // 安全验证的图片网址,key
                                                })
                                        }}/>
                                    </div>
                                </div>
                                <div className="weui-cell weui-cell_active weui-cell_vcode">
                                    <div className="weui-cell__bd">
                                        <input autoFocus className="weui-input" type="text" pattern="[0-9]*"
                                               id="js_input" placeholder="输入短信验证码" maxLength="6"
                                               onChange={(e)=>{
                                                   this.setState({verification_code:e.target.value})
                                               }}
                                        />
                                    </div>
                                    <div className="weui-cell__ft">
                                        <button className="weui-btn weui-btn_default weui-vcode-btn"
                                                onClick={this.getMessage}
                                        >
                                            {this.state.s}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="weui-cells__tips"><a className="weui-link" href="javascript:">收不到验证码?</a>
                            </div>
                        </div>
                    </div>
                    <div className="weui-form__tips-area">
                        <label id="weuiAgree" htmlFor="weuiAgreeCheckbox" className="weui-agree">
                            <input id="weuiAgreeCheckbox" type="checkbox" className="weui-agree__checkbox"/>
                            <span className="weui-agree__text">阅读并同意<a href="javascript:">《相关条款》</a> </span>
                        </label>
                    </div>
                    <div className="weui-form__opr-area">
                        <a className="weui-btn weui-btn_primary"
                                href="javascript:"
                                id="showTooltips"
                                onClick={this.istrue}
                        >立即注册</a>
                    </div>
                </div>
                <div className={'last'}>
                    我有账号 <Link to={'/login'} className={'last-a'}>立即登录</Link>
                </div>
            </div>
        )
    }
}

export default Index;