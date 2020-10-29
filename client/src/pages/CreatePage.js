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
      work: "Бытовые кондиционеры",
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
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [uploadedWorksFile, setUploadedWorksFile] = useState([]);
  const [uploadCertificates, setUploadCertificates] = useState([]);
  const [fetchedRegion, setFetchedRegion] = useState("");
  const [region, setRegion] = useState("");
  const [locality, setLocality] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const response = await Axios("https://api.hh.ru/areas/5");
      setFetchedRegion(response.data.areas);
    };
    fetch();
  }, []);

  const submitHandler = async () => {
    try {
      let updateWorks = [];
      const formData = new FormData();
      const config = {
        onUploadProgress: (progressEvent) => {
          //const {loaded, total} = progressEvent;
          //let percent = Math.floor( loaded * 100 / total );
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      uploadedWorksFile.forEach((item, index) => {
        formData.append(`file${index}`, item);
      });

      const res = await Axios.post("/api/upload/works", formData, config);

      if (Boolean(res)) {
        res.data.map((file) => updateWorks.push(file.secure_url));
      }

      let updateFiles = [];
      const formDataCertificates = new FormData();
      const configCertificates = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      uploadCertificates.forEach((item, index) => {
        formDataCertificates.append(`file${index}`, item);
      });

      const resFiles = await Axios.post(
        "/api/upload/certificates",
        formDataCertificates,
        configCertificates
      );
      //console.log(resFiles.data[0])

      if (Boolean(resFiles)) {
        resFiles.data.map((file) => updateFiles.push(file.public_id));
      }

      let updateAvatar = uploadedAvatar[0];
      const formDataAvatar = new FormData();
      formDataAvatar.append("avatar", updateAvatar);
      const configAvatar = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const resAvatar = await Axios.post(
        "/api/upload/avatar",
        formDataAvatar,
        configAvatar
      );

      if (Boolean(resAvatar)) {
        updateAvatar = resAvatar.data.secure_url;
      }

      const configData = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const data = await Axios.post(
        "/api/worker/generate",
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
      );

      console.log(data.data);
      history.push(`/detail/${data.data._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row style={{ justifyContent: "center" }}>
      <Col span={12}>
        <UploadAvatar uploadedFile={uploadedAvatar} state={setUploadedAvatar} />

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
        <Checkbox.Group>
          <h3>Монтаж:</h3>
          {checkTable.map((checkbox, index) => {
            return (
              <Col key={index}>
                <Checkbox
                  value={"M-" + index + 1}
                  onClick={(e) => {
                    let changedArray = checkTable;
                    changedArray[index].mounting = e.target.checked;
                    setCheckTable(changedArray);
                  }}
                >
                  {checkbox.work}
                </Checkbox>
              </Col>
            );
          })}
        </Checkbox.Group>

        <Checkbox.Group>
          <h3>Диагностика поломок и ремонт:</h3>
          {checkTable.map((checkbox, index) => {
            return (
              <Col key={index}>
                <Checkbox
                  value={"D-" + index + 1}
                  onClick={(e) => {
                    let changedArray = checkTable;
                    changedArray[index].diagnostics = e.target.checked;
                    setCheckTable(changedArray);
                  }}
                >
                  {checkbox.work}
                </Checkbox>
              </Col>
            );
          })}
        </Checkbox.Group>

        <Checkbox.Group>
          <h3>Сервисное обслуживание:</h3>
          {checkTable.map((checkbox, index) => {
            return (
              <Col key={index}>
                <Checkbox
                  value={"S-" + index + 1}
                  onClick={(e) => {
                    let changedArray = checkTable;
                    changedArray[index].service = e.target.checked;
                    setCheckTable(changedArray);
                  }}
                >
                  {checkbox.work}
                </Checkbox>
              </Col>
            );
          })}
        </Checkbox.Group>
        <Divider />

        <p>Вкажіть сертифікати якщо вони є</p>
        <UploadCertificates state={setUploadCertificates} />
        <p>Завантажте приклади робіт</p>
        <UploadWorksList state={setUploadedWorksFile} />

        <Divider />

        <Button type="primary" htmlType="submit" onClick={submitHandler}>
          Создать
        </Button>
      </Col>
    </Row>
  );
};
