import HttpService from "../../../services/axios.service";

class ProductService extends HttpService {
    store = async (data) => {
        try {
            console.log("data.categories", data.categories)
            const response = await this.postRequest(
                'authv1/product',
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
    listAllProducts = async ({ limit, page }) => {
        try {
            // console.log(limit,page)
            const response = await this.getRequest(
                `authv1/product?limit=${limit}&page=${page}`,
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
                `authv1/product/${id}`,
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
                `authv1/product/${id}`,
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

                'authv1/product/' + id,
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
                'authv1/product/home/list'
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
}
const ProductSvc = new ProductService()
export default ProductSvc