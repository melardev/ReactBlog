import React from 'react';
import {NotificationService} from "../../services/local/NotificationService";
import {ArticleAxiosService} from "../../services/remote/ArticleAxiosService";
import './ArticleDetails.css'
import {NavLink} from "react-router-dom";
import {UserService} from "../../services/local/UsersService";
import {CommentAxiosService} from "../../services/remote/CommentAxiosService";
import {stripResponseMeta} from "../../utils/net.utils";

class ArticleDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            comment_data: '',
            is_authenticated: false,
        };
    }

    componentWillMount() {
        UserService.subscribe(this.onUserUpdated.bind(this));
        console.trace('ArticleActionCreator::fetchArticle_Async');
        NotificationService.setIsLoading(true);
        ArticleAxiosService.fetchBySlug(this.props.match.params.slug).then(res => {
            NotificationService.setIsLoading(false);
            if (res.data.success) {
                NotificationService.dispatch('article loaded successfully');
                this.setState({article: res.data});
            } else
                NotificationService.dispatch(res.data.full_messages ? res.data.full_messages : 'An error occurred');

        }).catch(err => {
            console.error(err);
            NotificationService.dispatch('It could not load the article, reason: ' + err.message);
        });
    }

    onUserUpdated(user) {
        this.setState({
            is_authenticated: user && !!user.username
        });
    }

    onDeleteClick() {
        this.props.deleteArticle(this.props.params.id)
            .then(() => {
                this.context.router.push('/');
            });
    }

    postComment() {

        CommentAxiosService.create(this.props.match.params.slug, this.state.comment_data).then(res => {
            const newState = {...this.state};
            newState.article.comments.push(stripResponseMeta(res.data));
            newState.comment_data = '';
            this.setState(newState);
        }).catch(err => {
            debugger;
        });
    }


    onCommentDataChanged(event) {
        this.setState({
            comment_data: event.target.value
        });
    }

    render() {
        const {article} = this.state;
        let image = {};
        // article has to be loaded
        if (!article.slug) {
            return <div>Loading...</div>
        }

        if (article.id) {
            return (
                <div className="post">
                    <div className="post-header">
                        <div className="post-header-profile">
                            <img src="/images/user_generic.png" alt="avatar image"/>
                        </div>
                        <div className="post-header-author">
                            <div className="post-header-author-name"><span
                                id="author-name">{article.user.username}</span></div>
                            <div className="post-header-post-summary"><span
                                id="post-description">{article.created_at}</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-description">
                        <div className="post-description-title">
                            <h1>{article.title}</h1>
                        </div>
                        <div className="post-description-subtitle">
                            <h2>{article.description}</h2>
                        </div>
                        {image.url &&
                        <div className="post-description-cover">
                            <img src={image.url} id="cover-photo" alt="article's featured image"/>
                        </div>
                        }
                    </div>
                    <div className="post-content">
                        {article.body}
                        <div className="post-content-tags">
                            <ul>
                                {article.tags.map((tag, index) => {
                                    return (<li key={index}>
                                        <NavLink to={`/articles/by_tag/${tag.slug}`}>{tag.name}</NavLink>
                                    </li>)
                                })}

                                {article.categories.map((category, index) => {
                                    return (<li key={index + article.tags.length}>
                                        <NavLink to={`/articles/by_category/${category.slug}`}>{category.name}</NavLink>
                                    </li>)
                                })}

                            </ul>
                        </div>
                        <div className="post-content-divider"/>
                    </div>

                    <div className="post-divider"/>
                    <div className="post-comment">
                        <div className="post-comment-header"><span>Comments</span></div>
                        {this.state.is_authenticated && <div className="post-comment-input">
                            <div className="post-comment-input-profile">
                                <img src="/images/user_generic.png"
                                     id="comment-profile" alt="user's profile image"/></div>
                            <div className="post-comment-input-field">
                                <textarea placeholder="Write a comment" onChange={this.onCommentDataChanged.bind(this)}
                                          value={this.state.comment_data}/>
                            </div>
                        </div>}
                        {this.state.is_authenticated && <div className="post-comment-button">
                            <button onClick={this.postComment.bind(this)}>Publish</button>
                        </div>}
                        {!this.state.is_authenticated && <div className="post-comment-button">
                            <NavLink className="btn btn-success" to="/login">Login</NavLink>
                            &nbsp;
                            <NavLink className="btn btn-info" to="/login">Register</NavLink>
                        </div>}
                        <div className="post-comment-container">
                            {this.state.article.comments.length > 0 && this.state.article.comments.map((comment, index) => {
                                return (<div key={index}
                                             className="post-comment-container-individual">
                                    <div className="post-comment-container-individual-profile">
                                        <img src="/images/user_generic.png" alt="user's profile image"/>
                                    </div>
                                    <div className="post-comment-container-individual-content">
                                        <div className="post-comment-container-individual-content-message">
                                            <p>
                                                <span id="comment-name">{comment.user.username}</span><br/>
                                                {comment.content}
                                            </p>
                                        </div>
                                        <div className="post-comment-container-individual-content-information"><span
                                            id="like">Date</span><span id="date">• {comment.created_at}</span></div>
                                    </div>
                                </div>);
                            })}

                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ArticleDetails;
