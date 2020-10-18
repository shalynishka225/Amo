import React from "react";
import { Table } from "antd";
import { Image } from "cloudinary-react";
import Transformation from "cloudinary-react/lib/components/Transformation";
import CloudinaryContext from "cloudinary-react/lib/components/CloudinaryContext";
import { CheckCircleOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Види робіт",
    dataIndex: "work",
    width: 100,
  },
  {
    title: "Монтаж",
    dataIndex: "mounting",
    key: "mounting",
    width: 100,
  },
  {
    title: "Діагностика поломок, ремонт",
    dataIndex: "diagnostics",
    key: "diagnostics",
    width: 100,
  },
  {
    title: "Сервісне обслуговування",
    dataIndex: "service",
    key: "service",
    width: 100,
  },
];



export const WorkerCard = ({ worker }) => {
  
  
  worker.checkTable.map(item => {
    if(item.service) {
      item.service = <CheckCircleOutlined />
    }
    if(item.mounting) {
      item.mounting = <CheckCircleOutlined />
    }
    if(item.diagnostics) {
      item.diagnostics = <CheckCircleOutlined />
    }
  })


  return (
    <>
      {console.log(worker)}
      <div>
        <h2>Монтажник</h2>
        <p>Имя: {worker.firstName}</p>
        <p>Фамилия: {worker.secondName}</p>
        <p>Отчество: {worker.thirdName}</p>
        <article> {worker.about} </article>

        <div>
        <CloudinaryContext cloudName="alliance-climat">
        <Image
              src={worker.avatar}
              width="300"
              crop="scale"
              alt="avatar"
            >
              <Transformation
                crop="thumb"
              />
          </Image>
          </CloudinaryContext>

          
          <CloudinaryContext cloudName="alliance-climat">
            

            {worker.certificates.map((file, index) => {
              return (
                <Image publicId={file} key={index} style={{ margin: 10 }}>
                  <Transformation
                    width="300"
                    height="450"
                    crop="scale"
                    fetchFormat="auto"
                  />
                </Image>
              );
            })}
          </CloudinaryContext>
        </div>
        <Table columns={columns} dataSource={worker.checkTable} pagination={false} table-layout='fixed' bordered />
        <div className="gallery" style={{margin: '0 auto', width: '100%'}}>
          {worker.workPhoto &&
            worker.workPhoto.map((image, index) => (
              <Image
                style={{margin: '10px'}}
                key={index}
                cloudName="alliance-climat"
                src={image}
                width="300"
                height="300"
                crop="scale"
                alt="workPhoto"
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
