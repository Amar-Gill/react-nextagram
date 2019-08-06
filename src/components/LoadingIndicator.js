import React from 'react'
import loadingGif from './loading.gif'


const LoadingIndicator = ({ size, style }) => {
    return (
        <img style={{ height: `${size}`, ...style }} src={loadingGif} alt='LoadingIndicator' />
    )
}

export default LoadingIndicator;