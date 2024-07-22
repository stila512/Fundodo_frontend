import React from 'react'
import PropTypes from 'prop-types'

export default function FddBtn({ text = '人家是按鈕', callback = () => {} }) {
  return <button onClick={() => callback()}>{text}</button>
}

FddBtn.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}
