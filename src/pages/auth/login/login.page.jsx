import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { NavLink, json, useNavigate } from "react-router-dom"
import PageTitle from "../../../components/common/page-title/page-title.component"
import { TextInput } from "../../../components/common/form/input.component"
import { InlineFormElem } from "../../../components/common/form/form.grid"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axiosInstance from "../../../config/axios.config"
import { toast } from "react-toastify"
import authSvc from "../auth.service"
import { FormActionButtons } from "../../../components/buttons/buttons.component"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setHello } from "../../../reducer/user.reducer"


const LoginPage=()=>{
    const navigate=useNavigate()
    const [token,setToken]=useState()
    const dispatch=useDispatch()

    const loginSchema=Yup.object({
        email:Yup.string().email().required(),
        password:Yup.string().required()
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
            const response=await authSvc.loginRequest(data)
            
            dispatch(setHello(response.result.userDetail))

            toast.success(response.message)
       
            navigate('/'+response.result.userDetail.role)
            
            //cookie set
           // document.cookie="name=Apurva;expiresIn=YYYY-MM-DDTHH:ii:ss.ms;path/;httpOnly=1"
            //const cookie=document.cookie

            //localstorage
            // localStorage.setItem("name","value")
            // const value=localStorage.getItem("key")
            //localStorage.removeItem("key")
            //localStorage.clear()

            //session:
            //sessionStorage.setItem("name","value")
        }
        catch(exception){
            toast.error(exception.data.message)
            console.log("exception",exception)
        }
    }  
    useEffect(()=>{
        const token=localStorage.getItem("_act") || null
        const userDetail=JSON.parse(localStorage.getItem("_au")) || null
        if(token && userDetail){
            toast.info("You are already loggged in")
            navigate('/'+userDetail.role)
        }
    },[])

    return(
        <>
        <Container className="bg-light my-3 p-3">
            <Row>
                <Col>
                   <PageTitle>LoginPage</PageTitle>
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
                           <InlineFormElem label={"Password"}>
                                <TextInput
                                    type="password"
                                    id="Password"
                                    placeholder="Enter your password"
                                    name="password"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.password?.message}
                                />
                           </InlineFormElem>
                            <Form.Group className="row mb-3">
                                <Col sm={{offset:3, span:9}}>
                                    <NavLink to={'/forgetpassword'}>ForgetPasswrod</NavLink>
                                </Col>
                            </Form.Group>

                          <FormActionButtons
                           resetLabel="Reset"
                           submitLabel="Submit"
                          />
                        </Form>
                        or &nbsp;
                        <NavLink to="/register">Create Account</NavLink>
                    </Col>
                </Row>
            
        </Container>
        </>
    )
}
export default LoginPage