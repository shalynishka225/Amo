import React, {useState, useContext, useEffect, useCallback} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {WorkersList} from "../components/WorkersList";
import {Layout, Pagination} from "antd";
import {SiderMenu} from "../components/UI/SiderMenu";
import SideBar from './SideBar'
import Axios from "axios";

const usePagination = ({limit}) => {
    const [page, setPage] = useState(1);

    const onChangePage = (page) => {
        setPage(page);
    };

    return {
        page,
        payload: {skip: (page - 1) * limit, limit},
        onChangePage
    };
};

export const WorkersPage = () => {
    const {token} = useContext(AuthContext);
    const {Content} = Layout;
    const {request, loading} = useHttp();
    const [workers, setWorkers] = useState([]);
    const [total, setTotal] = useState(0)
    const {page, onChangePage, payload} = usePagination({limit: 9});
    const [fetchedRegion, setFetchedRegion] = useState([])

    const fetchWorkers = useCallback(async (limit, skip) => {
        try {
            const fetched = await request(`/api/worker/pagination?limit=${limit}&skip=${skip}`,
                "GET", null, {
                    Authorization: `Bearer ${token}`,
                });

            setWorkers(fetched.worker)
            setTotal(fetched.total)
        } catch (e) {
            console.log(e)
        }
    }, [token, request]);

    useEffect(() => {
        fetchWorkers(payload.limit, payload.skip);
    }, [payload.limit, payload.skip]);

    return (
        <Layout className="site-layout" style={{marginLeft: 200, height: "85vh",}}>
            <SideBar areas={fetchedRegion}/>
            <Content style={{overflow: "initial"}}>
                <div
                    className="site-layout-background"
                    style={{padding: 24, textAlign: "center"}}
                >
                    {loading ? <Loader/> :
                        <WorkersList workers={workers}/>}
                </div>
            </Content>
            <Pagination total={total} current={page} onChange={onChangePage}/>
        </Layout>
    )
}
