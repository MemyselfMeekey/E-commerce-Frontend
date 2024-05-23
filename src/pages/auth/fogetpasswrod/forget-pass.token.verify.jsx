import { Container, Row, Col, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../../components/common/page-title/page-title.component"
import { InlineFormElem } from "../../../components/common/form/form.grid"
import { TextInput } from "../../../components/common/form/input.component"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { FormActionButtons } from "../../../components/buttons/buttons.component"
import { toast } from "react-toastify"
import authSvc from "../auth.service"
import { useEffect, useState } from "react"

const ForgetPassTokenVerify = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [detail, setDetail] = useState()
  const [loading, setLoading] = useState(true)
  const token = params.token
  const forgetpassSchema = Yup.object({
    password: Yup.string().min(8).max(25).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password and confirm password doesnot match")
  })
  const { formState: { errors }, handleSubmit, control } = useForm({
    resolver: yupResolver(forgetpassSchema)
  })
  const forgetPassToken = async () => {
    try {
      console.log(token)
      const response = await authSvc.verifyForgetPassToken(token)
      console.log(response)
      setDetail(response.result)
      setLoading(false)
    }
    catch (exception) {
      toast.warn("there is an error in token verification")
    }
  }
  useEffect(() => {
    forgetPassToken()
  }, [])
  const submitForgetPass = async (data) => {
    try {
      // console.log("submitForgetPass",token)
      setLoading(true)
      const response = await authSvc.NewPass(data,token)
      toast.success(response.message)
      navigate("/login")
    }
    catch (exception) {
      toast.error("token verificatoin error")
      console.log("exception submitforegtpass", exception)
    }
    finally{
      setLoading(false)
    }
  }
  //password, confirm password
  return (
    <>
      <Container className="bg-light my-3 p-3">
        <Row>
          <Col>
            <PageTitle>Enter your new password</PageTitle>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col sm={12} md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }}>
            <Form onSubmit={handleSubmit(submitForgetPass)}>
              <InlineFormElem label={"Password"}>
                <TextInput
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  required={true}
                  control={control}
                  errMsg={errors?.password?.message}

                />
              </InlineFormElem>
              <InlineFormElem label={"ConfirmPassword"}>
                <TextInput
                  type="password"
                  id="confirmpassword"
                  placeholder="Re-enter the password"
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
      </Container>
    </>
  )
}
export default ForgetPassTokenVerify