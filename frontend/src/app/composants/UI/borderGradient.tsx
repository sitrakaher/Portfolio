import React, { Children } from 'react'

interface Props {
    children : React.ReactNode;
}

const BorderGradient = ({Children}: Props) => {
  return (
    <div className='p-1 bg-linear-to-r from-cyan-800 to-cyan-300 rounded'>
    <div className='bg-white p-6 rounded'>
        {Children}
    </div>
    </div>
  )
}

export default BorderGradient