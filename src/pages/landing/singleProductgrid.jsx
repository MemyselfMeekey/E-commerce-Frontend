import bannerImage2 from "../../assets/images/bannerImage2.jpeg"

const SingleProductGrid=({productDetail})=>{

    console.log("productDetail",productDetail)
   return(
    <>
    
            <div className="col-sm-12 col-md-4">
      <div className="card">
      <img className="card-img-top" src={import.meta.env.VITE_IMAGE_URL + "/product/" + productDetail.image}  style={{ width: "50px" }} fluid sizes="sm"  alt="Card image cap"/>
        <div className="card-title">
            <h1>{productDetail.name}</h1>
            </div>
            <span>{productDetail.price}</span>
            <span>{productDetail.brand?.name}</span>
            <a href="/category/category-name">
                <button>View Detail</button>
            </a>
    </div> 
    </div>
 

</>
   )
}
export default SingleProductGrid