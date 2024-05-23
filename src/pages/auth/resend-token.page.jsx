import {  Col, Container, Form, Row } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import PageTitle from "../../components/common/page-title/page-title.component"
import { TextInput } from "../../components/common/form/input.component"
import { InlineFormElem } from "../../components/common/form/form.grid"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import authSvc from "./auth.service"
import { FormActionButtons } from "../../components/buttons/buttons.component"


const ResendToken=()=>{
    const navigate=useNavigate()
    const loginSchema=Yup.object({
        email:Yup.string().email().required(),
    })
    const {formState:{errors},handleSubmit,control}=useForm({
        resolver:yupResolver(loginSchema)
    })
    const submitEvent=async(data)=>{
     
        //http://localhost:3005/apiv1/auth/logoin
        //method:post
        //body:content type=> application.json
        //payload=>{email:"",password:""}
        try{
            const response=await authSvc.resendToken(data)
        
            toast.success(response.message)
            navigate('/')
        }
        catch(exception){
            toast.error(exception.data.message)
            console.log("exception",exception)
        }
    }  

    return(
        <>
        <Container className="bg-light my-3 p-3">
            <Row>
                <Col>
                   <PageTitle>Enter your username</PageTitle>
                </Col>
            </Row>
            <hr/>
                <Row>
                    <Col sm={12} md={{offset:1,span:10}} lg={{offset:2,span:8}}>
                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <InlineFormElem label={"Username"}>
                                <TextInput
                                    type="email"
                                    id="Username"
                                    name="email"
                                    placeholder="Enter your username"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.email?.message}
                                />
                            </InlineFormElem>
                          <FormActionButtons
                           resetLabel="Reset"
                           submitLabel="Send"
                          />
                        </Form>
                    
                    </Col>
                </Row>
            
        </Container>
        </>
    )
}
export default ResendToken