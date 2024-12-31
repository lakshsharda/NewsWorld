import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: "general",
  };
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string, // Ensure apiKey prop is passed in
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { country, category, pageSize, apiKey } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${this.state.page}`;
    
    this.setState({ loading: true });
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 }, this.fetchNews);
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 }, this.fetchNews);
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsWorld-Top Headlines</h1>

        {this.state.loading && <Loading />}

        <div className="row">
          {!this.state.loading && this.state.articles
            .filter((element) =>
              element.title && element.description && element.urlToImage && element.url
            )
            .map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
