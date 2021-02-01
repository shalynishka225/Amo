import { Row, Col, Button, Checkbox, Divider, Result } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UploadAvatar } from "../components/UI/UploadAvatar";
import { UploadWorksList } from "../components/UI/UploadWorksList";
import Axios from "axios";
import { UploadCertificates } from "../components/UI/UploadCertificates";
import { SelectRegion } from "../components/UI/SelectRegion";
import { InputWithProps } from "../components/UI/InputWithProps";
import { Loader } from "./../components/Loader";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [about, setAbout] = useState("");
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [uploadedWorksFile, setUploadedWorksFile] = useState([]);
  const [uploadCertificates, setUploadCertificates] = useState([]);
  const [fetchedRegion, setFetchedRegion] = useState("");
  const [region, setRegion] = useState("");
  const [locality, setLocality] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreated, setIsCreaterd] = useState([]);
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

  const isWorkerCreated = useCallback(async () => {
    try {
      setLoading(true);
      const fetched = await request("/api/worker/my", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setIsCreaterd(!!fetched.length);
      setLoading(false);
    } catch (e) {}
  }, [token, request]);

  const fetchRegion = useCallback(async () => {
    try {
      const fetched = await Axios("https://api.hh.ru/areas/5");
      setFetchedRegion(fetched.data.areas);
    } catch (error) {}
  });

  useEffect(() => {
    fetchRegion();
    isWorkerCreated();
  }, [isWorkerCreated]);

  const submitHandler = async () => {
    try {
      setLoading(true);
      let updateWorks = [];
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      uploadedWorksFile.forEach((item, index) => {
        formData.append(`file${index}`, item);
      });

      const res = await Axios.post("/api/upload/works", formData, config);

      if (Boolean(res)) {
        res.data.map((file, index) => {
          updateWorks.push({
            name: uploadedWorksFile[index].name,
            file: file.secure_url,
          });
        });
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

      if (Boolean(resFiles)) {
        resFiles.data.map((file, index) => {
          updateFiles.push({
            name: uploadCertificates[index].name,
            file: file.public_id,
          });
        });
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
          Authorization: `Bearer ${token}`,
        },
      };

      Axios.post(
        "/api/worker/generate",
        {
          firstName,
          secondName,
          thirdName,
          about,
          checkTable: checkTable,
          avatar: updateAvatar,
          workPhoto: updateWorks,
          certificates: updateFiles,
          region,
          locality,
        },
        configData
      ).then(({ data }) => {
        history.push(`/detail/${data.CardId}`);
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (isCreated && !loading) {
    return (
      <Result
        status="error"
        title="Создание анкеты запрещено!"
        subTitle="Невозможно создать больше чем одну анкету."
        extra={[
          <Link to="workers/my" key="buttonError">
            <Button type="primary">Перейти к моей анкете</Button>
          </Link>,
        ]}
      ></Result>
    );
  }

  return (
    <Row style={{ justifyContent: "center" }}>
      <Col span={12}>
        <UploadAvatar
          uploadedFile={uploadedAvatar}
          state={setUploadedAvatar}
          preview={null}
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
        <UploadCertificates state={setUploadCertificates} preview={[]} />
        <p>Завантажте приклади робіт</p>
        <UploadWorksList state={setUploadedWorksFile} preview={[]} />

        <Divider />

        <Button
          type="primary"
          htmlType="submit"
          onClick={submitHandler}
          disabled={isCreated}
        >
          Создать
        </Button>
      </Col>
    </Row>
  );
};
