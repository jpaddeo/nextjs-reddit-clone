import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
      <Link href="/">
        <Image
          src="https://surl.jpaddeo.xyz/8vjh0va"
          layout="fill"
          objectFit="contain"
        />
      </Link>
    </div>
  )
}
export default Logo
