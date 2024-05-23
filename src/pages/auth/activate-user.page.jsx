import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import authSvc from "./auth.service"
import { Container, Form, Row, Spinner, Col } from "react-bootstrap"
import PageTitle from "../../components/common/page-title/page-title.component"
import { InlineFormElem } from "../../components/common/form/form.grid"
import { set, useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { TextInput } from "../../components/common/form/input.component"
import { FormActionButtons } from "../../components/buttons/buttons.component"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"

const ActivateRegistration = () => {
    const navigate=useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(true)


    const rules = Yup.object({
        password: Yup.string().min(8).max(25).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password and confirm password doesnot match")
    })
    const { handleSubmit, control, formState:{ errors } } = useForm({
        resolver: yupResolver(rules)
    })

    const getUserByToken = async () => {
        try {
            const response = await authSvc.verifyToken(params.token)
            setDetail(response.result)
            setLoading(false)

        }
        catch (exception) {

            if(exception.status===400 && exception.data.message==="token has been already expired"){
                Swal.fire({
                    title: "<strong>Token expired</strong>",
                    icon: "warning",
                    html: `
                      Your link seems to be expired,
                      Please <a href="/resend-token">Click here </a> to resend token
                    `,
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton:false,
                    allowOutsideClick:false,
                    focusConfirm: false,
                    confirmButtonText: `
                      <i className="fa fa-thumbs-up"></i> Great!
                    `,
                    confirmButtonAriaLabel: "Thumbs up, great!",
                    cancelButtonText: `
                      <i className="fa fa-thumbs-down"></i>
                    `,
                    cancelButtonAriaLabel: "Thumbs down"
                  });
                  

            }
        }
    }
        
    


    useEffect(() => {
        getUserByToken()

    }, [])
    const submitEvent=async(data)=>{
        
        try{
            setLoading(true)
            const response=await authSvc.activateUser(data,params.token)
            toast.success("Your account has been activated successfully")
            navigate('/login')
        }
        catch(exception){
            toast.error(exception.data.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Container className="my-5 bg-light">
                <Row>
                    <Col sm={12}>
                        <PageTitle>Activate your account</PageTitle>
                        <hr />
                    </Col>
                </Row>
                {
                    loading ? <>
                        <Row>
                            <Col sm={12} className="text-center my-3">
                                <Spinner variant="success" />
                            </Col>
                        </Row>
                    </> : <>
                        <Row>
                            <Col sm={{ offset: 1, span: 10 }}>
                                <Form onSubmit={handleSubmit(submitEvent)}>

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
                                    <InlineFormElem label={"confirmPassword"}>
                                        <TextInput
                                            type="password"
                                            id="confirmPassword"
                                            placeholder="Confirm your password"
                                            name="confirmPassword"
                                            required={true}
                                            control={control}
                                            errMsg={errors?.confirmPassword?.message}
                                        />
                                    </InlineFormElem>
                                    <FormActionButtons
                                        resetLabel="Reset"
                                        submitLabel="Submit"
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </>
                }
            </Container>
        </>
    )
}
export default ActivateRegistration