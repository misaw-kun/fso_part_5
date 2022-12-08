import React, { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={{ display: `${visible ? '' : 'none'}` }}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div style={{ display: `${visible ? 'none' : ''}` }}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
