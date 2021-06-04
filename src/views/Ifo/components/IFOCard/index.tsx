import React, { Component } from 'react'

import './index.scss'
import { useIFO } from '../../hook'

const IFOCard = (ifo) => {
  const info = useIFO(ifo)
  return  (
    <div className="info">
      <div className="item">11</div>
    </div>
  )
}
export default IFOCard