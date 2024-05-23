import PageTitle from "../../components/common/page-title/page-title.component"
import HomeHeader from "../../components/home/home-header.component"
import {Container,Row,Col} from "react-bootstrap"

const AboutUs=()=>{
    return(<>
        <HomeHeader/>
        <Container>
            <Row>
                <Col sm={12} md={12}>
                    <PageTitle>
                        
                        About US
                    </PageTitle>
                </Col>
            </Row>
        </Container>
        </>)
}
export default AboutUs