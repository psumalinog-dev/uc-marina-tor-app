import { Component } from "react";
import { getNotifications } from "../../services/notificationService";

class NotificationBadge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unreadCount: 0,
        };
    }

    componentDidMount() {
        this.loadNotifications();

        this.interval = setInterval(() => {
            this.loadNotifications();
        }, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadNotifications = async () => {
        const { userId } = this.props;

        if (!userId) return;

        try {
            const notifications = await getNotifications(userId);

            const unreadCount = notifications.filter(
                notification => !notification.isRead
            ).length;

            this.setState({
                unreadCount,
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { unreadCount } = this.state;

        if (unreadCount === 0) {
            return null;
        }

        return (
            <span
                className="badge bg-danger rounded-pill ms-2"
                style={{
                    minWidth: "24px",
                    fontSize: "12px",
                }}
            >
                {unreadCount}
            </span>
        );
    }
}

export default NotificationBadge;