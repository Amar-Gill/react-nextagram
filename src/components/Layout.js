import React from 'react'

const NAVBAR_HEIGHT = '56px'

const layoutStyle = {
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
    marginTop: NAVBAR_HEIGHT
}

const Layout = props => {
    return (
        <div style={layoutStyle}>
            {props.children}
        </div>
    )
}

export default Layout