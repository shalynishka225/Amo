import React, { useState } from "react";
import { Button, message } from "antd";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";

export const UploadCertificates = (props) => {
  const [uploadFiles, setUploadFiles] = useState(props.preview);

  const onDrop = async (files) => {
    const updateFiles = [...uploadFiles, files[0]];

    try {
      const isLt2M = files[0].size / 1024 / 1024 < 2;
      if (
        files[0].type === "image/jpeg" ||
        files[0].type === "image/png" ||
        files[0].type === "application/pdf" ||
        files[0].type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        if (isLt2M) {
          message.success(`${files[0].name}: загружен успешно`);
          setUploadFiles(updateFiles);
          props.state(updateFiles);
        } else {
          message.error("Файл должен быть меньше 2Mb");
        }
      } else {
        message.error(
          "Вы можете загрузить только .pdf/ .docx / .doc / .png / .jpeg"
        );
      }
    } catch (error) {
      message.error(`${files[0].name}: не загрузился.`);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
  });

  const deleteHandler = (index) => {
    const arr = uploadFiles.slice();
    arr.splice(index, 1);
    message.success("файл успешно удалён");
    setUploadFiles(arr);
    props.state(arr);
  };

  return (
    <div>
      <div {...getRootProps()} className="ant-upload-list ant-upload-list-text">
        {uploadFiles.length < 5 ? (
          <div>
            <input
              icon={<UploadOutlined />}
              {...getInputProps()}
              accept="application/pdf"
            />
            <Button icon={<CloudUploadOutlined />}>Загрузить</Button>
          </div>
        ) : (
          <p>Не можливо завантижити більше ніж 5 файлів</p>
        )}
      </div>
      {uploadFiles ? (
        <span>
          {uploadFiles.map((item, index) => {
            return (
              <div className="ant-upload-list ant-upload-list-text" key={index}>
                <div className="">
                  <span>
                    <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-text">
                      <div className="ant-upload-list-item-info">
                        <span>
                          <div className="ant-upload-text-icon">
                            <span
                              role="img"
                              aria-label="paper-clip"
                              className="anticon anticon-paper-clip"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                className=""
                                data-icon="paper-clip"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path>
                              </svg>
                            </span>
                          </div>
                          <span
                            id="fileInfo"
                            className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1"
                            title="diplom_277.pdf"
                          >
                            {item.name}
                          </span>
                          <span className="ant-upload-list-item-card-actions">
                            <button
                              title="Удалить файл"
                              type="button"
                              className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn"
                              onClick={() => deleteHandler(index)}
                            >
                              <span
                                role="img"
                                aria-label="delete"
                                tabIndex="-1"
                                className="anticon anticon-delete"
                              >
                                <svg
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  className=""
                                  data-icon="delete"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                                </svg>
                              </span>
                            </button>
                          </span>
                        </span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            );
          })}
        </span>
      ) : null}
    </div>
  );
};

//setUploadFiles([...uploadFiles, files[0]])

// const formData = new FormData();
//         const config = {
//           headers: {
//             "content-type": "multipart/form-data",
//           },
//         };
//         formData.append("file", files[0]);

//         const res = await Axios.post("/api/upload", formData, config);

//         if (Boolean(res)) {
//           props.state(res.data);
//         }
