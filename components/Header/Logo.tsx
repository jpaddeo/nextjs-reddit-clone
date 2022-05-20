import Image from 'next/image'

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
export default Logo
