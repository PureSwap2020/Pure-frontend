import React, { Component, useEffect } from 'react'

import './index.scss'
import { useIFO } from '../../hook'

const IFOCard = (props) => {
  const {ifo} = props
  const [info] = useIFO(ifo)

  useEffect(() => {
    console.log(info)
  }, [info])

  return  (
    <div className="info">
      <div className="item">11</div>
    </div>
  )
}
export default IFOCard