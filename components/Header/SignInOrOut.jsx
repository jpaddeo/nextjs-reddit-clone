import { signIn, signOut, useSession } from 'next-auth/react'

import Image from 'next/image'

import { ChevronDownIcon } from '@heroicons/react/solid'

function SignInOrOut() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div
        className="hidden cursor-pointer items-center space-x-2 border-gray-100 p-2 lg:flex"
        onClick={() => signOut()}
      >
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="https://surl.jpaddeo.xyz/mjlcamq"
            layout="fill"
            objectFit="contain"
            alt="Reddit Logo"
          />
        </div>
        <div className="flex-1 text-xs">
          <p className="truncate">{session?.user?.name}</p>
          <p className="text-gray-400">Sign Out</p>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </div>
    )
  } else {
    return (
      <div
        className="hidden cursor-pointer items-center space-x-2 border-gray-100 p-2 lg:flex"
        onClick={() => signIn()}
      >
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="https://surl.jpaddeo.xyz/mjlcamq"
            layout="fill"
            objectFit="contain"
            alt="Reddit Logo"
          />
        </div>
        <p className="text-gray-400">Sign In</p>
      </div>
    )
  }
}

export default SignInOrOut
