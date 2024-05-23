
import AdminBreadCrumb from "../admin-breadcrumb"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import React from "react"
import authSvc from "../../../pages/auth/auth.service"
import { Spinner,Image,Row,Col,Pagination } from "react-bootstrap"
import Swal from "sweetalert2"




const ListUser = () => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        count: 10
    })
    
    const listUser = async ({ limit = 15, page = 1 }) => {
        try {
            setLoading(true)
            const response=await authSvc.listAllUsers({limit,page})
            setData(response.result)

        }
        catch (exception) {
            toast.warning("Error loading cat data.....")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listUser({ limit: 15, page: 1 })
    }, [])

    const deletUser = async (id) => {

        try {
            setLoading(true)
            const response = await authSvc.deleteData(id)
            toast.success(response.message)
            listUser({ limit: 15, page: 1 })
        }
        catch (exception) {
            toast.error(exception.message)
           console.log(exception)
        }
        finally {
            setLoading(false)
        }
    }

    const confirmDelete = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((event) => {
                if (event.isConfirmed) {
                    deletUser(id)
                }
            });
        }
        catch (exception) {

        }
    }


    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb
                    pageTitle={"Users"}
                    actionUrl={"/user/create"}
                    buttonLabel={"Add user"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "List User", url: null },
                    ]}
                />

                <div className="row my-3">
                    <div className="col-12">
                        <h4>User List</h4>
                        <hr></hr>
                        <table className="table table-sm table-borderd">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Gmail</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th>#</th>

                                </tr>
                            </thead>
                            <tbody>
                                 {
                                    loading? <>
                                        <tr>
                                            <td colSpan={5}>
                                               <div className="text-center">
                                                <Spinner variant="success"/>
                                               </div>
                                            </td>
                                        </tr>
                                    </>:<>
                                        {
                                            data && data.map((users,inx)=>(
                                               <tr key={inx}>
                                                    <td>{users.name}</td>
                                                    <td>{users.email}</td>
                                                    <td>{users.status}</td>
                                                    <td>
                                                    <Image onError={(e) => {
                                                            e.target.src = "https://dummyimage.com/100/40/d4d4d4/7d7d7d&text=cat+Image"
                                                        }} src={import.meta.env.VITE_IMAGE_URL+ "/user/"+users.image} alt="" style={{ width: "50px" }} fluid sizes="sm" />
                                                    </td>
                                                    <td>
                                                        <NavLink onClick={(e) => {
                                                            e.preventDefault()
                                                            confirmDelete(users._id)
                                                        }} className={'btn btn-danger rounded-circle me-2'}>
                                                            <i className="fa fa-trash"></i>
                                                        </NavLink>
                                                        <NavLink to={'/admin/user/' + users._id + '/edit'} className={'btn btn-danger rounded-circle me-2'}>
                                                            <i className="fa fa-pen"></i>
                                                        </NavLink>
                                                    </td>
                                               </tr>
                                            ))
                                        }
                                    </>
                                 }
                            </tbody>
                        </table>
                        {
                            loading ? <></> : <>
                             <Row>
                                    <Col sm={12} >
                                        <Pagination className="float-end" size="sm">
                                            <Pagination.First disabled={pagination.page === 1 ? true : false} onClick={(e) => {

                                                listProducts({ limit:151, page: 1 })
                                            }} />
                                            <Pagination.Prev disabled={pagination.page === 1 ? true : false}onClick={(e)=>{
                                                            
                                                            listProducts({limit:15,page:(pagination.page-1)})
                                                        }}  />
                                            {
                                                [...Array(pagination.totalPages)].map((item, inx) => (
                                                    <React.Fragment key={inx}>




                                                        <Pagination.Item onClick={(e) => {

                                                            listProducts({ limit:15, page: inx + 1 })
                                                        }} key={inx}>{inx + 1}</Pagination.Item>

                                                    </React.Fragment>
                                                ))
                                            }

                                            <Pagination.Next disabled={
                                                (pagination.page === 1 && pagination.count>1)
                                             || pagination.count !== pagination.page ? false : true} onClick={(e)=>{
                                                            
                                                            listProducts({limit:15,page:(pagination.page+1)})
                                                        }} />
                                            <Pagination.Last disabled={(pagination.page === 1 && pagination.count>1) || pagination.count !== pagination.page ? false : true} onClick={(e)=>{
                                                            
                                                            listProducts({limit:15,page:(pagination.count)})
                                                        }} />

                                        </Pagination>
                                    </Col>
                                </Row>
                            </>
                   
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListUser