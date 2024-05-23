import { Button, Col, Form } from "react-bootstrap"

 export const FormActionButtons=({resetLabel="Reset",submitLabel="Submit",loading=false})=>{
    return(
        <>
        <Form.Group className="row mb-3">
            <Col sm={{offset:3,span:9}}>
                <Button disabled={loading} type="reset" variant="danger" size="sm" className="me-3">
                    <i className="fa fa-undo"></i> {resetLabel}
                </Button>
                
                <Button disabled={loading} type="submit" variant="success" size="sm">
                    <i className="fa fa-paper-plane"></i> {submitLabel}
                </Button>
            </Col>
            
        </Form.Group>
        </>
    )
}