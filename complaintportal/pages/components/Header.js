import React from 'react'
import {ConnectWallet} from "@thirdweb-dev/react";

const Header = () => {
  return (
    <div className='header-container'>
        <h1 className='header-logo'>FIR Portal</h1>
        <ConnectWallet accentColor='orange' colorMode='light'/>

    </div>
  )
}

export default Header