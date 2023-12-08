import { getServerSession } from "next-auth";
import Link from "next/link";
import {options} from "../api/auth/[...nextauth]/options";
async function Nav() {
  const session = await getServerSession(options);

  return (
    <header className="bg-secondary text-light">
      <nav className="d-flex justify-content-around align-items-center w-full px-10 py-4">
        <div className=" fs-5">My Site</div>
        <div className="d-flex justify-content-between">
          <Link href="/" className="mx-3 text-light text-decoration-none fs-5">
            Home
          </Link>
          <Link
            href="/createUser"
            className="mx-3 text-light text-decoration-none fs-5"
          >
            Create User
          </Link>
          <Link
            href="/clientMember"
            className="mx-3 text-light text-decoration-none fs-5"
          >
            Client Member
          </Link>
          <Link
            href="/member"
            className="mx-3 text-light text-decoration-none fs-5"
          >
            Member
          </Link>
          <Link
            href="/public"
            className="mx-3 text-light text-decoration-none fs-5"
          >
            Public
          </Link>
          {session?<Link href={`/api/auth/signout?callbackUrl=/`}  className="mx-3 text-light text-decoration-none fs-5">Logout</Link> :<Link href={`/api/auth/signin`}  className="mx-3 text-light text-decoration-none fs-5">Login</Link>}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
