import React from 'react'
import PropTypes from 'prop-types'

const notificationStyles = {
  backgroundColor: 'whitesmoke',
  border: '5px dashed red',
  fontFamily: 'monospace',
  width: '50vw',
  marginBottom: '2%',
}

const Notification = ({ message, isError }) => {
  return isError ? (
    <div className='notif' style={{ ...notificationStyles }}>
      <h2 style={{ margin: 0 }}>{message}</h2>
    </div>
  ) : (
    <div className='notif' style={{ ...notificationStyles, border: '5px dashed green' }}>
      <h2 style={{ margin: 0 }}>{message}</h2>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool
}

export default Notification
