import { Row, Col, Button, Checkbox, Divider } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UploadAvatar } from "../components/UI/UploadAvatar";
import { UploadWorksList } from "../components/UI/UploadWorksList";
import Axios from "axios";
import { UploadCertificates } from "../components/UI/UploadCertificates";
import { SelectRegion } from "../components/UI/SelectRegion";
import { InputWithProps } from "../components/UI/InputWithProps";
import { Loader } from "./../components/Loader";

export const EditCard = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [firstName, setFirstName] = useState(props.worker.firstName);
  const [secondName, setSecondName] = useState(props.worker.secondName);
  const [thirdName, setThirdName] = useState(props.worker.thirdName);
  const [about, setAbout] = useState(props.worker.about);
  const [uploadedAvatar, setUploadedAvatar] = useState([props.worker.avatar]);
  const [uploadedWorksFile, setUploadedWorksFile] = useState(
    props.worker.workPhoto
  );
  const [uploadCertificates, setUploadCertificates] = useState(
    props.worker.certificates
  );
  const [fetchedRegion, setFetchedRegion] = useState("");
  const [region, setRegion] = useState(props.worker.region);
  const [locality, setLocality] = useState(props.worker.locality);
  const [loading, setLoading] = useState(false);
  const [checkTable, setCheckTable] = useState(props.worker.checkTable);

  useEffect(() => {
    const fetch = async () => {
      const response = await Axios("https://api.hh.ru/areas/5");
      setFetchedRegion(response.data.areas);
    };
    fetch();
  }, []);

  const submitHandler = async () => {
    try {
      setLoading(true);

      //WORKS FILES
      let updateWorks = [];
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      if (uploadedWorksFile.length) {
        uploadedWorksFile.forEach((item, index) => {
          if (!item.file) {
            formData.append(`file${index}`, item);
          }
        });

        const res = await Axios.post("/api/upload/works", formData, config);
        if (Boolean(res)) {
          res.data.map((file, index) => {
            updateWorks.push({
              name: uploadedWorksFile[index].name,
              file: file.secure_url,
            });
          });
          uploadedWorksFile.forEach((item) => {
            if (!item.path) {
              updateWorks.push(item);
            }
          });
        }
      }

      //CERTIFICATES
      let updateFiles = [];
      let updateFilesName = [];
      const formDataCertificates = new FormData();
      const configCertificates = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      if (uploadCertificates.length) {
        uploadCertificates.forEach((item, index) => {
          if (!item.file) {
            formDataCertificates.append(`file${index}`, item);
            updateFilesName.push(item.name);
          }
        });

        const res = await Axios.post(
          "/api/upload/certificates",
          formDataCertificates,
          configCertificates
        );
        if (Boolean(res)) {
          console.log(res.data);
          res.data.map((file, index) => {
            updateFiles.push({
              name: updateFilesName[index],
              file: file.public_id,
            });
          });

          uploadCertificates.forEach((item) => {
            if (!item.path) {
              updateFiles.push(item);
            }
          });
        }
      }

      //AVATAR

      let updateAvatar = uploadedAvatar[0];
      const formDataAvatar = new FormData();
      const configAvatar = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      if (updateAvatar.path) {
        formDataAvatar.append("avatar", updateAvatar);
        const resAvatar = await Axios.post(
          "/api/upload/avatar",
          formDataAvatar,
          configAvatar
        );
        if (Boolean(resAvatar)) {
          updateAvatar = resAvatar.data.secure_url;
        }
      }

      const configData = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      Axios.post(
        `/api/worker${history.location.pathname}`,
        {
          firstName: firstName,
          secondName: secondName,
          thirdName: thirdName,
          about: about,
          checkTable: checkTable,
          avatar: updateAvatar,
          workPhoto: updateWorks,
          certificates: updateFiles,
          region: region,
          locality: locality,
        },
        configData
      ).then(({ data }) => {
        history.push(`/detail/${data._id}`);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Row style={{ justifyContent: "center" }}>
      <Col span={12}>
        <UploadAvatar
          uploadedFile={uploadedAvatar}
          state={setUploadedAvatar}
          preview={props.worker.avatar}
        />
        <p>Заповніть відомості про себе</p>

        <InputWithProps
          title="Введіть ваше ім'я"
          id="firstName"
          placeholder="Ім'я"
          name={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <InputWithProps
          title="Введіть ваше прізвище"
          id="secondName"
          placeholder="Прізвище"
          name={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />

        <InputWithProps
          title="По-батькові"
          id="thirdName"
          placeholder="по-батькові"
          name={thirdName}
          onChange={(e) => setThirdName(e.target.value)}
        />

        {fetchedRegion.length ? (
          <SelectRegion
            data={fetchedRegion}
            region={setRegion}
            locality={setLocality}
            fetchedRegion={region}
            fetchedLocality={locality}
          />
        ) : (
          <Loader />
        )}
        <Divider />

        <p>Напишіть коротко про себе</p>
        <TextArea
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <Divider />
        <p>Виберіть свою професійну діяльність</p>
        <div className="ant-checkbox-group">
          <h3>Монтаж:</h3>

          {checkTable.map((checkbox, index) => {
            return (
              <Col key={index}>
                <Checkbox
                  onClick={(e) => {
                    let changedArray = checkTable;
                    changedArray[index].mounting = e.target.checked;
                    setCheckTable(changedArray);
                  }}
                  defaultChecked={checkbox.mounting}
                >
                  {checkbox.work}
                </Checkbox>
              </Col>
            );
          })}
        </div>

        <div className="ant-checkbox-group">
          <h3>Диагностика поломок и ремонт:</h3>
          {checkTable.map((checkbox, index) => {
            return (
              <Col key={index}>
                <Checkbox
                  onClick={(e) => {
                    let changedArray = checkTable;
                    changedArray[index].diagnostics = e.target.checked;
                    setCheckTable(changedArray);
                  }}
                  defaultChecked={checkbox.diagnostics}
                >
                  {checkbox.work}
                </Checkbox>
              </Col>
            );
          })}
        </div>

        <div className="ant-checkbox-group">
          <h3>Сервисное обслуживание:</h3>
          {checkTable.map((checkbox, index) => {
            return (
              <Col key={index}>
                <Checkbox
                  onClick={(e) => {
                    let changedArray = checkTable;
                    changedArray[index].service = e.target.checked;
                    setCheckTable(changedArray);
                  }}
                  defaultChecked={checkbox.service}
                >
                  {checkbox.work}
                </Checkbox>
              </Col>
            );
          })}
        </div>
        <Divider />

        <p>Вкажіть сертифікати якщо вони є</p>
        <UploadCertificates
          state={setUploadCertificates}
          preview={props.worker.certificates}
        />
        <p>Завантажте приклади робіт</p>
        <UploadWorksList
          state={setUploadedWorksFile}
          preview={props.worker.workPhoto}
        />

        <Divider />

        <Button
          type="primary"
          htmlType="submit"
          onClick={submitHandler}
          disabled={false}
        >
          Обновить
        </Button>
      </Col>
    </Row>
  );
};
