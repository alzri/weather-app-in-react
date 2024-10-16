import React from "react";
import { NotificationProps } from "./NotificationProps.types";

const Notification: React.FC<NotificationProps> = ({message}) => {
    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    )
};

export default Notification;