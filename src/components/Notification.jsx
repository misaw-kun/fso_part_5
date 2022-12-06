import React from 'react';

const notificationStyles = {
  backgroundColor: 'whitesmoke',
  border: '5px dashed red',
  fontFamily: 'monospace',
  width: '50vw',
  marginBottom: '2%',
};

const Notification = ({ message, isError }) => {
  return isError ? (
    <div style={{ ...notificationStyles }}>
      <h2 style={{ margin: 0 }}>{message}</h2>
    </div>
  ) : (
    <div style={{ ...notificationStyles, border: '5px dashed green' }}>
      <h2 style={{ margin: 0 }}>{message}</h2>
    </div>
  );
};

export default Notification;
