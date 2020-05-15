import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import axios from 'axios';
import qs from "qs"

class Index extends Component {

    state={
        id:'',
        name:'',          // 事项说明
        repeat:'',        // 重复(0不重复 1每天 2每周 3每⽉ 4每季度 5每年)
        status:'',        // 状态: 1未完成 2已完成
        created_at:'',
        updated_at:'',
        remind_at:'',     // 提醒时间 格式 yyyy-mm-dd hh:ii:ss
        y:'',
        m:'',
        d:'',
        h:'',
        i:'',
        s:'',
        value:'',         // 显示的重复文字
    }

    componentDidMount() {                           // 获取详情显示在页面上
        let id = this.props.match.params.id
        let token = window.localStorage.getItem('token')

        axios.get( 'https://www.it266.com/app/todo/detail?id='+id+'&token='+token)
            .then((response)=>{
                // console.log(response)
                if(response.data.status){
                    this.setState({id:response.data.data.id})
                    this.setState({name:response.data.data.name})
                    this.setState({repeat:response.data.data.repeat})
                    this.setState({status:response.data.data.status})
                    this.setState({created_at:response.data.data.created_at})
                    this.setState({updated_at:response.data.data.updated_at})
                    this.setState({remind_at:response.data.data.remind_at})
                }
                this.setTime()
            })
    }

    setTime=()=>{
        let remind_at = this.state.remind_at
        let repeat = this.state.repeat

        let y2 = remind_at.substr(0,4)
        this.setState({y:y2})

        let m2 = remind_at.substr(5,2)
        this.setState({m:m2})

        let d2 = remind_at.substr(8,2)
        this.setState({d:d2})

        let h2 = remind_at.substr(11,2)
        this.setState({h:h2})

        let i2 = remind_at.substr(14,2)
        this.setState({i:i2})

        let s2 = remind_at.substr(17,2)
        this.setState({s:s2})

        if(repeat===0){
            this.setState({value:'不重复'})
        }else if(repeat===1){
            this.setState({value:'每天'})
        }else if(repeat===2){
            this.setState({value:'每周'})
        }else if(repeat===3){
            this.setState({value:'每⽉'})
        }else if(repeat===4){
            this.setState({value:'每季度'})
        }else if(repeat===5){
            this.setState({value:'每年'})
        }
    }

    new=()=>{
        let id = this.state.id;
        let token = window.localStorage.getItem("token")
        let data={
            name: this.state.name,
            repeat: this.state.repeat,
            remind_at:this.state.y+`-`+this.state.m+`-`+this.state.d+` `+this.state.h+`:`+this.state.i+`:`+this.state.s
        }

        axios.post('https://www.it266.com/app/todo/update?id='+id+'&token='+token,qs.stringify(data))
            .then((response)=>{
                if(response.data.status){
                    // console.log(response)
                    this.props.history.push("/pages")
                }else{
                    alert(response.data.data)
                }
            })
    }

    delete=()=>{
        let token = window.localStorage.getItem("token")
        let id = this.state.id
        if(window.confirm('确定要删除吗？')){
            axios.post('https://www.it266.com/app/todo/delete?token='+token+'&id='+id,qs.stringify(id))
                .then((response)=>{
                    console.log(response)
                    if(response.data.status){
                        console.log(response)
                        this.props.history.replace("/pages")
                    }else{
                        window.alert(response.data.data)
                    }
                })
        }
    }

    render() {
        return (
            <div className={'Edit'}>
                <div className={'top'}>
                    <Link to='/pages' className={'top_icon'}></Link>
                    详细信息
                    <span className={'top_button'}
                          onClick={this.new}
                    >完成</span>
                </div>

                <div className="weui-cells input_list">
                    <div className="weui-cell input_list1">
                        <div className="weui-cell__bd">
                            <input type="text" className={'weui-input'} placeholder={this.state.name}
                                   onChange={(e) =>{
                                       this.setState({name:e.target.value})
                                   }}
                            />
                        </div>
                    </div>
                </div>

                <div className="weui-cells weui-cells_form input_time">
                    <div className="weui-cell weui-cell_active weui-cell_switch">
                        <div className="weui-cell__bd">创建时间</div>
                        <div className="input_time1">
                            {this.state.created_at}
                        </div>
                    </div>
                    <div className="weui-cell weui-cell_active weui-cell_switch">
                        <div className="weui-cell__bd">提醒时间</div>
                        <div className="input_time2">
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({y:e.target.value})}}
                                   value={this.state.y}/>-
                            <input className="set_time"
                                   onChange={(e)=>{this.setState({m:e.target.value})}}
                                   value={this.state.m}/>-
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
                                    <option value=''>{this.state.value}</option>
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
                <div className={'shan'} onClick={this.delete}>删除</div>
            </div>
        );
    }
}

export default Index;