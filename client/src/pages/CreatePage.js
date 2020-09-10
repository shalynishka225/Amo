import React, {useState, useContext} from 'react';
import { Upload, Row, Col, Input, Tooltip, Button, message, Checkbox, Divider } from 'antd';
import ImgCrop from 'antd-img-crop';
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');

  const {request} = useHttp();


  const submitHandler = async () => {
    
      try {

        const data = await request('/api/worker/generate', 'POST', {firstName: firstName, secondName: secondName, thirdName: thirdName}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.worker._id}`);
        console.log(data);
      } catch (e) {
        
      }

  }

//avatar upload
    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: '',
        status: 'done',
        url: '',
      },
    ]);
  
    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
  
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };

    //file upload 

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'Загрузка') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} Файл успешно загружен`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} Ошибка загрузки.`);
          }
        },
      };
  
    return (
    <Row>
      <Col span={6} offset={10} className="myClass">
          <p>Виберіть свою фотографію</p>
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Загрузить'}
        </Upload>
      </ImgCrop>
      <p>Заповніть відомості про себе</p>

        <Input
            placeholder="Ім'я" 
            name="firstName"
            value={ firstName }
            onChange={e => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            suffix={
                <Tooltip title="Введіть ваше ім'я">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
        />

        <Input
            placeholder="Прізвище" 
            name="secondName"
            id="secondName"
            type="text"
            value={ secondName }
            onChange={e => setSecondName(e.target.value)}
            suffix={
                <Tooltip title="Введіть ваше прізвище">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
        />

        <Input
            placeholder="по-батькові" 
            name="thirdName"
            id="thirdName"
            type="text"
            value={ thirdName }
            onChange={e => setThirdName(e.target.value)}
            suffix={
                <Tooltip title="Введіть ваше по-батькові">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
        />
        <br/>
        <br/>
        <p>Напишіть коротко про себе</p>
        <TextArea 
        rows={4}
        
        />
        <p>Виберіть свою професійну діяльність</p>
        <Checkbox.Group style={{ width: '100%' }}>
        <h3>Монтаж:</h3>
    <Row>
      <Col >
        <Checkbox value="A">бытовые кондиционеры</Checkbox>
      </Col>
      <Col>
        <Checkbox value="B">полупромышленные кондиционеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="C">промышленные кондиционеры, ККБ</Checkbox>
      </Col>
      <Col >
        <Checkbox value="D">вентиляция</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">тепловые насосы</Checkbox>
      </Col>
      <Col >
      <Checkbox value="">системы отопления</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">бойлеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">газовые колонки, котлы</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
  <Divider />
  <Checkbox.Group style={{ width: '100%' }}>
        <h3>диагностика поломок и ремонт:</h3>
    <Row>
      
      <Col>
        <Checkbox value="A">бытовые кондиционеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="B">полупромышленные кондиционеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="C">промышленные кондиционеры, ККБ</Checkbox>
      </Col>
      <Col >
        <Checkbox value="D">вентиляция</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">тепловые насосы</Checkbox>
      </Col>
      <Col >
      <Checkbox value="">системы отопления</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">бойлеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">газовые колонки, котлы</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
  <Divider />
  <Checkbox.Group style={{ width: '100%' }}>
        <h3>сервисное обслуживание:</h3>
    <Row>
      
      <Col>
        <Checkbox value="A">бытовые кондиционеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="B">полупромышленные кондиционеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="C">промышленные кондиционеры, ККБ</Checkbox>
      </Col>
      <Col >
        <Checkbox value="D">вентиляция</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">тепловые насосы</Checkbox>
      </Col>
      <Col >
      <Checkbox value="">системы отопления</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">бойлеры</Checkbox>
      </Col>
      <Col >
        <Checkbox value="E">газовые колонки, котлы</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
  <br />
  

  
        <p>Вкажіть сертифікати якщо вони є</p>
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Натисніть для загрузки</Button>
        </Upload>

        <Button type="primary" htmlType="submit" onClick={submitHandler} >
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