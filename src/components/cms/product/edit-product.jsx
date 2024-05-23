import { useNavigate, useParams } from "react-router-dom"
import AdminBreadCrumb from "../admin-breadcrumb"
import { Form } from "react-bootstrap"
import { InlineFormElem } from "../../common/form/form.grid"
import {  SelectDropdownInput, SwitchCase, TextInput } from "../../common/form/input.component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../buttons/buttons.component"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { Col } from "react-bootstrap"
import ProductSvc from "./product.service"
import { useEffect, useState } from "react"
import CatSvc from "../category/cat.service"

const EditProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [checked, setChecked] = useState(false)
    const [checkedShowInMenu, setCheckedShowInMenu] = useState(false)

    const [catOptions,setCatOptions]=useState()
    
    const [loading,setLoading]=useState(false)

    const rules = Yup.object({
        name: Yup.string().min(3).required(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value: Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        showInHome: Yup.boolean().default(false),
        showInMenu: Yup.boolean().default(false),
        parentId:Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        })
    })



    const { control, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(rules)
    })

    const LoadCategories=async()=>{
        try{    
            const response=await CatSvc.listAllcats({page:1,limit:100})
            const options=response.result.map((cat)=>{
                return{
                    label:cat.name,
                    value:cat.id
                }
            })
            setCatOptions(options)
        }
        catch(exception){
            console.log(exception)

        }
    }

    const submitEvent = async (data) => {
        try {

            setLoading(true)
            let payload = data
            payload.status = data.status.value
            payload.parentId=data.parentId?.value || null

            const status = await ProductSvc.update(payload, params.id)
       
            // toast.success(.message)
            navigate('/admin/category')
        }
        catch (exception) {
            toast.error("Problem while editing the category")
            console.log("exception", exception)
        }
        finally {
            setLoading(false)
        }
    }

    const getproductDetail = async () => {
        try {
            setLoading(true)
            const response = await ProductSvc.getDataById(params.id)

            if (response.result) {
                setValue("name", response.result.name)
                setValue("status", {
                    label: response.result.status === 'active' ? 'Publish' : 'Unpublish',
                    value: response.result.status
                })

                if(response.result.parentId){
                    setValue("parentId", {
                        label: response.result.parentId.name,
                        value: response.result.parentId._id
                    })
                }
               
                setValue('showInHome', response.result.showInHome)
                setValue('showInMenu', response.result.showInMenu)
                setChecked(response.result.showInHome)
                setCheckedShowInMenu(response.result.showInMenu)

            }
        }
        catch (exception) {
            toast.error("Error while fetching product")
            navigate('/admin/product')
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getcatDetail(),
        LoadCategories()
    }, [])
    console.log(errors)
    return (
        <>
            <div className="container-fluid px-4">

                <AdminBreadCrumb
                    pageTitle={"Product edit"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "Listbrand", url: "/admin/product" },
                        { label: "Edit product", url: null }
                    ]}
                />
                <div className="row my-3">
                    <div className="col-12">
                        <h4>Product edit</h4>
                        <hr></hr>

                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <InlineFormElem label={"Category Name"}>
                                <TextInput
                                    name={'name'}
                                    placeholder="Enter category name"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.name?.message}
                                />
                                
                            </InlineFormElem>

                            <InlineFormElem label={"SubCategory of"}>
                                <SelectDropdownInput
                                    name={"parentId"}
                                    control={control}
                                    options={catOptions}
                                  
                                    errMsg={errors?.parentId?.message}

                                />
                                </InlineFormElem>

                            <InlineFormElem label={"Show In Home"}>
                                <SwitchCase
                                    name={'showInHome'}
                                    control={control}
                                    defaultValue={checked}
                                    errMsg={errors?.showInHome?.message}
                                />
                            </InlineFormElem>
                            <InlineFormElem label={"Show In Menu"}>
                                <SwitchCase
                                    name={'showInMenu'}
                                    control={control}
                                    defaultValue={checkedShowInMenu}
                                    errMsg={errors?.showInMenu?.message}
                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Category Status"}>
                                <SelectDropdownInput
                                    name={"status"}
                                    control={control}
                                    options={[
                                        { label: "Publish", value: "active" },
                                        { label: "Unpublish", value: "inactive" }
                                    ]}
                                    multiple={false}
                                    errMsg={errors?.status?.message}

                                />

                                {/* <DropDownInput
                                name={"status"}
                                control={control}
                                options={[
                                    {label:"Publish",value:"active"},
                                    {label:"Un-publish",value:"inactive"}
                                ]}
                               /> */}
                            </InlineFormElem>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3" htmlFor="image">Category Image:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        size="sm"
                                        onChange={(e) => {
                                            const image = e.target.files[0]
                                            //size and type
                                            const ext = image.name.split(".").pop()
                                            const allowed = ['jpg', 'png', 'svg', 'jpeg', 'webp', 'bmp']
                                            if (allowed.includes(ext.toLowerCase())) {
                                                if (image.size <= 3000000) {
                                                    //allowed sixze
                                                    setValue("image", image)
                                                }
                                                else {
                                                    setError("image", { message: "File size not allowed" })
                                                }
                                            }
                                            else {
                                                setError("image", { message: "File format not suported" })
                                            }

                                        }}
                                    />
                                    <span className="text-danger">{errors?.image?.message}</span>
                                </Col>
                            </Form.Group>

                            <FormActionButtons
                                submitLabel="Submit"
                                resetLabel="Reset"
                                loading={loading}
                            />

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProduct