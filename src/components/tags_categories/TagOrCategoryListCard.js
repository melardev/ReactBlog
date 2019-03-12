import React from "react";
import {NavLink} from "react-router-dom";
import {NotificationService} from "../../services/local/NotificationService";
import {TagsAxiosService} from "../../services/remote/TagsAxiosService";
import {CategoriesAxiosService} from "../../services/remote/CategoriesAxiosService";

class TagOrCategoryListCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        if (this.props.type === 'tag')
            this.fetchTags();
        else
            this.fetchCategories();
    }

    fetchTags() {
        console.trace('TagActionCreator::fetchTags_Async');
        NotificationService.setIsLoading(true);
        // NotificationService.dispatch('Loading tags');
        TagsAxiosService.fetchAll().then(res => {
            NotificationService.setIsLoading(false);
            if (res.data.success)
                this.setState({items: res.data.tags});
            else
                NotificationService.dispatch(res.data.full_messages ? res.data.full_messages : 'An error occurred');
        }).catch(err => {
            NotificationService.setIsLoading(false);
            console.error(err);
        });
    }

    fetchCategories() {
        console.trace('TagActionCreator::fetchTags_Async');
        NotificationService.setIsLoading(true);
        // NotificationService.dispatch('Loading categories');
        CategoriesAxiosService.fetchAll().then(res => {
            NotificationService.setIsLoading(false);
            if (res.data.success)
                this.setState({items: res.data.categories});
            else
                NotificationService.dispatch(res.data.full_messages ? res.data.full_messages : 'An error occurred');
        }).catch(err => {
            NotificationService.setIsLoading(false);
            console.error(err);
        });
    }

    render() {
        const title = this.props.type === 'tag' ? 'Tags' : 'Categories';
        const prefixUrl = this.props.type === 'tag' ? '/articles/by_tag/' : '/articles/by_category/';
        return (
            <div className="card my-4">
                <h5 className="card-header">{title}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="list-unstyled mb-0">
                                {this.state.items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <NavLink to={prefixUrl + item.slug}>{item.name}</NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TagOrCategoryListCard;