import React, { Fragment } from 'react'

const SplitText = ({children}) => {
  if (!children) {
    return null
  }

  const splitted = children.split('\n')

  return <Fragment>
    {splitted.map((item, index) => {
      if (item.length === 0) {
        return <br key={index}/>
      } else if (splitted.length - 1 === index) {
        return <span key={index}>{item}</span>
      } else {
        return <span key={index}>{item}<br/></span>
      }
    })}
  </Fragment>
}

export default SplitText