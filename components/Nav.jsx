import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between w-full mb-4 px-8 py-4">
      <Link href={"/"} className="font-bold text-2xl">
        Crud Next.js App
      </Link>

      <div>
        <Link href={"/users"} className="mr-4">
          Users List
        </Link>
        <Link href={"/users/create"} className="mr-4">
          Create User
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
