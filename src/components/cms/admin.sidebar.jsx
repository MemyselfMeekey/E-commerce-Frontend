import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const AdminSidebar = () => {
    const loggedInUser = useSelector((store)=>{
        return store?.user?.loggedInUser
    })
    return (
        <>

            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>

                            <NavLink className={"nav-link"} to="/">

                                <div className="sb-nav-link-icon"><i className="fa fa-home "></i>
                                </div>Home


                            </NavLink>

                            <NavLink className={"nav-link"} to="/admin">

                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i>
                                </div>Dashboard


                            </NavLink>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <NavLink className={"nav-link"} to="/admin/banner">

                                <div className="sb-nav-link-icon"><i className="fas fa-images"></i>
                                </div>Banner Management


                            </NavLink>
                            <NavLink className={"nav-link"} to="/admin/brand">

                                <div className="sb-nav-link-icon"><i className="fas fa-font-awesome"></i>
                                </div>Brand Management


                            </NavLink>
                            <NavLink className={"nav-link"} to="/admin/category">

                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i>
                                </div>Category Management


                            </NavLink>
                            <NavLink className={"nav-link"} to="/admin/user">

                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i>
                                </div>User Management


                            </NavLink>
                            <NavLink className={"nav-link"} to="/admin/product">

                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i>
                                </div>Product Management


                            </NavLink>
                            <NavLink className={"nav-link"} to="/admin/order">

                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i>
                                </div>Order Management


                            </NavLink>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {loggedInUser?.name}
                    </div>
                </nav>
            </div>
        </>
    )
}
export default AdminSidebar