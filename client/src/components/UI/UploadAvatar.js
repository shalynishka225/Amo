import { Divider, message } from "antd";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export const UploadAvatar = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);

  const onDrop = async (files) => {
    const updateFiles = [...uploadFiles, files[0]];

    try {
      const isLt2M = files[0].size / 1024 / 1024 < 2;
      if (files[0].type === "image/jpeg" || files[0].type === "image/png") {
        if (isLt2M) {
          previewFile(files[0]);
          message.success(`${files[0].name}: загружен успешно`);
          setUploadFiles(updateFiles);
          props.state(updateFiles);
        } else {
          message.error("Файл должен быть меньше 2Mb");
        }
      } else {
        message.error("Вы можете загрузить только .png / .jpeg");
      }
    } catch (error) {
      message.error(`${files[0].name}: не загрузился.`);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  const deleteHandler = () => {
    setUploadFiles("");
    props.state("");
  };

  return (
    <div>
      <p>Виберіть свою фотографію</p>
      {props.uploadedFile ? (
        <span className="ant-upload-picture-card-wrapper">
          <div className="ant-upload-list-picture-card-container">
            <span>
              <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
                <div className="ant-upload-list-item-info">
                  <span>
                    <img
                      alt="avatar"
                      style={{ width: "96px", height: "96px" }}
                      src={previewSource}
                      className="ant-upload-list-item-image"
                    ></img>

                    <span className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1"></span>
                  </span>
                </div>
                <span
                  className="ant-upload-list-item-actions"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    title="Удалить фото"
                    type="button"
                    className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn"
                    onClick={deleteHandler}
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
                        data-icon="delete"
                        width="100%"
                        height="100%"
                        fill="#fff"
                        aria-hidden="true"
                      >
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </button>
                </span>
              </div>
            </span>
          </div>
        </span>
      ) : (
        <span className="ant-upload-picture-card-wrapper" {...getRootProps()}>
          <div className="ant-upload-list ant-upload-list-picture-card">
            <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
              <span className="ant-upload" role="button" tabIndex="0">
                <input
                  type="file"
                  {...getInputProps()}
                  accept="image/x-png,image/jpeg"
                />
                + Загрузить
              </span>
            </div>
          </div>
        </span>
      )}
      <Divider />
    </div>
  );
};
