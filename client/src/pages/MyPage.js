import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { WorkerForm } from '../components/UI/WorkerForm';
import { Button, Empty } from 'antd';

export const MyPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [workers, setWorkers] = useState('');

  const fetchWorkers = useCallback(async () => {
    try {
      const fetched = await request('/api/worker/my', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setWorkers(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {workers.length ? (
        <WorkerForm state={workers} />
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>Нет созданых анкет</span>}
        >
          <Button type="primary" href="/create">
            Создать сейчас
          </Button>
        </Empty>
      )}
    </>
  );
};
