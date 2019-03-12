import React from "react";
import swal from 'sweetalert2'
import {NotificationService} from '../../services/local/NotificationService'
import {ToastContainer, toast} from 'react-toastify';

class Notifications extends React.Component {

    state = {
        show_alert: false,
        alert: {
            message: '',
            type: ''
        }
    };

    componentWillMount() {
        NotificationService.subscribe(this.onNotificationReceived);
    }

    onNotificationReceived(message) {
        if (message.show_toast) {
            toast(<div className={message.toast.class_name || "alert alert-success"}>
                <span>{message.toast.title || 'Message'}</span>: {message.toast.message}</div>, {
                closeButton: false // Remove the super ugly close button that ships by default
            });
        } else if (message.show_alert)
            this.setState({show_alert: true})
    }

    componentWillUnmount() {
        NotificationService.unsubscribe(this.onNotificationReceived);
    }

    render() {
        if (this.state.show_alert) {
            let type = 'info';
            const classname = this.state.alert.type;
            if (classname.indexOf('success') !== -1)
                type = 'success';
            else if (classname.indexOf('error') !== -1 || classname.indexOf('danger') !== -1)
                type = 'error';
            else
                type = 'info';

            swal.fire({
                title: 'Notification',
                text: this.props.toast.message,
                type,
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: false,
                timer: 4000
            });
        } else if (this.state.alert.message !== "") {
            debugger
        } else if (this.state.is_loading) {

        }

        return (
            // blog post has been created navogate to index
            // we navigate by calling this.context.router.push with
            // the new path to navigate to.
            // TOdo show snackbar or dialog
            // Remove the below, its copyright
            <ToastContainer
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        );

        /*  <div className={this.state.message.className}>
                     {this.state.message.message}
                 </div>
                 */
    }
}


export default Notifications;