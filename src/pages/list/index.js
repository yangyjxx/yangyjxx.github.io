import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import 'weui';
import rili from '../../imgs/rili.png'
import time from "../../imgs/time.png"
import quanbu from "../../imgs/quanbu.png"
import axios from 'axios';
import qs from 'qs';

class Index extends Component {

    state={
        page:'',        //当前页码 默认1
        status: '',     //状态  0全部 1未完成 2已完成 默认0
        page_size:'',   //每⻚记录数 最⼤100 默认20
        sortby:'id',      //排序字段:id finish_at
        order:'desc',        //排序方式: asc升 desc降
        item_count:'',  //总计量数
        created_at:'',
        length1:'',
        i:'',
        i3:'',
    }

    componentDidMount=()=> {
        let data = {
            page:this.state.page,
            status:this.state.status,
            page_size:this.state.page_size,
            sortby:this.state.sortby,
            order:this.state.order
        }

        let token = window.localStorage.getItem('token')

        axios.get('https://www.it266.com/app/todo?token='+token, qs.stringify(data))
            .then((result) => {
                // console.log(result)
                this.setState({articles:result.data.data.data,item_count:result.data.data.page.item_count})
                // console.log(this.state.articles)
                let i2 = 0
                let i4 = 0
                this.state.articles.map((item)=>{
                        let ttime = Number(item.created_at.replace(/-/g,'').substr(0,8))
                        let day =  new Date();
                        let gy = day.getFullYear()
                        let gm = day.getMonth()+1
                        if(gm<10){gm = `0` + gm}
                        let gd = day.getDate()
                        if(gd<10){gd = `0` + gd}
                        let gtime = Number(gy+gm+gd)

                        if(ttime>=gtime){
                            i2++
                            this.setState({i:i2})
                        }else{
                            i4++
                            this.setState({i3:i4})
                        }
                    }
                )
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    render() {
        return (
            <div className={'List'}>
                <div className="top">
                    <div className={'top-div-2'}>
                        <Link className={'iconfont'} to={'/pages/me'}>&#xe606;</Link>
                    </div>
                </div>

                <div className="page__bd">
                    <div className="weui-search-bar" id="searchBar">
                        <form className="weui-search-bar__form">
                            <div className="weui-search-bar__box">
                                <i className="weui-icon-search"></i>
                                <input type="search" className="weui-search-bar__input" placeholder="搜索"/>
                                <a className="weui-icon-clear"></a>
                            </div>
                            <label className="weui-search-bar__label" id="searchText">
                                <i className="weui-icon-search"></i>
                                <span>搜索</span>
                            </label>
                        </form>
                    </div>
                </div>

                <div className="weui-flex smallbox">
                    <div className="weui-flex__item">
                        <Link className={'link1'} to={'/pages/today'}>
                            <div className="placeholder">
                                <img src={rili} />
                                <span>{this.state.i}</span>
                            </div>
                            <div className="placeholder">
                                今天
                            </div>
                        </Link>
                    </div>
                    <div className="weui-flex__item">
                        <Link className={'link1'}>
                            <div className="placeholder">
                                <img src={time} />
                                <span>1</span>
                            </div>
                            <div className="placeholder">
                                计划
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="weui-flex smallbox">
                    <div className="weui-flex__item">
                        <Link to={'/pages/alllist'} className={'link1'}>
                        <div className="placeholder">
                            <img src={quanbu} alt=""/>
                            <span>{this.state.item_count}</span>
                        </div>
                        <div className="placeholder">
                            全部
                        </div>
                        </Link>
                    </div>
                    <div className="weui-flex__item">
                        <Link to={'/pages/complete'} className={'link1'}>
                        <div className="placeholder">
                            <img src={time} alt=""/>
                            <span>{this.state.i3}</span>
                        </div>
                        <div className="placeholder">
                            完成
                        </div>
                        </Link>
                    </div>
                </div>

                <Link to="/pages/create" className="add">
                    添加提醒
                </Link>
            </div>
        )
    }
}

export default Index;