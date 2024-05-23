import { Container, Row, Col, Form, Button } from "react-bootstrap"
import PageTitle from "../../../components/common/page-title/page-title.component"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import authSvc from "../auth.service"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Register = () => {
    const navigate=useNavigate()
    const registerSchema=yup.object({
        name:yup.string().min(2).max(30).required(),
        email:yup.string().email().required(),
        role:yup.string().matches(/^(customer|seller)$/).required(),
        phone:yup.string().nullable().optional().default(null),
        // image:yup.string()
    })

    const {handleSubmit,register,setValue,setError,formState:{errors}}=useForm({
        resolver: yupResolver(registerSchema)
    })

    const submitHandler=async(data)=>{
        try{
          const response=await authSvc.resgisterUser(data)
          toast.success("You have been registered. Please check your email")
          navigate('/')
        }
        catch(exception){
            console.log(exception)
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

    return (
        <>
            <Container className="bg-light my-3 p-3">
                <Row>
                    <Col>
                        <PageTitle>Create Account</PageTitle>
                    </Col>
                    <hr />
                    <Row>
                        <Col sm={12} lg={{offset:1,span:10}}>
                            <Form onSubmit={handleSubmit(submitHandler)}>
                                {/*Change the compinent */}
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3" htmlFor="name">Name:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control 
                                        // name="name" 
                                        size="sm" 
                                        // required 
                                        {...register('name',{required:true})}
                                        placeholder="Enter your name" 
                                        id="name" />
                                        <span className="text-danger">{errors?.name?.message}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3" htmlFor="email">Email:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control 
                                        type="email"
                                        
                                        size="sm" 
                                        {...register('email',{required:true})}
                                        required 
                                        placeholder="Enter your email" 
                                        id="email" />
                                        <span className="text-danger">{errors?.email?.message}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3" htmlFor="role">Role:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Select 
                                        size="sm"
                                        {...register('role',{required:true})}
                                        >
                                            <option value="">--Select Any One---</option>
                                            <option value="customer">Customer</option>
                                            <option value="seller">Seller</option>
                                           
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3" htmlFor="phone">Phone:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control 
                                        type="tel"
                                         
                                        size="sm" 
                                        {...register('phone',{required:true})} 
                                        placeholder="Enter your phone" 
                                        id="phone" />
                                        <span className="text-danger"></span>
                                    </Col>
                                </Form.Group>

                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3" htmlFor="image">Profile Image:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            size="sm"
                                           onChange={(e)=>{
                                                const image=e.target.files[0]
                                                //size and type
                                                const ext=image.name.split(".").pop()
                                                const allowed=['jpg','png','svg','jpeg','webp','bmp']
                                                if(allowed.includes(ext.toLowerCase())){
                                                        if(image.size<=3000000){
                                                            //allowed sixze
                                                            setValue("image",image)
                                                        }
                                                        else{
                                                            setError("image", {message:"File size not allowed"})
                                                        }
                                                }
                                                else{
                                                    setError("image", {message:"File format not suported"})
                                                }
                                               
                                           }}
                                        />
                                        <span className="text-danger">{errors?.image?.message}</span>
                                    </Col>
                                </Form.Group>
                                
                                <Form.Group className="row mb-3">
                                    
                                    <Col sm={{offset:3,span:9}}>
                                            <Button type="reset" variant="danger" size="sm" className="me-3"><i className="fa fa-undo"> Reset</i></Button>
                                            <Button type="submit" variant="success" size="sm" className="me-3"><i className="fa fa-paper-plane"></i> Register</Button>
                                       
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}
export default Register