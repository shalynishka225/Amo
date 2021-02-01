import React, {useState, useContext, useEffect, useCallback} from "react";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {WorkersList} from "../components/WorkersList";
import {Layout,Empty, Pagination} from "antd";
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
    const [workers, setWorkers] = useState([]);
    const [total, setTotal] = useState(0)
    const {page, onChangePage, payload} = usePagination({limit: 9});
    const [fetchedRegion, setFetchedRegion] = useState([]);
    const [region, setRegion] = useState(null);
    const [locality, setLocality] = useState(null);
    const [surName, setSurName] = useState(null);

    const fetchWorkers = useCallback(async (limit, skip, region, locality, surname) => {
        try {
             await Axios({
                method: "GET",
                url: "/api/worker/pagination",
                params: {
                    limit,
                    skip,
                    region,
                    locality,
                    surname
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json; charset=utf-8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }).then(
                (response) => {
                    setWorkers(response.data.worker)
                    setTotal(response.data.total + 2)
                })
        } catch (e) {
            console.log(e)
        }
    }, []);

    useEffect(() => {
        fetchWorkers(payload.limit, payload.skip, region, locality, surName);
    }, [payload.limit, payload.skip, region, locality, surName]);

    useEffect(() => {
        (async () => {
            const res = await Axios("https://api.hh.ru/areas/5");
            setFetchedRegion(res.data.areas);
        })();
    }, []);

    return (
        <Layout className="site-layout" style={{marginLeft: 200, height: "85vh"}}>
            <SideBar
                areas={fetchedRegion}
                region={setRegion}
                locality={setLocality}
                surName={setSurName}
            />
            <Content style={{overflow: "initial"}}>
                <div
                    className="site-layout-background"
                    style={{padding: 24, textAlign: "center"}}
                >
                    { workers.length ? <WorkersList workers={workers}/>  : (workers.length === 0 ? <Empty /> : <Loader/>) }
                </div>
            </Content>
            {workers.length !== 0 ? <Pagination total={total} current={page} onChange={onChangePage}/> : null }
        </Layout>
    )
}
