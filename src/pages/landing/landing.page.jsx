import React, { useCallback, useEffect, useState } from "react"
import "./landing.page.css"
import Banner1 from "../../assets/images/bannerImage2.jpeg"
import HomeHeader from "../../components/home/home-header.component"
import HomeBannner from "../../components/home/home-banner.component"
import SingleProductGrid from "./singleProductgrid"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import ProductSvc from "../../components/cms/product/product.service"

const divCss={
    backgroundColor:"blue", 
    color:"#ffffff",
    padding:"10px 0px"
}
const LandingPage=({name})=>{

    const  loggedInUser=useSelector((store)=>{
        return store?.user?.loggedInUser
    })
    

    //props is an object data
    //props drill down--complex in react application
 
    const [productList,setProductList]=useState()
    // let [loading,setLoading]=useState(false)//state hook is creator and effect is listener

    // //effect listen ==>side effect
    // useEffect(()=>{
    //     //this hook will always executes on any state change
    //     // console.log("I am always execujted")
    // })

    // const handleFunc=useCallback(async()=>{
    //     const response={
    //         result:[
    //             {
    //                 _id:"123",
    //                 title:"Product-Name",
    //                 slug:"product-name",
    //                 categories:[{_id:"321",title:"Category One"}],
    //                 price:1000,
    //                 discount:10,
    //                 afterDiscount:900,

    //             },
    //             {
    //                 _id:"123",
    //                 title:"Product-Name Two",
    //                 slug:"product-name-two",
    //                 categories:[{_id:"321",title:"Category Two"}],
    //                 price:1000,
    //                 discount:10,
    //                 afterDiscount:900
    //             }
    //         ],
    //         message:"",
    //         meta:null
    //     }
    //     setProductList(response.result)
    // },[loading])

    // useEffect(()=>{
    //     //this hook will execute only once when the component is loaded
    //     // console.log("I am only called in first")
    //     // setTimeout(()=>{
    //     //     setLoading(true)
    //     //     setProductList("test value")
    //     // },5000)
    //    handleFunc()
    // },[])

    // useEffect(()=>{
    //     //dependency should be changed/updated
    //     // console.log("I am only called when loading state is updated")
    // },[loading,productList])

    const LoadProduct=async()=>{
        try{
            const response=await ProductSvc.listForHome()
            setProductList(response.result)
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    useEffect(()=>{
        LoadProduct()
    },[])

  

    //api call
    //api data-->useList
    return(
        <React.Fragment>
            <HomeBannner/>
            {/* or use <></> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center">ProductList</h4>
                    </div>
                       
                            <div className="row">
                                {
                                    productList && productList.map((detail,ind)=>(
                                        <SingleProductGrid key={ind} productDetail={detail}/>
                                    )) 
                                }
                            </div>
                        </div>
                    </div>
                 
                
      {/* <HomeBannner/> */}
      </React.Fragment>
    )
}
export default LandingPage