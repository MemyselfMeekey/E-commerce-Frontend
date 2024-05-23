import HomeHeader from "../../components/home/home-header.component"
import { Container, Row, Col } from "react-bootstrap"
import { NavLink, Outlet } from "react-router-dom"
import HomeFooter from "../../components/home/footer/footer.component"
import HomeBannner from "../../components/home/home-banner.component"

const HomeLayout = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm={6}>
                        <small className="text-danger"><em>FreeShipping above purechase of Npr 500</em></small>
                    </Col>
                    <Col sm={6}>
                        <NavLink>
                        <small className="me-3">
                            +977 9840035922
                        </small>
                        <small>
                            <em>
                                apurva@gmail.com
                            </em>
                        </small>
                        </NavLink>
                    </Col>
                </Row>
            </Container>
            <HomeHeader />
            
            <Outlet />
            <HomeFooter />
        </>
    )
}
export default HomeLayout