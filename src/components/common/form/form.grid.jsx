import { Form, Col,Image } from "react-bootstrap"



export const InlineFormElem = ({ children, label }) => {
    return (
        <>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3" htmlFor={label.toLowerCase()}>{label}</Form.Label>
                <Col sm={9}>
                    {children}
                </Col>
            </Form.Group>
        </>

    )
}

export const InlineMultipleFormUploadElem = ({ children, label, thumb, baseUrl = import.meta.env.VITE_IMAGE_URL }) => {
    console.log("This is thumb",thumb)
    return (
        <>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3" htmlFor={label.toLowerCase()} >{label}:</Form.Label>
                <Col sm={9}>
                    {children}
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                {
                    thumb && thumb.length > 0 && <>
                        {
                            thumb.map((image, ind) => (
                                <Col sm={2} key={ind}>
                                    {
                                        typeof image === 'object' ? <>
                                            <Image onError={(e) => {
                                                e.target.src = 'https://dummyimage.com/300x150/d4d4d4/7d7d7d&text=Upload+some+image'
                                            }} fluid
                                                src={URL.createObjectURL(image)} alt="" />
                                        </> : <>
                                            <Image onError={(e) => {
                                                e.target.src = 'https://dummyimage.com/300x150/d4d4d4/7d7d7d&text=Upload+some+image'
                                            }} fluid 
                                            src={baseUrl + image} alt="" />
                                        </>
                                    }
                                </Col>
                            ))
                        }
                    </>
                }


            </Form.Group>
        </>
    )
}