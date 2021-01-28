import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { EditCard } from "../components/EditCard";

export const EditPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [worker, setWorker] = useState(null);
  const workerId = useParams().id;

  const getWorker = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/worker/edit/${workerId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setWorker(fetched);
    } catch (e) {}
  }, [token, workerId, request]);

  useEffect(() => {
    getWorker();
  }, [getWorker]);

  if (loading) {
    return <Loader />;
  }
  return <>{!loading && worker && <EditCard worker={worker} />}</>;
};
