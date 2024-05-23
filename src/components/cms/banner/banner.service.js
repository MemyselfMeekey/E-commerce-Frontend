import HttpService from "../../../services/axios.service";

class BannerService extends HttpService {
    store = async (data) => {
        try {
            const response = await this.postRequest(
                'authv1/banner',
                data,
                {
                    auth: true, file: true
                }

            )
            return response
        }
        catch (exception) {
            throw exception
        }
    }
    listAllBanners = async ({ limit, page }) => {
        try {
            // console.log(limit,page)
            const response = await this.getRequest(
                `authv1/banner?limit=${limit}&page=${page}`,
                { auth: true }

            )
            return response
        }
        catch (exception) {
            throw exception
        }
    }
    deleteData = async (id) => {
        try {
            const response = await this.deleteRequest(
                `authv1/banner/${id}`,
                { auth: true }
            )
            return response
        }
        catch (exception) {
            throw exception
        }
    }
    getDataById = async (id) => {
        try {
            const response = await this.getRequest(
                `authv1/banner/${id}`,
                { auth: true }
            )
            return response
        }
        catch (exception) {
            throw exception
        }
    }
    update = async (data, id) => {
        try {

            const response = await this.putRequest(

                'authv1/banner/' + id,
                data,
                {
                    auth: true, file: true
                }

            )
            return response
        }
        catch (exception) {
            throw exception
        }
    }

    listForHome=async()=>{
        try{
            const response=await this.getRequest(
                `authv1/banner/home/list`
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
}
const bannerSvc = new BannerService()
export default bannerSvc