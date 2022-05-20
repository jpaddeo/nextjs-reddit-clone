import { ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'

function HomeMenu() {
  return (
    <div className="mx-7 flex items-center xl:min-w-[300px]">
      <HomeIcon className="h-5 w-5" />
      <p className="ml-2 hidden flex-1 lg:inline">Home</p>
      <ChevronDownIcon className="h-5 w-5" />
    </div>
  )
}

export default HomeMenu
