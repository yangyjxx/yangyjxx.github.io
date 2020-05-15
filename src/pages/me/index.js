import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import 'weui';
import axios from 'axios';
import qs from 'qs';

class Index extends Component {

    state={
        mobile:'',
        nickname:'',
        token:window.localStorage.getItem("token"),
    }

    componentDidMount() {
        axios.get('https://www.it266.com/api/customer/whoami?token='+this.state.token, qs.stringify(this.state))
            .then((response)=>{
                // console.log(response)
                this.setState({mobile:response.data.data.mobile})
                this.setState({nickname:response.data.data.nickname})
            })
    }

    render() {
        return (
            <div className={'Me'}>
                <div className={'top'}>
                    <Link to={'/pages'} className={'top_icon'}></Link>
                    个人信息
                    <Link className={'top_button'} to={'/login'}
                        onClick={()=>{window.localStorage.setItem('token','')}}
                    >退出账号</Link>
                </div>
                <div className={'kong'}></div>
                <div className="weui-cells">
                    <div className="weui-cell weui-cell_active weui-cell_access">
                        <div className="weui-cell__bd">
                            <span style={{verticalAlign: 'middle'}}>昵称</span>
                        </div>
                        <div className="weui-cell__ft">{this.state.nickname}</div>
                    </div>
                    <div className="weui-cell weui-cell_active weui-cell_access">
                        <div className="weui-cell__bd">
                            <span style={{verticalAlign: 'middle'}}>手机号码</span>
                        </div>
                        <div className="weui-cell__ft">{this.state.mobile}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;