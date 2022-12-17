import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={{ display: `${visible ? 'none' : ''}` }}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div className='togglableContent' style={{ display: `${visible ? '' : 'none'}` }}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
