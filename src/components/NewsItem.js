import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img
            src={
              !imageUrl
                ? "https://cdn.arstechnica.net/wp-content/uploads/2024/12/ars-best-games-not-2024-1152x648-1734465467.jpg"
                : imageUrl
            }
            alt="..."
          />
          <div className="card-body">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}
            </span>
    
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            {/* date ko as a object banaya or usse convert kia gmt me for better readablility */}
            <p className="class-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toUTCString()}
            </small></p>
            {/* target blank se we are able to open the link in new tab */}
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
