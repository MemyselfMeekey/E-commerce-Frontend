import { useEffect, useState } from "react"
import { Button, Col, Row, Form } from "react-bootstrap"
import React from "react"

const ProductAttributesComponent = ({ attributes, setAttributes }) => {
    let [localAttributes, setLocalAttrs] = useState(null)
    useEffect(() => {
            if(attributes && attributes.length>0){
                setLocalAttrs([...attributes])
            }
        
    }, [attributes])

    const addMoreAttributes = () => {
        try {
            let oldAttrs = []

            if (attributes) {
                oldAttrs = [...attributes, { key: "", value: [""] }]
            }
            else {
                oldAttrs = [{ key: "", value: [""] }]
            }


            
            setAttributes([...oldAttrs])
        }
        catch (exception) {
            console.log(exception)
        }
    }

  
    return (
        <>
            {
                localAttributes && localAttributes.map((attr, ind) => (
                    <Row className="mb-3" key={ind}>
                        <Col sm={5} md={3}>
                            <Form.Control
                                type="text"
                                size="sm"
                                placeholder="Enter name of attribute..."
                                onChange={(e) => {
                                    const val = e.target.value
                                    const allAttr=[...attributes]
                                    allAttr[ind]['key']=val
                                    // setProductAttrs([...allAttr])
                                    setAttributes([...allAttr])
                                }}

                            />
                        </Col>

                        {
                            attr.value && attr.value.map((val, inx) => (
                                <React.Fragment key={inx}>

                                    <Col sm={{offset:inx!==0?5:0,span:5}} md={{offset:inx!==0?3:0,span:7}}>
                                        <Form.Control
                                            key={inx}
                                            type="text"
                                            size="sm"
                                            className="mb-3"
                                            value={val}
                                            placeholder="Enter name of attribute.."
                                            onChange={(e) => {
                                                const currentVal = e.target.value
                                                const allAttrs=[...attributes]
                                                allAttrs[ind]['value'][inx]=currentVal
                                                // setProductAttrs([...allAttrs])
                                                setAttributes([...allAttrs])
                                            }}

                                        />
                                    </Col>
                                 

                                    <Col sm={2} md={2}>

                                        {
                                            inx !== 0 ? <> <Button type="button" size="sm" variant="danger" className="me-3" onClick={(e) => {
                                                const currentAttr = attr
                                                currentAttr['value'].splice(inx,1)

                                                attributes[ind] = currentAttr
                                                // setProductAttrs([...attributes])
                                                setAttributes([...attributes])
                                            }}>
                                                <i className="fa fa-trash"></i>
                                            </Button> </> : <>
                                                <Button type="button" size="sm" variant="success" onClick={(e) => {
                                                    const currentAttr = attr
                                                    currentAttr['value'] = [...currentAttr['value'], ""]
                                                    attributes[ind] = currentAttr
                                                    // setProductAttrs([...attributes])
                                                    setAttributes([...attributes])
                                                }}>
                                                    <i className="fa fa-plus"></i>
                                                </Button>
                                            </>
                                        }


                                    </Col>
                                </React.Fragment>
                            ))
                        }

                    </Row>
                ))
            }
            < hr />

            <Button type="button" size="sm" variant="success" className="float-end" onClick={addMoreAttributes}>
                Add Attributes
            </Button>


        </>
    )
}
export default ProductAttributesComponent