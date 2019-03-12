import React from "react";
import {ArticleAxiosService} from "../../services/remote/ArticleAxiosService";
import ArticleSummary from "./partials/ArticleSummary";
import TagOrCategoryListCard from "../tags_categories/TagOrCategoryListCard";
import Pagination from "../shared/Pagination";


class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page_meta: {},
            title: 'Articles'
        };
    }

    onUrlChanged(location, action) {
        // we can force re-rendering with
        // this.forceUpdate();
        // or with
        // this.setState(this.state);
        if (this.props.location !== location) {
            this.loadArticles(location);
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen(this.onUrlChanged.bind(this));
        this.loadArticles(this.props.location);
    }

    loadArticles(location, page = 1, page_size = 5) {
        const pageRequest = {page, page_size};
        // Please notice why is important to understand difference between props.match.path vs props.location.pathname
        // since this component is mapped to an array, props.match.path is an array, location.pathname is always a string!
        if (location.pathname === '/articles') {
            this.fetchArticles(pageRequest);
            this.setState({
                title: 'Newest Articles'
            });
        } else if (location.pathname.startsWith('/articles/by_tag')) {
            // ERROR: this.props.match is pointing to the previous URL!!
            // this.props.fetchArticles({tag: this.props.match.params.tag_slug});
            let slug = location.pathname.split("/", 4)[3];
            this.fetchArticles({...pageRequest, tag: slug});
            this.setState({
                title: slug + ' Articles'
            });
        } else if (location.pathname.startsWith('/articles/by_category')) {
            let slug = location.pathname.split("/", 4)[3];
            this.fetchArticles({...pageRequest, category: slug});
            this.setState({
                title: slug + ' Articles'
            });
        } else if (location.pathname.indexOf('by_author') !== -1) {
            let slug = location.pathname.split("/", 4)[3];
            this.fetchArticles({...pageRequest, author: slug});
            this.setState({
                title: slug + ' Articles'
            });
        } else {
            this.fetchArticles(pageRequest);
            this.setState({
                title: 'Newest Articles'
            });
        }
    }

    fetchArticles(query) {
        ArticleAxiosService.fetchAll(query).then(res => {
            this.setState({
                page_meta: res.data.page_meta,
                articles: res.data.articles
            });
        }).catch(err => {
            debugger;
            console.error(err);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <div className="container row">
                <div className="col-md-8">

                    <h1 className="my-4">
                        {this.state.title}
                    </h1>

                    {this.state.articles.map((article, index) => {
                        return <ArticleSummary key={index} article={article}/>
                    })}

                    <Pagination loadMore={this.loadArticles.bind(this)} pageMeta={this.state.page_meta}/>
                    <br/>
                    <br/>
                </div>
                <div className="col-md-4">
                    {/*Search Widget*/}
                    <div className="card my-4">
                        <h5 className="card-header">Search</h5>
                        <div className="card-body">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for..."/>
                                <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">Go!</button>
              </span>
                            </div>
                        </div>
                    </div>

                    <TagOrCategoryListCard type="tag"/>
                    <TagOrCategoryListCard type="category"/>

                    {/*<!-- Side Widget -->*/}
                    <div className="card my-4">
                        <h5 className="card-header">Side Widget</h5>
                        <div className="card-body">
                            You can put anything you want inside of these side widgets. They are easy to use, and
                            feature the new Bootstrap 4 card containers!
                        </div>
                    </div>
                </div>
            </div>);
    }
}


export default ArticleList;
