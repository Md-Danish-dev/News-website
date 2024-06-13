import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
     static defaultProps ={
      country:'in',
      pageSize:9,
      category:'general'
     }

     static propTypes ={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
     }
     
    constructor(props){
        super(props);
        
        this.state={
            articles: [],
            loading: true,
            page:1,
            totalResults:0
            
        }
        document.title=`${this.capitalizeFLetter(this.props.category)} - NewsMonkey`
    }
    capitalizeFLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async updateNews(){
      this.props.setProgress(10);
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let  url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d02eb306c5de4cfd84ba8686d0cf51ae&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        this.props.setProgress(30);
        let data=await fetch(url);
        let parseData=await data.json();
        this.props.setProgress(70);
        console.log(parseData);
        this.setState({
          articles: parseData.articles, 
          totalResults:parseData.totalResults,
          loading:false
        })}
        this.props.setProgress(100);
    }

    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d02eb306c5de4cfd84ba8686d0cf51ae&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data=await fetch(url);
      let parseData=await data.json();
      console.log(parseData);
      this.setState({articles: parseData.articles,
        totalResults:parseData.totalResults,
        loading:false})
      // this.updateNews();

    }

    handlePrevClick= async ()=>{
      //console.log('previous');
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d02eb306c5de4cfd84ba8686d0cf51ae&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data=await fetch(url);
      // let parseData=await data.json();
      // console.log(parseData);
      
      // this.setState({
      //   page:this.state.page - 1,
      //   articles: parseData.articles,
      //   loading:false
      // })
      this.setState({
        page: this.state.page -1
      });
      this.updateNews();
    }

    handleNextClick= async ()=>{
      // console.log('next');
      // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      // let  url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d02eb306c5de4cfd84ba8686d0cf51ae&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true})
      // let data=await fetch(url);
      // let parseData=await data.json();
      // console.log(parseData);
      // this.setState({
      //   page:this.state.page + 1,
      //   articles: parseData.articles,
      //   loading:false
      // })}
      this.setState({
        page: this.state.page +1
      });
      this.updateNews();
    }
    fetchMoreData=async()=>{
      this.setState({page:this.state.page+1})
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let  url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d02eb306c5de4cfd84ba8686d0cf51ae&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({
          articles: this.state.articles.concat(parseData.articles),
          totalResults:parseData.totalResults,
         
        })}
    }
  render() {
    return (
      
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'30px'}}>NewsMonkey - Top {this.capitalizeFLetter(this.props.category)} Headlines </h2>
        
        {this.state.loading && <Spinner/>}
        

        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner></Spinner>}
          >
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} channel={element.source.name}/>
            </div>
            })}
            
            </div>
            </div>
        </InfiniteScroll>    
            {/* <div className="container d-flex justify-content-between my-4">
            {!this.state.loading &&<button type="button" disabled={this.state.page<=1} className="btn btn-info" onClick={this.handlePrevClick}>&larr; previous</button>}
        {!this.state.loading && <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>next &rarr;</button>}
        </div> */}
      </div>
    )
  }
}

export default News;
