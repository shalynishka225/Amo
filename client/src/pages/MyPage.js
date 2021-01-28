import React, { useState, useContext, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { CardListWorker } from "../components/UI/CardListWorker";
import { Button } from "antd";
import { Empty } from "antd";

export const MyPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [workers, setWorkers] = useState("");
  const [loadingPage, setLoadingPage] = useState(loading);

  const fetchWorkers = useCallback(async () => {
    try {
      const fetched = await request("/api/worker/my", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setWorkers(fetched);
    } catch (e) {}
  }, [token, request]);

  const handleDeleteCard = useCallback(
    async (userId) => {
      try {
        const fetched = await request(`/api/worker/${userId}`, "DELETE", null, {
          Authorization: `Bearer ${token}`,
        });
        setWorkers(fetched);
      } catch (error) {
        console.log(error);
      }
    },
    [token, request]
  );

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  if (loadingPage) {
    return <Loader />;
  }

  return (
    <>
      {workers.length ? (
        <CardListWorker
          state={workers}
          loading={setLoadingPage}
          onDelete={handleDeleteCard}
        />
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
