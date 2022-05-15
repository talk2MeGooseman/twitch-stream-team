import React from 'react'
import Textfit from 'react-textfit'

export const TextBanner = ({ text, style }) => (
  <h1 style={style}>
    <Textfit max={24} mode="single">
      {text}
    </Textfit>
  </h1>
)
