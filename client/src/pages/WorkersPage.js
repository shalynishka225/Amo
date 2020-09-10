import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { WorkersList } from '../components/WorkersList';

export const WorkersPage = () => {

    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [workers, setWorkers] = useState(['']);
    
    const fetchWorkers = useCallback(async () => {
      try {
        const fetched = await request('/api/worker', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        console.log(fetched);
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
        {!loading && workers && <WorkersList workers={workers} />}
      </>
    )
  }