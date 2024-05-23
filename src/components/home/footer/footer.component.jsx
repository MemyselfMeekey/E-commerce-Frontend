import {Container,Row,Col,Form} from "react-bootstrap"
import { NavLink } from "react-router-dom"
const HomeFooter=()=>{
    return(
        <>
        <div className="mt-5 py-3 bg-dark" >
            <Container>
                <Row>
                    <Col sm={12} md={4}>
                        <h4 className="text-center text-white " style={{textDecoration:"underline"}}>
                            AboutUS
                        </h4>
                        <p className="text-white" style={{textAlign:"justify", fontSize:"15px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque ducimus aliquam reprehenderit, ab ad eaque qui. Molestiae eius perspiciatis saepe qui ducimus eum est, vel quas vero ipsa harum.</p>
                    </Col>
                    <Col sm={12} md={4}><h4 className="text-center text-white " style={{textDecoration:"underline"}}>
                            ShortLink
                        </h4>
                        <ul className="list-unstyled">
                            <li>
                                <NavLink  className={"btn btn-sm btn-link text-white"} to="/privacy-policy">Privacy Policy</NavLink>
                            </li>
                            <li>
                                <NavLink  className={"btn btn-sm btn-link text-white"} to="/terms and condition">Terms And Condition</NavLink>
                            </li>
                            <li>
                                <NavLink  className={"btn btn-sm btn-link text-white"} to="/return">Return</NavLink>
                            </li>
                            <li>
                                <NavLink  className={"btn btn-sm btn-link text-white"} to="/feedback">Feedback</NavLink>
                            </li>
                        </ul>
                        </Col>

                    <Col sm={12} md={4}>
                    <h4 className="text-center text-white " style={{textDecoration:"underline"}}>
                            Subscription
                        </h4>
                        <Form>
                            <Form.Control
                                type="email" required name="Subscription" size="sm" placeholder="Enter your email">

                            </Form.Control>
                            <iframe className="mt-3"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56511.97576147799!2d85.29305929497325!3d27.717333049599294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198d99470043%3A0x167d008efb47d64c!2sBroadway%20Infosys!5e0!3m2!1sen!2snp!4v1712886919624!5m2!1sen!2snp" width="350" height="200" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
        </>
    )
}
export default HomeFooter