import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Image } from 'cloudinary-react'

const columns = [
  {
    title: "Види робіт",
    dataIndex: "work",
  },
  {
    title: "Монтаж",
    dataIndex: "mounting",
    key: "mounting",
  },
  {
    title: "Діагностика поломок, ремонт",
    dataIndex: "diagnostics",
    key: "diagnostics",
  },
  {
    title: "Сервісне обслуговування",
    dataIndex: "service",
    key: "service",
  },
];

export const WorkerCard = ({ worker }) => {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      <div>
        <h2>Монтажник</h2>
        <p>Имя: {worker.firstName}</p>
        <p>Фамилия: {worker.secondName}</p>
        <p>Отчество: {worker.thirdName}</p>
        <article> {worker.about} </article>
        <img src={worker.avatar} />
        <Table columns={columns} dataSource={worker.checkTable} bordered />
        <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName= 'alliance-climat'
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>

        <p>
          Дата создания анкеты:
          <strong>{new Date(worker.date).toLocaleDateString()}</strong>
        </p>
      </div>
    </>
  );
};
