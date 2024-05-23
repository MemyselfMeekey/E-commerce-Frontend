import HttpService from "../../../services/axios.service";

class CatService extends HttpService{
    store=async(data)=>{
        try{
            const response=await this.postRequest(
                'authv1/category',
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
    listAllcats=async({limit,page})=>{
        try{
            // console.log(limit,page)
            const response=await this.getRequest(
                `authv1/category?limit=${limit}&page=${page}`,
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
                `authv1/category/${id}`,
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
                `authv1/category/${id}`,
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
            
            'authv1/category/'+id,
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
const CatSvc=new CatService()
export default CatSvc