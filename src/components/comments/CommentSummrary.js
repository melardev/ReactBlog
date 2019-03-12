import React from "react";

class CommentSummrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comment: {}};
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.comment.user.username}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.comment.created_at}</h5>
                    <p className="card-text">{this.props.comment.content}</p>
                </div>
            </div>
        );
    }
}

export default CommentSummrary;