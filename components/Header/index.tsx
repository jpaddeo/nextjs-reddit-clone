import React from 'react'
import Image from 'next/image'

import Logo from './Logo'
import HomeMenu from './HomeMenu'
import SearchBar from './SearchBar'
import Icons from './Icons'
import SignInOrOut from './SignInOrOut'

function Header() {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <Logo />
      <HomeMenu />
      <SearchBar />
      <Icons />
      <SignInOrOut />
    </div>
  )
}

export default Header
