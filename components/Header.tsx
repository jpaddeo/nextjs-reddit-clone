import React from 'react'
import Image from 'next/image'

import { ChevronDownIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid'
import { StarIcon } from '@heroicons/react/outline'

function Logo() {
  return (
    <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
      <Image
        src="https://surl.jpaddeo.xyz/8vjh0va"
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}

function HomeControl() {
  return (
    <div className="mx-7 flex items-center xl:min-w-[300px]">
      <HomeIcon className="h-5 w-5" />
      <p className="ml-2 hidden flex-1 lg:inline">Home</p>
      <ChevronDownIcon className="h-5 w-5" />
    </div>
  )
}

function Header() {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <Logo />
      <HomeControl />
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search reddit..."
        />
        <button hidden></button>
      </form>
    </div>
  )
}

export default Header
