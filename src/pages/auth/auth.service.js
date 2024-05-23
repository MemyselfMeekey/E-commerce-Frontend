import HttpService from "../../services/axios.service";

class AuthService extends HttpService{
    //inheritance oop
    loginRequest=async(data)=>{
        try{
            
            const response=await this.postRequest(//child calls parent
                'authv1/auth/login',
                data
            )//child calls parent
          
            localStorage.setItem("_act",response.result.accessToken)
            localStorage.setItem("_rft",response.result.refreshToken)
            localStorage.setItem("_au",JSON.stringify(response.result.userDetail))
            return response
        }
        catch(exception){
            throw exception
        }
    }
    resgisterUser=async(data)=>{
        try{
             const response=await this.postRequest(
                'authv1/auth/register',
                data,
                {
                    file:true
                }
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    verifyToken=async(token)=>{
        try{
            const response=await this.getRequest(
                'authv1/auth/verify-token/'+token
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    resendToken=async(data)=>{
        try{
            const response=await this.postRequest(
                'authv1/auth/resend-token',
                data
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    activateUser=async(data,token)=>{
        try{    
            const response=await this.postRequest(
                'authv1/auth/activate/'+token,
                data
            )
            return response;
        }
        catch(exception){
            throw exception
        }
    }
    getLoggedInUser=async()=>{
        try{
            const response=await this.getRequest(
                'authv1/auth/me',
                {auth:true}
            )
            return response
        }
        catch(exception)
        {
            throw exception
        }
    }
    forgetPassword=async(data)=>{
        try{
          const response=await this.postRequest(
            'authv1/auth/forget-password',
            data
          )
          return response
        }
        catch(exception){
            throw exception
        }
    }
    verifyForgetPassToken=async(token)=>{
        try{
            const response=await this.getRequest(
                `authv1/auth/forget-password/${token}/verify`,
            )
            console.log(response)
            return response
        }
        catch(exception){
            throw exception
        }
    }
    NewPass=async(data,token)=>{
        try{
            const response=await this.postRequest(
                'authv1/auth/set-password/'+token,
                data
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }

    getUserByType=async(role)=>{
        try{
            const response=await this.getRequest(
                'authv1/user?role='+role,
                {auth:true}
            )   
            return response
        }
        catch(exception){
            throw exception
        }
    }

    listAllUsers=async({page,limit})=>{
        try{
            const response=await this.getRequest(
                `authv1/user?page=${page}&limit=${limit}`,
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
                `authv1/user/${id}`,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
}
const authSvc=new AuthService()
export default authSvc