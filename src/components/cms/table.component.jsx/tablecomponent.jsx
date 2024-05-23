import {  Row, Col, Pagination } from "react-bootstrap"
import React from "react"

const TableComponent=()=>{
    return (
        <>
        {
                            loading ? <></> : <>
                                <Row>
                                    <Col sm={12} >
                                        <Pagination className="float-end" size="sm">
                                            <Pagination.First disabled={pagination.page === 1 ? true : false} onClick={(e) => {

                                                listBanner({ limit:151, page: 1 })
                                            }} />
                                            <Pagination.Prev disabled={pagination.page === 1 ? true : false}onClick={(e)=>{
                                                            
                                                            listBanner({limit:15,page:(pagination.page-1)})
                                                        }}  />
                                            {
                                                [...Array(pagination.totalPages)].map((item, inx) => (
                                                    <React.Fragment key={inx}>




                                                        <Pagination.Item onClick={(e) => {

                                                            listBanner({ limit:15, page: inx + 1 })
                                                        }} key={inx}>{inx + 1}</Pagination.Item>

                                                    </React.Fragment>
                                                ))
                                            }

                                            <Pagination.Next disabled={
                                                (pagination.page === 1 && pagination.count>1)
                                             || pagination.count !== pagination.page ? false : true} onClick={(e)=>{
                                                            
                                                            listBanner({limit:15,page:(pagination.page+1)})
                                                        }} />
                                            <Pagination.Last disabled={(pagination.page === 1 && pagination.count>1) || pagination.count !== pagination.page ? false : true} onClick={(e)=>{
                                                            
                                                            listBanner({limit:15,page:(pagination.count)})
                                                        }} />

                                        </Pagination>;
                                    </Col>
                                </Row>
                            </>
                        }
        </>
    )
}
export const PaginationComponent=({pagination,fetchData})=>{
    {
        loading ? <></> : <>
            <Row>
                <Col sm={12} >
                    <Pagination className="float-end" size="sm">
                        <Pagination.First disabled={pagination.page === 1 ? true : false} onClick={(e) => {

                            fetchData({ limit:151, page: 1 })
                        }} />
                        <Pagination.Prev disabled={pagination.page === 1 ? true : false}onClick={(e)=>{
                                        
                                        fetchData({limit:15,page:(pagination.page-1)})
                                    }}  />
                        {
                            [...Array(pagination.totalPages)].map((item, inx) => (
                                <React.Fragment key={inx}>




                                    <Pagination.Item onClick={(e) => {

                                        fetchData({ limit:15, page: inx + 1 })
                                    }} key={inx}>{inx + 1}</Pagination.Item>

                                </React.Fragment>
                            ))
                        }

                        <Pagination.Next disabled={
                            (pagination.page === 1 && pagination.count>1)
                         || pagination.count !== pagination.page ? false : true} onClick={(e)=>{
                                        
                                        fetchData({limit:15,page:(pagination.page+1)})
                                    }} />
                        <Pagination.Last disabled={(pagination.page === 1 && pagination.count>1) || pagination.count !== pagination.page ? false : true} onClick={(e)=>{
                                        
                                        fetchData({limit:15,page:(pagination.count)})
                                    }} />

                    </Pagination>;
                </Col>
            </Row>
        </>
    }
}