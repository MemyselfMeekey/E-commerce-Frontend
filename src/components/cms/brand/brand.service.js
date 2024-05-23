import HttpService from "../../../services/axios.service";

class BrandService extends HttpService{
    store=async(data)=>{
        try{
            const response=await this.postRequest(
                'authv1/brand',
                data,
                {
                    auth:true,file:true
                }
           
            )
            return response
        }       
        catch(exception){
            throw exception
        }
    }
    listAllbrands=async({limit,page})=>{
        try{
            // console.log(limit,page)
            const response=await this.getRequest(
                `authv1/brand?limit=${limit}&page=${page}`,
                {auth:true}

            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    deleteData=async(id)=>{
        try{
            const response=await this.deleteRequest(
                `authv1/brand/${id}`,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    getDataById=async(id)=>{
        try{
            const response=await this.getRequest(
                `authv1/brand/${id}`,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    update=async(data,id)=>{
        try{
      
        const response=await this.putRequest(
            
            'authv1/brand/'+id,
            data,
            {
                auth:true,file:true
            }
       
        )
        return response
    }       
    catch(exception){
        throw exception
    }
}
}
const brandSvc=new BrandService()
export default brandSvc