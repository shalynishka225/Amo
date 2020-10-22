import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { WorkersList } from '../components/WorkersList';
import {CardList} from "../components/UI/CardList";
import {CardListWorker} from "../components/UI/CardListWorker";

export const MyPage = () => {

    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [workers, setWorkers] = useState('');
    
    const fetchWorkers = useCallback(async () => {
      try {
        const fetched = await request('/api/worker/my', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setWorkers(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
    fetchWorkers()
    }, [fetchWorkers])
  
    if (loading) {
      return <Loader/>
    }


    return (
      <>
        {workers.length && <CardListWorker state={workers} />}
      </>
    )
}