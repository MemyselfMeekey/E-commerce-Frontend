import { useEffect, useState } from "react"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import authSvc from "../../pages/auth/auth.service"

const AuthComponent = ({ role, children }) => {
    const [userDetail, setUserDetail] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const getLoggedInUser=async()=>{
        try{
            const response=await authSvc.getLoggedInUser()
            localStorage.setItem("_au",JSON.stringify(response.result))
            setUserDetail(response.result)
            
        }
        catch(exception){
            toast.error("Please clear your cookie and login for the further process")
            localStorage.removeItem("_act")
            localStorage.removeItem("_rft")
            localStorage.removeItem("_au")
            navigate("/login")
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("_act") || null
        if (!token) {
            toast.error("Please login first")
            navigate("/login")
        } else {
            getLoggedInUser()
        }
    }, [])

    if (loading) {
        return (
            <>
                <Container>
                    <Row>
                        <Col sm={12} className="my-5 text-center">
                            <Spinner variant="green"></Spinner>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    else if(userDetail && userDetail.role===role){
        return children
    }
    else{
        toast.warn("You donot have permission to access this panel")
        return <Navigate to={'/'+userDetail.role}></Navigate>
    }
}
export default AuthComponent