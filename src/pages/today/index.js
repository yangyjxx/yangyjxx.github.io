import React, {Component} from 'react';
import './style.scss'
import {Link} from 'react-router-dom'
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
        id:'',
        name:'',
        created_at:'',
        finish_at:'',
        articles: [],
    }

    componentDidMount=()=> {
        this.getList()
    }

    getList=()=>{
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
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    render(){
        return (
            <div className={'Alllist'}>
                <div className={'top'}>
                    <Link className={'top_icon'} to={'/pages'} ></Link>
                    今天
                </div>
                <div className={'list'}>
                    <div className={'list_title'}>
                        今天任务
                    </div>
                    <div className={'list_box'}>
                        <div className={'weui-cells'}>
                            {this.state.articles.map((item)=>{
                                let ttime = Number(item.created_at.replace(/-/g,'').substr(0,8))
                                let day =  new Date();
                                let gy = day.getFullYear()
                                let gm = day.getMonth()+1
                                if(gm<10){gm = `0` + gm}
                                let gd = day.getDate()
                                if(gd<10){gd = `0` + gd}
                                let gtime = Number(gy+gm+gd)
                                if(ttime>=gtime){
                                    return (
                                        <div className={'weui-cell weui-cell_example'}>
                                            <div className={'weui-cell__hd'}>
                                                <div className="id" style={{}}>{item.id}</div>
                                            </div>
                                            <div className={'weui-cell__bd'}>
                                                <p>{item.name}</p>
                                            </div>
                                            <div className={'weui-cell__ft'}>
                                                {item.created_at}
                                                <div className={'more_text'} style={{display:this.state.display}}>
                                                    <Link className={'aa'} to={"/pages/edit/"+ item.id}></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;