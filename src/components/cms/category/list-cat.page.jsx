import { NavLink } from "react-router-dom"
import AdminBreadCrumb from "../admin-breadcrumb"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CatSvc from "./cat.service"
import LoadingComponent from "../../common/laoding/loading..component"
import { Image, Row, Col, Pagination } from "react-bootstrap"
import React from "react"
import Swal from "sweetalert2"


const ListCategory = () => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        count: 10
    })

    const listCategory = async ({ limit = 15, page = 1 }) => {
        try {
            setLoading(true)

            //api call
            const catList = await CatSvc.listAllcats({ limit: limit, page: page })
            console.log("catlistresult",catList.result)
            setData(catList.result)
            const totalPages = Math.ceil(catList.meta.count / catList.meta.limit)
            setPagination({
                page: +catList.meta.page,
                limit: +catList.meta.limit,
                count: totalPages,
            })

        }
        catch (exception) {
            toast.warning("Error loading cat data.....")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listCategory({ limit: 15, page: 1 })
    }, [])

    const deletecat = async (id) => {

        try {
            setLoading(true)
            const response = await CatSvc.deleteData(id)
            toast.success(response.message)
            listCategory({ limit: 15, page: 1 })
        }
        catch (exception) {
            toast.error("Error while deleting cat")
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
                    deletecat(id)
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
                    pageTitle={"Category"}
                    actionUrl={"/category/create"}
                    buttonLabel={"Add Category"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "List Category", url: null },
                    ]}
                />

                <div className="row my-3">
                    <div className="col-12">
                        <h4>Category List</h4>
                        <hr></hr>
                        <table className="table table-sm table-borderd">
                            <thead className="table-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>ParentId</th>
                                    <th>Image</th>
                                    <th>ShowInHome</th>
                                    <th>ShowInMenu</th>
                                    <th>#</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <>
                                        <tr>
                                            <td colSpan={5}>
                                                <LoadingComponent />
                                            </td>
                                        </tr>
                                    </> : <>
                                        {

                                            data && data.map((row, ind) => (
                                                <tr key={ind}>
                                                    <td>{row.name}</td>

                                                    <td>
                                                        <span className={`badge text-bg-${row.status === 'active' ? 'success' : 'danger'}`}>
                                                            {row.status === "active" ? "Published" : "Un-Published"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                      
                                                        {row.parentId}
                                                    </td>
                                                    <td>
                                                        <Image onError={(e) => {
                                                            e.target.src = "https://dummyimage.com/100/40/d4d4d4/7d7d7d&text=cat+Image"
                                                        }} src={import.meta.env.VITE_IMAGE_URL+ "/cat/"+row.image} alt="" style={{ width: "50px" }} fluid sizes="sm" />
                                                    </td>
                                                    <td>
                                                        {row.showInHome ? "Yes" : "No"}
                                                    </td>
                                                    <td>
                                                        {row.showInMenu ? "Yes" : "No"}
                                                    </td>
                                                    <td>
                                                        <NavLink onClick={(e) => {
                                                            e.preventDefault()
                                                            confirmDelete(row._id)
                                                        }} className={'btn btn-danger rounded-circle me-2'}>
                                                            <i className="fa fa-trash"></i>
                                                        </NavLink>
                                                        <NavLink to={'/admin/category/' + row._id + '/edit'} className={'btn btn-danger rounded-circle me-2'}>
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

                                                listCategory({ limit: 151, page: 1 })
                                            }} />
                                            <Pagination.Prev disabled={pagination.page === 1 ? true : false} onClick={(e) => {

                                                listCategory({ limit: 15, page: (pagination.page - 1) })
                                            }} />
                                            {
                                                [...Array(pagination.totalPages)].map((item, inx) => (
                                                    <React.Fragment key={inx}>




                                                        <Pagination.Item onClick={(e) => {

                                                            listCategory({ limit: 15, page: inx + 1 })
                                                        }} key={inx}>{inx + 1}</Pagination.Item>

                                                    </React.Fragment>
                                                ))
                                            }

                                            <Pagination.Next disabled={
                                                (pagination.page === 1 && pagination.count > 1)
                                                    || pagination.count !== pagination.page ? false : true} onClick={(e) => {

                                                        listCategory({ limit: 15, page: (pagination.page + 1) })
                                                    }} />
                                            <Pagination.Last disabled={(pagination.page === 1 && pagination.count > 1) || pagination.count !== pagination.page ? false : true} onClick={(e) => {

                                                listCategory({ limit: 15, page: (pagination.count) })
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
export default ListCategory