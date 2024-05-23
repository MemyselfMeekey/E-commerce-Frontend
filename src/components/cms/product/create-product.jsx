import { useNavigate } from "react-router-dom"
import AdminBreadCrumb from "../admin-breadcrumb"
import { Form } from "react-bootstrap"
import { InlineFormElem, InlineMultipleFormUploadElem } from "../../common/form/form.grid"
import { SelectDropdownInput, SwitchCase, TextInput, TextAreaInput, NumberInput, TagInput, MultipleFileUpload } from "../../common/form/input.component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../buttons/buttons.component"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"


import { useEffect, useState } from "react"
import CatSvc from "../category/cat.service"
import ProductAttributesComponent from "../product-attributes.component"
import brandSvc from "../brand/brand.service"
import authSvc from "../../../pages/auth/auth.service"
import ProductSvc from "./product.service"

const ProductCreate = () => {
    const navigate = useNavigate()
    const [thumb, setThumb] = useState()
    const [catOptions, setCatOptions] = useState([])
    const [brandOpts, setBrandOPts] = useState([])
    let [attributes, setAttributes] = useState(null)
    let [sellerOpts, setSellerOpts] = useState(null)


    const rules = Yup.object({
        name: Yup.string().min(3).required(),
        descriptions: Yup.string().notRequired(),
        categories: Yup.array(Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        }
        )).notRequired(),
        price: Yup.number().min(100).required(),
        discount: Yup.number().min(0).max(90).default(0).notRequired(),
        tags: Yup.array(Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        }
        )).notRequired(),
        brand: Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        }).notRequired(),
        attributes: Yup.array(Yup.object({
            key: Yup.string().notRequired(),
            value: Yup.array(Yup.string()).notRequired()
        })).notRequired(),
        seller: Yup.object({
            label: Yup.string().nullable().notRequired(),
            value: Yup.string().nullable().notRequired()
        }).notRequired(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value: Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        showInHome: Yup.boolean().default(false),

    })

    const [loading, setLoading] = useState(false)

    const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm({
        resolver: yupResolver(rules)
    })

    const LoadCategories = async () => {
        try {
            const response = await CatSvc.listAllcats({ page: 1, limit: 100 })
            const options = response.result.map((cat) => {
                return {
                    label: cat.name,
                    value: cat._id
                }
            })
            console.log("categoryr return",options)
            setCatOptions(options)
        }
        catch (exception) {
            console.log(exception)

        }
    }

    const LoadBrand = async () => {
        try {
            const response = await brandSvc.listAllbrands({ page: 1, limit: 1000 })
            const opts = response.result.map((brand) => {
                return {
                    label: brand.name,
                    value: brand._id
                }
            })
            setBrandOPts(opts)
        }
        catch (exception) {
            console.log(exception)
        }
    }

    const LoadSeller = async () => {
        try {
            const response = await authSvc.getUserByType('seller')
            const opts = response.result.map((seller) => {
                return {
                    label: seller.name,
                    value: seller._id
                }
            })
            setSellerOpts(opts)

        }
        catch (exception) {
            console.log(exception)
        }
    }

    const submitEvent = async (data) => {
        try {
            setLoading(true)
           let formData=new FormData()

           formData.append("name",data.name)
           formData.append("description",data.description)
            if(data.categories){
                data.categories.map((cat,ind)=>{
                    formData.append(`categories[${ind}]`,cat.value)
                })
            }
            formData.append("brand",(data?.brand?.value || null))
            formData.append("price",(data.price))
            formData.append("discount",(data.discount))

            if(data.tag){
                data.tag.map((tags,inx)=>{
                    formData.append(`tags[${inx}]`,tags.value)
                })
            }

            if(attributes){
                attributes.map((attr,ind)=>{
                    formData.append(`attributes[${ind}][key]`,attr.key)
                    if(attr.value){
                        attr.value.map((val,inx)=>{
                            if(val){
                                formData.append(`attributes[${ind}][value][${inx}]`,val)
                            }
                        })
                    }
                })
            }

            formData.append("seller",data?.seller?.value || null)
            formData.append("showInHome",data.showInHome?true:false)
            formData.append("status",data.status.value || 'inactive')

            if(thumb){
                thumb.map((image)=>{
                    formData.append('images',image,image.name)
                })
            }
            console.log("formData",formData)

           const status = await ProductSvc.store(formData)
            toast.success(status.message)
            navigate('/admin/product')
        }
        catch (exception) {
            toast.error("Problem while creating the product")
            console.log("exception", exception)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            LoadCategories(),
            LoadBrand(),
            LoadSeller()
    }, [])

    console.log("errors", errors)

    return (
        <>
            <div className="container-fluid px-4">

                <AdminBreadCrumb
                    pageTitle={"Product Create"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "List product", url: "/admin/product" },
                        { label: "Create product", url: null }
                    ]}
                />
                <div className="row my-3">
                    <div className="col-12">
                        <h4>Product Create</h4>
                        <hr></hr>

                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <InlineFormElem label={"Product Name"}>
                                <TextInput
                                    name={'name'}
                                    placeholder="Enter product name"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.name?.message}
                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Product description"}>
                                <TextAreaInput
                                    name={"description"}
                                    control={control}
                                    placeholder="Enter product description"
                                    options={catOptions}
                                    multiple={false}
                                    errMsg={errors?.parentId?.message}

                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Category"}>
                                <SelectDropdownInput
                                    name={"categories"}
                                    multiple={true}
                                    options={catOptions}
                                    control={control}
                                    errMsg={errors?.categories?.message}


                                />
                            </InlineFormElem>
                            <InlineFormElem label={"Brand"}>
                                <SelectDropdownInput
                                    name={"brand"}
                                    multiple={false}
                                    options={brandOpts}
                                    control={control}
                                    errMsg={errors?.brand?.message}


                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Product Price (in Npr)."}>
                                <NumberInput
                                    name={'price'}
                                    placeholder="Enter product price"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.price?.message}
                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Discount (%)"}>
                                <NumberInput
                                    name={'discount'}
                                    placeholder="Enter product discount"
                                    control={control}
                                    defaultValue=""
                                    errMsg={errors?.discount?.message}
                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Tags (%)"}>
                                <TagInput
                                    name={"tags"}
                                    control={control}
                                    multiple={true}
                                    errMsg={errors?.tags?.message}
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


                            <InlineFormElem label={"Product Status"}>
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

                            <InlineFormElem label={"Seller"}>
                                <SelectDropdownInput
                                    name={"seller"}
                                    control={control}
                                    options={sellerOpts}
                                    errMsg={errors?.seller?.message}
                                />
                            </InlineFormElem>

                            <InlineFormElem label={"Attributes"}>
                                <ProductAttributesComponent
                                    attributes={attributes}
                                    setAttributes={setAttributes}

                                />

                            </InlineFormElem>

                            <InlineMultipleFormUploadElem label={"Product Image"} thumb={thumb} baseUrl={import.meta.env.VITE_IMAGE_URL}>
                                <MultipleFileUpload
                                    name={"image"}
                                    setThumb={setThumb}
                                    setValue={setValue}
                                    setError={setError}
                                    reuqired={true}
                                    errMsg={errors?.image?.message}

                                />

                            </InlineMultipleFormUploadElem>



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
export default ProductCreate