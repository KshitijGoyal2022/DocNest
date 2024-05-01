import Link from 'next/link'
import Image from 'next/image'

export default function AuthNavbar() {
  return (
    <div className="flex justify-between mx-4 my-2 bg-white shadow-sm">
      <div>
        <Link href="/">
          <Image
            className=" w-auto"
            src="/vsd_logo.png"
            alt="Your Company"
            height={40}
            width={40}
          />
        </Link>
      </div>
      <div>

      <Link href='/sign-in' className="ml-6 inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
        Sign In
      </Link>
      </div>
    </div>
  )
}
