import {  useNavigate } from "react-router-dom"
import AdminBreadCrumb from "../admin-breadcrumb"
import { Form } from "react-bootstrap"
import { InlineFormElem } from "../../common/form/form.grid"
import {  SelectDropdownInput, SwitchCase, TextInput } from "../../common/form/input.component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../buttons/buttons.component"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {Col} from "react-bootstrap"
import CatSvc from "./cat.service"
import { useEffect, useState } from "react"

const CategoryCreate = () => {
    const navigate=useNavigate()
    const [catOptions,setCatOptions]=useState()


    const rules=Yup.object({
        name:Yup.string().min(3).required(),
        status:Yup.object({
            label:Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value:Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        showInHome:Yup.boolean().default(false),
        showInMenu: Yup.boolean().default(false),
        parentId:Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        })
    })

    const [loading,setLoading]=useState(false)

    const {control,handleSubmit,setValue,formState:{errors}}=useForm({
        resolver:yupResolver(rules)
    })

    const LoadCategories=async()=>{
        try{    
            const response=await CatSvc.listAllcats({page:1,limit:100})
            console.log("response.result.cat",response.result.id)
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

    const submitEvent=async(data)=>{
        try{
            setLoading(true)
        let payload=data
        payload.status=data.status.value
        payload.parentId=data.parentId?.value || null
            console.log(payload)
        const status=await CatSvc.store(payload)
        toast.success(status.message)
        navigate('/admin/category')
        }
        catch(exception){
            toast.error("Problem while creating the category")
            console.log("exception",exception)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        LoadCategories()
    },[])

    return (
        <>
            <div className="container-fluid px-4">

                <AdminBreadCrumb
                    pageTitle={"Category Create"}
                    breadCrumbData={[
                        {label:"Dashboard", url:"/admin"},
                        {label:"List Category", url:"/admin/category"},
                        {label:"Create Category", url:null}
                    ]}
                />
                <div className="row my-3">
                    <div className="col-12">
                        <h4>Category Create</h4>
                        <hr></hr>

                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <InlineFormElem label={"Category Name"}>
                                <TextInput
                                    name={'name'}
                                    placeholder="Enter Category name"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.name?.message}
                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Sub-category of "}>
                                <SelectDropdownInput
                                 name={"parentId"}
                                 control={control}
                                 options={catOptions}
                                 multiple={false}
                                 errMsg={errors?.parentId?.message}

                                />
                                </InlineFormElem>
                            
                            <InlineFormElem label={"Show In Home"}>
                                <SwitchCase
                                   name={"showInHome"}
                                   control={control}
                                   defaultValue={false}
                                   errMsg={errors?.showInHome?.message}
                                />
                            </InlineFormElem>
                            <InlineFormElem label={"Show In Menu"}>
                                <SwitchCase
                                   name={"showInMenu"}
                                   control={control}
                                   defaultValue={false}
                                   errMsg={errors?.showInMenu?.message}
                                />
                            </InlineFormElem>
                           
                            <InlineFormElem label={"Category Status"}>
                                <SelectDropdownInput
                                 name={"status"}
                                 control={control}
                                 options={[
                                     {label:"Publish",value:"active"},
                                     {label:"Unpublish",value:"inactive"}
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
export default CategoryCreate