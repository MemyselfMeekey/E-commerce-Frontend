import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing/landing.page"
import AboutUs from "../pages/abouts-us/about-uspage"
import Register from "../pages/auth/resgister/register.page"
import LoginPage from "../pages/auth/login/login.page"
import SearchProduct from "../pages/search/search.products"
import AdminPage from "../pages/admin/admin.page"
import CategoryDetail from "../pages/category/category.detail"

import { Container, Row, Col } from "react-bootstrap"
import HomeLayout from "../pages/layout/home.layout"
import AdminDashboard from "../components/cms/dashboard/dashboard.page"
import ForgetPasswrod from "../pages/auth/fogetpasswrod/forget-password"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ActivateRegistration from "../pages/auth/activate-user.page"
import ResendToken from "../pages/auth/resend-token.page"
import AuthComponent from "../components/auth/auth.component"
import ForgetPassTokenVerify from "../pages/auth/fogetpasswrod/forget-pass.token.verify"
import { BannerCreate, ListBanner, EditBanner } from "../components/cms/banner"
import { BrandCreate, Editbrand, Listbrand } from "../components/cms/brand"
import { CategoryCreate, EditCategory, ListCategory } from "../components/cms/category"
import { ListProduct, ProductCreate, EditProduct } from "../components/cms/product"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getLoggedInUser } from "../reducer/user.reducer"
import { CreateUser, ListUser } from "../components/cms/usersByAdmin"


const ErrorPage = () => {
    return (
        <>

            <Container className="my-3">
                <Row>
                    <Col>
                        <p className="text-danger">
                            Oops!! The resource your are looking doenot exists
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const RoutingComponent = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       let token=localStorage.getItem("_act") || null
       if(token){
        dispatch(getLoggedInUser())
       }
    }, [])


    return (
        <>
            <ToastContainer />
            {/* <BrowserRouter>  can be used here as wll as well as in main.jsx*/}

            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<LandingPage />}></Route>
                    <Route path="about-us" element={<AboutUs />}></Route>
                    <Route path="category/:catslug" element={<CategoryDetail />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="activate/:token" element={<ActivateRegistration />}></Route>
                    <Route path="resend-token" element={<ResendToken />}></Route>
                    <Route path="login" element={<LoginPage />}></Route>
                    <Route path="forgetpassword" element={<ForgetPasswrod />}></Route>
                    <Route path="forgetpassword/:token/verify" element={<ForgetPassTokenVerify />}></Route>
                </Route>

                <Route path="/blank" element={<HomeLayout />}></Route>
                <Route path="/search/products" element={<SearchProduct />}></Route>

                <Route path="/admin" element={<AuthComponent role={"admin"}>
                    <AdminPage />
                </AuthComponent>}>
                    <Route index element={<AdminDashboard />}></Route>
                    <Route path="banner" element={<ListBanner />}></Route>
                    <Route path="banner/create" element={<BannerCreate />}></Route>
                    <Route path="banner/:id/edit" element={<EditBanner />}></Route>


                    <Route path="brand" element={<Listbrand />}></Route>
                    <Route path="brand/create" element={<BrandCreate />}></Route>
                    <Route path="brand/:id/edit" element={<Editbrand />}></Route>

                    <Route path="category" element={<ListCategory />}></Route>
                    <Route path="category/create" element={<CategoryCreate />}></Route>
                    <Route path="category/:id/edit" element={<EditCategory />}></Route>

                    <Route path="user" element={<ListUser/>}></Route>
                    <Route path="user/create" element={<CreateUser/>}></Route>

                    <Route path="product" element={<ListProduct />}></Route>
                    <Route path="product/create" element={<ProductCreate />}></Route>
                    <Route path="product/:id/edit" element={<EditProduct />}></Route>

                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>


                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
            {/* </BrowserRouter> */}
        </>
    )
}
export default RoutingComponent