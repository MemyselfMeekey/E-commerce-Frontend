import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { InlineFormElem } from "../../../components/common/form/form.grid"
import { TextControllerInput, TextInput } from "../../../components/common/form/input.component"
import authSvc from "../auth.service"
import { toast } from "react-toastify"

const ForgetPasswrod = () => {
    const navigate=useNavigate()
    const ForgetPassSchma=yup.object({
        email:yup.string().email().required()
    })
const {formState:{errors},handleSubmit,control}=useForm({
    resolver:yupResolver(ForgetPassSchma)
})
const afterhandleSubmit=async(data)=>{
    try{
        console.log(data)
        const response=await authSvc.forgetPassword(data)
        toast.success("Please check your email.")
    }   
    catch(exception){
        // toast.error(exception.data.messsage)
        console.log("Exception",exception)
    }
}
console.log(errors)
    return (
        <>
            <Container className="bg-light my-3 p-3">
                <Row>
                    <Col>
                        <h4 className="text-center">FrogetPass Passwrod</h4>
                        <p className="text-center">
                            <small>
                                <em>
                                    Please register your email where the link to reset your password will be sent
                                </em>
                            </small>
                        </p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={12} md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }}>
                        <Form onSubmit={handleSubmit(afterhandleSubmit)}>
                            <InlineFormElem label={"Username"}>
                              <TextInput
                              name="email"
                              id="username"
                              type="email"
                              placeholder="Enter your email"
                              required={true}
                              control={control}
                              errMsg={errors?.email?.message}
                              />
                            </InlineFormElem>

                            <Form.Group className="row mb-3">
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button type="submit" variant="success" size="sm" className=""><i className="fa fa-paper-plane"></i> Submit</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                        or &nbsp;
                        <NavLink to="/register">Create Account </NavLink>
                         or &nbsp;
                        <NavLink to="/login">Back to login</NavLink>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
export default ForgetPasswrod