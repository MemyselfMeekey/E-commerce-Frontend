import React from "react"
import HomeHeader from "../../components/home/home-header.component"
class LandingPage extends React.Component{
    constructor(){
        //first call and always runs beofre return
        super()
        this.state={
            productList:null,
            pageTitle:"About This Page"
        }
    }
    componentDidMount=()=>{
        setTimeout(()=>{
            //state change
            this.setState({
                ...this.state,
                pageTitle:"I am changed after three second of load"
            })
        },3000)
    }
    componentDidUpdate=()=>{
            
    }
    componentWillUnmount=()=>{

    }
    render=()=>{
        return(<>
        <HomeHeader></HomeHeader>
        <h4>{this.state.pageTitle}</h4>
        {
            this.state.productList  
        }
        </>)
    }
}
export default LandingPage