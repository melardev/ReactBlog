import React from "react";
import {NavLink} from "react-router-dom";

class ArticleSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            classNames: ['badge badge-dark', 'badge badge-secondary', 'badge badge-light', 'badge badge-info']
        }
    }

    render() {
        const article = this.props.article;
        return (
            <div className="card mb-4">
                <img className="card-img-top" src="http://placehold.it/750x300" alt="Card image cap"/>
                <div className="card-body">
                    <h2 className="card-title">{article.title}</h2>
                    <p className="card-text">{article.description}</p>
                    <NavLink to={'/articles/' + article.slug} className="btn btn-primary">
                        Read More &rarr;
                    </NavLink>
                </div>
                <div className="card-footer text-muted">
                    By&nbsp;
                    <NavLink to={'/by_author/' + article.user.username}
                             params={{
                                 id: article.user.id,
                                 username: article.user.username
                             }}>
                        {article.user.username}
                    </NavLink>
                    <br/>
                    {article.tags.map((tag, index) => {
                        return (
                            <NavLink key={index} to={'/articles/by_tag/' + tag.slug}
                                     className={this.state.classNames[index % 4]}>{tag.name}</NavLink>
                        )
                    })}

                    {article.categories.map((category, index) => {
                        return (
                            <NavLink key={index} to={'/articles/by_category/' + category.slug}> <span
                                className="badge badge-secondary">{category.name}</span></NavLink>
                        )
                    })}
                    <div style={{float: 'right'}}>
                        {article.comments_count} <i className="fa fa-comments"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleSummary;
