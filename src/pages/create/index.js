import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './style.scss';
import 'weui';
import qs from 'qs';
import axios from 'axios'

class Index extends Component {
    state={
        // token:window.localStorage.getItem("token"),
        name:'',          // 事项说明
        remind_at:'',     // 提醒时间 格式 yyyy-mm-dd hh:ii:ss
        repeat:'0',        // 重复(0不重复 1每天 2每周 3每⽉ 4每季度 5每年)
        y:'',
        m:'',
        d:'',
        h:'',
        i:'',
        s:'',
    }

    componentDidMount() {
        let today = new Date()
        let y2 = today.getFullYear().toString().substr(2)
        this.setState({y:y2})
        let m2 = today.getMonth()+1
        if(m2<10){
            m2 = `0` + m2
        }
        this.setState({m:m2})
        let d2 = today.getDate()
        if(d2<10){
            d2 = `0` + d2
        }
        this.setState({d:d2})
        let h2 = today.getHours()
        if(h2<10){
            h2 = `0` + h2
        }
        this.setState({h:h2})
        let i2 = today.getMinutes()
        if(i2<10){
            i2 = `0` + i2
        }
        this.setState({i:i2})
        let s2 = today.getSeconds()
        if(s2<10){
            s2 = `0` + s2
        }
        this.setState({s:s2})
    }

    over=()=>{
        let data={
            name: this.state.name,
            repeat: this.state.repeat,
            remind_at:this.state.y+`-`+this.state.m+`-`+this.state.d+` `+this.state.h+`:`+this.state.i+`:`+this.state.s
        }
        // console.log(data)
        let token=window.localStorage.getItem("token")
        axios.post('https://www.it266.com/app/todo/create?token='+token, qs.stringify(data))
            .then((response)=>{
                // console.log(response)
                if(response.data.status){
                    this.props.history.replace("/pages")
                }else{
                    alert(response.data.data)
                }
            })
    }

    render() {
        return (
            <div className={'Create'}>
                <div className={'top'}>
                    <Link to={'/pages'} className={'top_icon'}></Link>
                    <span>新增事项</span>
                    <Link className={'top_link'} onClick={this.over}>完成</Link>
                </div>

                <div className="weui-cells input_list">
                    <div className="weui-cell input_list1">
                        <div className="weui-cell__bd">
                            <input type="text" className={'weui-input'} placeholder={'提醒名称'}
                                   onChange={(e) =>{
                                       this.setState({name:e.target.value})
                                   }}
                            />
                        </div>
                    </div>
                </div>

                <div className="weui-cells weui-cells_form input_time">
                    <div className="weui-cell weui-cell_active weui-cell_switch">
                        <div className="weui-cell__bd">在指定日期提醒我</div>
                        <div className="weui-cell__ft">
                            <input className="weui-switch" type="checkbox"/>
                        </div>
                    </div>
                    <div className="weui-cell weui-cell_active weui-cell_switch">
                        <div className="weui-cell__bd">闹钟</div>
                        <div className="input_time2">
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({y:e.target.value})}}
                                   value={this.state.y}/>/
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({m:e.target.value})}}
                                   value={this.state.m}/>/
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({d:e.target.value})}}
                                   value={this.state.d}/>&nbsp;
                            <input  className="set_time"
                                    onChange={(e)=>{this.setState({h:e.target.value})}}
                                    value={this.state.h}/>:
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({i:e.target.value})}}
                                   value={this.state.i}/>:
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({s:e.target.value})}}
                                   value={this.state.s}/>
                        </div>
                    </div>
                    <div className="weui-cell weui-cell_active weui-cell_access">
                        <div className="weui-cell__bd">重复</div>
                        <div className={'weui-cells weui-cells_split'}>
                            <div className={'weui-cell weui_cell_select reped_box'}>
                                <select className={'weui-select'} onChange={(e)=>{this.setState({repeat:e.target.value})}}>
                                    <option value='0'>不重复</option>
                                    <option value='1'>每天</option>
                                    <option value='2'>每周</option>
                                    <option value='3'>每月</option>
                                    <option value='4'>每季度</option>
                                    <option value='5'>每年</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;