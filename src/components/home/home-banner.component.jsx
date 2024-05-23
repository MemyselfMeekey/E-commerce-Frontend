import { useEffect, useState } from "react"
import bannerImage1 from "../../assets/images/bannerImage1.jpeg"
import bannerImage2 from "../../assets/images/bannerImage2.jpeg"
import bannerImage3 from "../../assets/images/bannerImage3.jpeg"
import bannerSvc from "../cms/banner/banner.service"
import { toast } from "react-toastify"
const HomeBannner = () => {

  const [bannerData, setBanner] = useState()

  const LoadBanner = async () => {
    try {
      const bannerList = await bannerSvc.listForHome()
      console.log("bannerList",bannerList)
      setBanner(bannerList.result)
    }
    catch (exception) {
      toast.warn(exception.message)
      console.log(exception)
    }
  }

  useEffect(() => {
    LoadBanner()
  }, [])


  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {
          bannerData && bannerData.map((banner, inx) => (
            <div className="carousel-item active" key={inx}>
              <a href={banner.url}>
              <img src={import.meta.env.VITE_IMAGE_URL+"/banner/"+banner.image} className="d-block w-100" alt="..." />
              </a>
            </div>


          ))
        }

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
export default HomeBannner