import React from 'react';
import './NotificationBadge.css'; // You need to create this CSS file

const NotificationBadge = ({ count }) => {
  return (
    <div className="notification-badge">
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
};

export default NotificationBadge;
