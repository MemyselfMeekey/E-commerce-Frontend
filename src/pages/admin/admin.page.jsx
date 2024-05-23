import { Outlet } from "react-router-dom";
import "./admin-layout-page.css"
import AdminHeader from "../../components/cms/admin-header";
import AdminSidebar from "../../components/cms/admin.sidebar";
import AdminFooter from "../../components/cms/admin-footer.component";
const AdminPage = () => {

    return (
        <>
            <AdminHeader/>
            <div id="layoutSidenav">
               <AdminSidebar/>
                <div id="layoutSidenav_content">
                    <main>
                        <Outlet/>
                    </main>
                    <AdminFooter/>
                </div>
            </div>
        </>
    )
}
export default AdminPage