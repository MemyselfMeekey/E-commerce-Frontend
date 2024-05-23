import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminHeader=()=>{
    const navigate=useNavigate()
    const logout=(e)=>{
        e.preventDefault()
        localStorage.removeItem("_act")
        localStorage.removeItem("_rft")
        localStorage.removeItem("_au")
        //--in my project
        //todo:api call for logout
        //on success call===>local
        navigate("/login")
      }
    return(
        <>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <NavLink className="navbar-brand ps-3" to="/admin">Admin Panel</NavLink>
                
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"  onClick={(e)=>{
                    e.preventDefault()
                    document.body.classList.toggle('sb-sidenav-toggled');
                }} id="sidebarToggle"><i className="fas fa-bars"></i>
                </button>

                <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                </div>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Profile</a></li>
                            <li><a className="dropdown-item" href="#!">Change Password</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><NavLink onClick={logout} className="dropdown-item" to="/" >Logout</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default AdminHeader