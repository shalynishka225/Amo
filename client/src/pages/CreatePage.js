import React, {useState} from 'react';
import { Upload, Row, Col, Card, Space, Input, Tooltip, Descriptions, Table, Button, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { InfoCircleOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';


//avatar upload
export const CreatePage = () => {
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
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
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
      
      </Col>
      </Row>
    );
  };

  

// export const CreatePage = () => {
//     const [ worker, setWorker ] = useState('');

//     return (
        
//     )
// }