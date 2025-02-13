import Link from "next/link";

const Navbar = () => {
    return ( 
        <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users/create">Create User</Link>
          </li>
        </ul>
      </nav>  
     );
}
 
export default Navbar;