import { NavLink, useNavigate } from "react-router-dom"
import AdminBreadCrumb from "../admin-breadcrumb"
import { Form } from "react-bootstrap"
import { InlineFormElem } from "../../common/form/form.grid"
import { DropDownInput, SelectDropdownInput, TextInput } from "../../common/form/input.component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../buttons/buttons.component"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {Image,Col} from "react-bootstrap"
import bannerSvc from "./banner.service"
import { useState } from "react"

const BannerCreate = () => {
    const navigate=useNavigate()

    const rules=Yup.object({
        title:Yup.string().min(3).required(),
        status:Yup.object({
            label:Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value:Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        url:Yup.string().url().nullable().optional()
    })

    const [loading,setLoading]=useState(false)

    const {control,handleSubmit,setValue,formState:{errors}}=useForm({
        resolver:yupResolver(rules)
    })

    const submitEvent=async(data)=>{
        try{
            setLoading(true)
        let payload=data
        payload.status=data.status.value
        
        const status=await bannerSvc.store(payload)
        toast.success(status.message)
        navigate('/admin/banner')
        }
        catch(exception){
            toast.error("Problem while creating the banner")
            console.log("exception",exception)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className="container-fluid px-4">

                <AdminBreadCrumb
                    pageTitle={"Banner Create"}
                    breadCrumbData={[
                        {label:"Dashboard", url:"/admin"},
                        {label:"ListBanner", url:"/admin/banner"},
                        {label:"Create Banner", url:null}
                    ]}
                />
                <div className="row my-3">
                    <div className="col-12">
                        <h4>Banner Create</h4>
                        <hr></hr>

                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <InlineFormElem label={"Banner Title"}>
                                <TextInput
                                    name={'title'}
                                    placeholder="Enter Banner Title"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.title?.message}
                                />
                            </InlineFormElem>
                            <InlineFormElem label={"Banner Url"}>
                                <TextInput
                                    name={'url'}
                                    type="url"
                                    placeholder="Enter Banner Url"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.url?.message}
                                />
                            </InlineFormElem>
                            <InlineFormElem label={"Banner Status"}>
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
                                    <Form.Label className="col-sm-3" htmlFor="image">Banner Image:</Form.Label>
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
export default BannerCreate