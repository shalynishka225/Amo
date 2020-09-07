import React, {useState, useContext} from 'react';
import { Upload, Row, Col, Input, Tooltip, Button, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';


export const CreatePage = () => {

  const auth = useContext(AuthContext);

  const {request} = useHttp();

  const pressHandler = async event => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/worker/generate', 'POST', {from: firstNameWorker, to:firstNameWorker, code:'fdgdfgdfg'}, {
          authorization: `Bearer ${auth.token}`
        });
        console.log(data);
      } catch (e) {
        
      }
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

    const [firstNameWorker, setNameWorker] = useState('');
  
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
            value={ firstNameWorker }
            onChange={e => setNameWorker(e.target.value)}
            id="firstName"
            type="text"
            onKeyPress={pressHandler}
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
        <p>Вкажіть сертифікати якщо вони є</p>
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Натисніть для загрузки</Button>
        </Upload>

        <Button type="primary" htmlType="submit" >
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