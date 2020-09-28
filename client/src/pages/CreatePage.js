import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Upload,
  Row,
  Col,
  Input,
  Tooltip,
  Button,
  Checkbox,
  Divider,
} from "antd";
import axios from 'axios';
import ImgCrop from "antd-img-crop";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import { useHistory } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const CLOUDINARY_UPLOAD_PRESET = "example";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alliance-climat";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [about, setAbout] = useState("");
  const [checkTable, setCheckTable] = useState([
    {
      key: "1",
      work: "Побутові",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "2",
      work: "Напівпромислові",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "3",
      work: "Промислові",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "4",
      work: "КББ",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "5",
      work: "Вентиляція",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "6",
      work: "Теплові насоси",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "7",
      work: "Системи опалення",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "8",
      work: "Бойлери",
      mounting: false,
      diagnostics: false,
      service: false,
    },
    {
      key: "9",
      work: "Газові колонки, котли",
      mounting: false,
      diagnostics: false,
      service: false,
    },
  ]);
  const [avatarList, setAvatarList] = useState([]);
  const [file, setFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [workPhotoList, setWorkPhotoList] = useState([]);

  const { request } = useHttp();

  const onUploadFile = async (files) => {
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    formData.append('file', files[0]);

    const res = await axios.post(
      "/api/upload",
      formData,
      config,
    );

    if (Boolean(res)) {
      setUploadedFile(res.data)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onUploadFile });

  console.log(uploadedFile)

  const submitHandler = async () => {
    try {
      const data = await request(
        "/api/worker/generate",
        "POST",
        {
          firstName: firstName,
          secondName: secondName,
          thirdName: thirdName,
          about: about,
          checkTable: checkTable,
          avatar: avatarList[0].thumbUrl,
          //workPhoto: workPhotoList,
          files: file,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      if (!avatarList[0].thumbUrl) return;
      console.log(workPhotoList);
      uploadImage(avatarList[0].thumbUrl);
      workPhotoList.map((photo,key) => {
       uploadImage(photo.thumbUrl)
      })
      history.push(`/detail/${data.worker._id}`);
    } catch (e) {}
  };

  const uploadImage = async (base64EncodedImage) => {
    //console.log(base64EncodedImage);
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFiles = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "Загрузка") {
        setFile(fileList);
      }
    },
  };

  // const uploadFileHandler = (file) => {
  //   const formData = new FormData();
  //       formData.append('file', file);
  //       formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  //       axios({
  //         url: CLOUDINARY_URL,
  //         method: "POST",
  //         headers: {
  //           'Content-Type' : 'application/x-www-form-urlencoded'
  //         },
  //         data: formData
  //       }).then(function(res) {
  //         console.log(res)
  //       }).catch(function(err) {
  //         console.log(err)
  //       })
  // }

  const onChangeAvatar = ({ fileList: newFileList }) => {
    setAvatarList(newFileList);
  };

  const onChangeWorkPhoto = ({fileList: newFileList}) => {
    setWorkPhotoList(newFileList);
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Row>
      <Col span={6} offset={10} className="myClass">
        <p>Виберіть свою фотографію</p>
        <ImgCrop rotate>
          {/* <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={avatarList}
            onChange={onChangeAvatar}
            onPreview={onPreview}
          >
            {avatarList.length < 1 && "+ Загрузить"}
          </Upload> */}
          {uploadedFile ? <img src={uploadedFile.url}/> : <div {...getRootProps()}>
            lkjkdfjkalfl;wqkfkl;qwe
            <input {...getInputProps()}/>
          </div>}
        </ImgCrop>

        <Divider />

        <p>Заповніть відомості про себе</p>

        <Input
          placeholder="Ім'я"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="firstName"
          type="text"
          suffix={
            <Tooltip title="Введіть ваше ім'я">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />

        <Input
          placeholder="Прізвище"
          name="secondName"
          id="secondName"
          type="text"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          suffix={
            <Tooltip title="Введіть ваше прізвище">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />

        <Input
          placeholder="по-батькові"
          name="thirdName"
          id="thirdName"
          type="text"
          value={thirdName}
          onChange={(e) => setThirdName(e.target.value)}
          suffix={
            <Tooltip title="Введіть ваше по-батькові">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
        <Divider />

        <p>Напишіть коротко про себе</p>
        <TextArea
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <Divider />
        <p>Виберіть свою професійну діяльність</p>

        <Checkbox.Group style={{ width: "100%" }}>
          <h3>Монтаж:</h3>
          <Row>
            <Col>
              <Checkbox
                value="M-1"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[0].mounting = "<CheckCircleOutlined />";
                  setCheckTable(changedArray);
                }}
              >
                бытовые кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-2"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[1].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                полупромышленные кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-3"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[2].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                промышленные кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-4"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[3].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                ККБ
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-5"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[4].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                вентиляция
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-6"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[5].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                тепловые насосы
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-7"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[6].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                системы отопления
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-8"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[7].mounting = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                бойлеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="M-9"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[8].mounting = e.target.checked;
                  setCheckTable(changedArray);
                  console.log(checkTable);
                }}
              >
                газовые колонки, котлы
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Divider />
        <Checkbox.Group style={{ width: "100%" }}>
          <h3>диагностика поломок и ремонт:</h3>
          <Row>
            <Col>
              <Checkbox
                value="D-1"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[0].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                бытовые кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-2"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[1].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                полупромышленные кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-3"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[2].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                промышленные кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-4"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[3].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                ККБ
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-5"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[4].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                вентиляция
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-6"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[5].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                тепловые насосы
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-7"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[6].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                системы отопления
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-8"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[7].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                бойлеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="D-9"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[8].diagnostics = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                газовые колонки, котлы
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Divider />
        <Checkbox.Group style={{ width: "100%" }}>
          <h3>сервисное обслуживание:</h3>
          <Row>
            <Col>
              <Checkbox
                value="S-1"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[0].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                бытовые кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-2"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[1].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                полупромышленные кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-3"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[2].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                промышленные кондиционеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-4"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[3].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                ККБ
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-5"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[4].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                вентиляция
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-6"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[5].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                тепловые насосы
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-7"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[6].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                системы отопления
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-8"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[7].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                бойлеры
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="S-9"
                onClick={(e) => {
                  let changedArray = checkTable;
                  changedArray[8].service = e.target.checked;
                  setCheckTable(changedArray);
                }}
              >
                газовые колонки, котлы
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Divider />

        <p>Вкажіть сертифікати якщо вони є</p>
        <Upload {...uploadFiles}>
          <Button icon={<UploadOutlined />}>Натисніть для загрузки</Button>
        </Upload>

        <Divider />

        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={workPhotoList}
            onChange={onChangeWorkPhoto}
            onPreview={onPreview}
          >
            {workPhotoList.length < 5 && "+ Upload"}
          </Upload>
        </ImgCrop>

        <Divider />
        <Button type="primary" htmlType="submit" onClick={submitHandler}>
          Создать
        </Button>
      </Col>
    </Row>
  );
};

// export const CreatePage = () => {
//     const [ worker, setWorker ] = useState('');

//     return (

//     )
// }
