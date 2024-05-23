import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


const HomeHeader = () => {
  const navigate=useNavigate()
  const loggedInUser=useSelector((store)=>{
    return store?.user?.loggedInUser
})
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
  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about-us">
                About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us">
                Contact Us
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/category/smart-phone">Smart Phone</a></li>
                <li><a className="dropdown-item" href="/category/clothing">Clothing</a></li>
                <li><a className="dropdown-item" href="/category/electronics">Electronics</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success me-3" type="submit">Search</button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              loggedInUser ? <> 
              <li className="nav-item">
              <NavLink className={"text-warning me-3"} to={loggedInUser.role==='admin'?"/admin":"/"}>{loggedInUser.name}</NavLink>

            </li>
            <li className="nav-item">
              <NavLink onClick={logout} className={"btn btn-sm btn-outline-warning me-3"} >Logout</NavLink>
            </li>
              </>:<>
              <li className="nav-item">
              <NavLink className={"btn btn-sm btn-outline-warning me-3"} to="/register">Register</NavLink>

            </li>
            <li className="nav-item">
              <NavLink className={"btn btn-sm btn-outline-warning me-3"} to="/login">Login</NavLink>
            </li>
              </>
            }
            
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default HomeHeader