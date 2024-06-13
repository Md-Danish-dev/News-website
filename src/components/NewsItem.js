import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
      let   {title,description,imageUrl,newsUrl,author,date,channel} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning" style={{right:"0%"}}>{channel}</span>
        <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2024/05/19/1600x900/stock_1716102149469_1716102149692.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
       
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
        
      </div>
    )
  }
}
