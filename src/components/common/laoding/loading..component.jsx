import { Spinner } from "react-bootstrap"

const LoadingComponent=()=>{
    return(
        <>
        <div className="my-3 text-center">
        <Spinner variant="success" size="lg"/>
       
        </div>
        </>
    )
}
export default LoadingComponent