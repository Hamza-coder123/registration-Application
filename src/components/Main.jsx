import { Button, Form, Input, Row, message, Col,Modal,  Select, Upload,  Layout, Space,  } from 'antd';
import Title from 'antd/es/typography/Title';
import ImgCrop from 'antd-img-crop';
import React, { useState,  } from 'react';
import axios from "axios"
import {PlusOutlined, LoadingOutlined} from "@ant-design/icons"
import logo from "../HyphenLogo.png"
import jsPDF from "jspdf"
import QRCode from "qrcode-generator";
const {Option} = Select;

const rowStyle ={
  display: "flex",
  marginTop: 270 ,
  alignItems: "center"
}

const inputStyle ={
  width: 400,
  marginLeft: 120,
  height: 50,
  fontWeight: 400,
  border: "1px solid #3d3c41"
}
const formStyle ={
  marginLeft: 120,
  color: "#f4801c",
  fontSize: 13
}

const Style ={
  marginTop: 0,

}
const Style1 ={
  marginLeft: 190,
  width: 925,
  height: 50,
  border: "1px solid #3d3c41"
}
const input1Style ={
   width: 400,
  marginLeft: 120,
  fontSize: 50,
   height: 42, 
   borderColor: "none",
   borderRadius: 7,
  border: "1px solid #3d3c41",
  backgroundColor: "transparent",

}
const select1Style ={
    width: 920,
    marginLeft: 190,
    height: 42,
    borderRadius: 7,
    border: "1px solid #3d3c41"
}
const uploadStyle ={
    marginLeft: 200,
    color: '#f4801c',
    fontSize: 14
}
const imgeStyle ={
    marginLeft: 230,
    width: 130,
    height: 120,
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    border: "1px solid #3d3c41"
    
}
const HeaderStyle ={
    marginLeft: 20,
    backgroundColor: "white"
}
const pointsStyle ={
  marginLeft: 390,
  color: "#666",
  fontSize: 13,
  marginTop: -43
}
const GuideStyle ={
  marginTop: 210,
  marginLeft: 210
}
const Guide2Style ={
  marginTop: -5,
  marginLeft: 210
}
const Guide3Style ={
  marginLeft: 210,
  marginTop: -5
}
const Guide4Style ={
  marginLeft: 210,
  marginTop: -5
}
const btnStyle ={
  marginLeft: 210,
  marginTop: 40,
  backgroundColor: "#f4801c",
  width: 920
}
const form1Style={
   color: "#f4801c",
   fontSize: 14,
   marginLeft: 190
}

const errorStyel ={
  marginLeft: 120
}
const imggStyle={
  marginLeft: 200
}
const phoneStyle ={
  width: 400,
   marginLeft: 0,
   height: 50,
   fontWeight: 400,
   border: "1px solid #3d3c41"
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};



const Main = () => {

  
  const [user, setUser] = useState({
    name:"",email:"",CNIC:"",date:"",fathername:"",phone:"",address:"",img:"",course:""
  })

  let name, value;

  const handleInputs = (e) => {
    const { name, value } = e.target 

    setUser({
      ...user,
       [name]: value})
  } 

  const handleCourseChange = (value) => {
    setUser({
      ...user,
      course: value
    })
  }

  

 

  const PostData = async (e) => {
    e.preventDefault();
  
    if (!user.name || !user.email || !user.CNIC || !user.date || !user.fathername || !user.phone || !user.address) {
      message.error("Please fill all the fields");
      return;
    }
  
    const {name, email, CNIC, date, fathername, phone, address} = user;
  
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, CNIC, date, fathername, phone, address
      })
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      const error = data.error || "Unknown error";
      window.alert(`Registration failed: ${error}`);
      console.log(`Registration failed: ${error}`);
    } else {
      window.alert("Registration successful");
      console.log("Registration successful");
      generatePDF()
    }   
  }


  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  function generatePDF ()  {
    const doc = new jsPDF();
    const { name, email, CNIC, date, fathername, phone, address, img, course } = user;
  
    // Add background image
  
    // Add logo image
    doc.addImage(logo, "PNG", 140, 0, 60, 40);
  
    // Add title
    doc.setFontSize(17);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#f4801c");
    doc.text("ENROLLMENT CARD", 100, 39, { align: "center" });
    doc.setTextColor("#f4801c");
    doc.text("Ecommerce Training Center", 100, 49, { align: "center" });
    doc.setTextColor("black"); // set text color back to black

    const qr = QRCode(0, "L");
    qr.addData(` ${user.rollNumber}\n ${name}`);
    qr.make();
    
    // Get the QR code image as a data URL
    const qrDataUrl = qr.createDataURL(4);
    
    // Add the QR code image to the PDF document
    doc.addImage(qrDataUrl, "JPEG", 0, 22, 30, 30);
    
   
    // Define the position and size of the boxes
    const boxX = 0;
    const boxY = 60;
    const boxWidth = 42;
    const boxHeight = 25;
    const boxMargin = 0;
  
    // Draw the boxes
    for (let i = 0; i < 5; i++) {
      doc.rect(boxX + (boxWidth + boxMargin) * i, boxY, boxWidth, boxHeight);
    }
  
  
    // Add labels to the boxes
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Roll no", boxX + 4, boxY + 5);
    doc.text("Name", boxX + boxWidth + boxMargin + 2, boxY + 5);
    doc.text("Course", boxX + (boxWidth + boxMargin) * 2 + 2, boxY + 5);
    doc.text("Father Name", boxX + (boxWidth + boxMargin) * 3 + 2, boxY + 5);
    doc.text("CNIC", boxX + (boxWidth + boxMargin) * 4 + 2, boxY + 5);  

    // Define the starting and ending roll numbers
    let lastRollNumber = 6000;

    const currentRollNumber = ++lastRollNumber;
     user.rollNumber = `AQWF ${currentRollNumber}`;
    
     doc.text(user.rollNumber, boxX + 4, boxY + -2 + boxHeight);
    doc.text(name, boxX + boxWidth + boxMargin + 1, boxY + -2 + boxHeight);
    doc.text(course, boxX + (boxWidth + boxMargin) * 2 + 2, boxY + -2 + boxHeight);
    doc.text(fathername, boxX + (boxWidth + boxMargin) * 3 + 2, boxY + -2 + boxHeight);
    doc.text(CNIC, boxX + (boxWidth + boxMargin) * 4 + 2, boxY + -2 + boxHeight);
    
      // Increment roll number for next record
    
  
    doc.rect(0,70, 210 ,0)

    doc.setTextColor("gray")
    doc.text("1. Please Colour print of this Admit/ ID Card " ,4, 100)
    doc.text("2. Bring CNIC and last qualification marksheet/cert. (both original) at the time of attestation." ,4,108)
    doc.setTextColor("black"); // set text color back to black

    doc.getLineWidth(0.1)
    doc.line(146,140, 192, 140)
    doc.text("Authorized Signature", 150, 145)

    // Add QR code image to PDF


// add the image to the PDF document
const imgData = imageUrl;


    doc.setFillColor(250)
    doc.rect(40, 160, 60, 100, "F");
    doc.addImage(logo, "PNG", 48, 160, 45, 20);
    doc.setFillColor("#f4801c")
    doc.rect(43, 182, 54,3 ,"F" )
   
    
    
    doc.setFontSize(15)
    // Load your image data
   

    doc.text(name, 47, 230, 0)
    doc.setFillColor("#f4801c");
    doc.rect(43, 235 ,54,20, "F" )
    doc.setFontSize(12)
    doc.setTextColor("white");
    doc.text("Ecommerce Training", 49, 242, 0,)
    doc.text("Center", 62, 250, 0, )


    doc.setFillColor(250)
    doc.rect(110, 160, 60, 100, "F");
    doc.setFillColor("#f4801c")
    doc.rect(110, 160 ,60,55, "F" )
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255);
    doc.text("Name:", 120, 170, { align: "center" });  
    doc.text("Email:", 120, 178, { align: "center" });  
    doc.text("Phone:", 120, 186, { align: "center" });  
    doc.text("Address", 120, 194, { align: "center" });
    doc.text("Batch:", 120, 202, { align: "center" });  


    doc.text(name, 143, 170, { align: "center" });  
    doc.text(email, 147, 178, { align: "center" });  
    doc.text(phone, 139, 186, { align: "center" });  
    doc.text(address, 135, 194, { align: "center" });
    doc.text("3", 130, 202, { align: "center" });

   
    
    doc.setTextColor(0)
    doc.getLineWidth(0.1)
    doc.line(163, 250, 117, 250)
    doc.addImage(qrDataUrl, "JPEG", 125, 217, 25, 25);

    doc.text("Authorized Signature", 123, 255)

    doc.circle(70, 205, 15, 'D');

    
    // Define the clipping path
    doc.clip();
    
    doc.circle(70, 205, 15, 'D');

    // Add the image with its dimensions and position adjusted to fit inside the circle
    doc.addImage(imgData, 'JPEG', 55, 190, 30, 30);
  

    doc.save("Admit-card.pdf");
  }

  const [fileList, setFileList] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewUrl(src);
  };
  
return (
  <div method='POST'>
    {console.log("User", user)}
    <Row style={rowStyle} className='row'>
    <Layout.Footer style={HeaderStyle} className="head">
  <Title level={5} style={formStyle} className="city">Select city</Title>
<Select style={input1Style} 
     placeholder="Select city" 
      bordered="white" size={'large'} className="select">
        <Option value="karachi">Karachi</Option>
        </Select>

        
        <Title
        
        level={4} style={formStyle} >Full name</Title>
        <Input
         style={inputStyle}
          type="name"
          name='name'
          value={user.name}
          onChange={handleInputs}
           placeholder ='Full name'>
           </Input>

        <Title level={4} style={formStyle}>Email </Title>
        <Input
         style={inputStyle}
          type="email"
          name='email'
          value={user.email}
          onChange={handleInputs}
           placeholder='Email'
           
           />
        <Title level={4} style={formStyle}>CNIC</Title>
        <Form.Item name="CNIC" value={user.CNIC} rules={[{required: true,   message: 'Please input your CNIC number!'}, { len: 13, message: 'CNIC number must be 13 digits!'}]}>
        <Input style={inputStyle} type="CNIC" name='CNIC' value={user.CNIC} onChange={handleInputs} placeholder='CNIC'></Input>
       </Form.Item>

        <Title level={4} style={formStyle}>Date of birth</Title>
        <Input style={inputStyle} type="Date" name='date' value={user.date} onChange={handleInputs} placeholder=''>
          
        </Input>
        </Layout.Footer>
        
        

        <Form style={Style} className="inputs2">
          <Title level={4} style={formStyle} className="course">Select Courses</Title>
          <Select style={input1Style} placeholder="Select Courses"
         onChange={handleCourseChange} size={'large'}>
            <Option value="Digital Marketing">Digital Marketing</Option>
            <Option value="Amazon">Amazon</Option>
          </Select>

          
          <Title level={4} style={formStyle}>Father name</Title>
          <Input style={inputStyle} type="Father name" name='fathername' value={user.fathername} onChange={handleInputs} placeholder='Father name'></Input>
         
          <Title level={4} style={formStyle}>Phone</Title>
          <Form.Item style={errorStyel} name="phone" value={user.phone} rules={[{required: true,     message: 'Please input your phone number!'}, { len: 11, message: 'Phone number must be 11 digits!' }]}>
          <Input style={phoneStyle}  type="Phone" name='phone' value={user.phone} onChange={handleInputs} placeholder='Phone'></Input>
           </Form.Item>

           <Title level={4} style={formStyle}>Father's CNIC (optional)</Title>
          <Input style={inputStyle} type="number" name='fatherCNIC' value={user.fatherCNIC} onChange={handleInputs} placeholder='Father CNIC (optional) '></Input>
          <Title level={4} style={formStyle}>Select gender</Title>
          <Select style={input1Style}  placeholder="Select gender" size={'large'}>
            <Option value="Male">Male</Option>
            <Option value="female">Female</Option>
          </Select>

          </Form>
          </Row>
          <div className='inputs3'></div>
         <Title level={4} style={form1Style}>Address</Title>
          <Input className='address' type="Address" name='address' value={user.address} onChange={handleInputs}  placeholder='Address' style={Style1} ></Input>
         
          <Title level={4} style={form1Style}>Last qualification</Title>
          <Select  className='last'
          style={select1Style}  placeholder="Last qualification"   size={'large'}>
            <Option value="5 to 8 grade">5 to 8 grade</Option>
            <Option value="matric">matric</Option>
            <Option value="intermediate">intermediate</Option>
            <Option value="Undergraduate">Undergraduate</Option>
            <Option value="Graduate">Graduate</Option>
            <Option value="Masters">Masters</Option>
            <Option value="Phd">Phd</Option>


          </Select>


          
          <Title level={4} style={form1Style}>Do you have a Laptop?</Title>
          <Select className='last1' style={select1Style}   placeholder="Do you have a Laptop" size={'large'}>
           <Option value="yes">Yes</Option>
           <Option value="no">No</Option>
          </Select>
        

           <Title style={uploadStyle} level={4} className="picture">Picture</Title>
           <div style={{marginLeft: 200,}}>
           <ImgCrop rotation>
           <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
      </div>


          <div className='ruless'>
          <Title style={pointsStyle} level={5} className="instructions">With white or blue background</Title>
          <Title style={pointsStyle} level={5}>File size must be less than 1MB</Title>
          <Title style={pointsStyle} level={5}>File type: jpg, jpeg, png</Title>
          <Title style={pointsStyle} level={5}>Upload your recent passport size picture</Title>
          <Title style={pointsStyle} level={5}>Your Face should be clearly visible without any Glasses</Title>
           </div>
           <div className="Line">
            <div className="lines">
          <Title style={GuideStyle} level={5} >1: I hereby, solemnly declare that the data and facts mentioned herein are true and correct to the best of my knowledge. Further, I will<br/>
           abide by all the established and future regulations and policies of Hyphen Academy</Title>

           <Title style={Guide2Style} level={5}>2: I hereby accept the responsibilities of good conduct and guarantee that I will not be involved in any other activity,
            political or ethical,<br/> but learning during my stay in the program.</Title>

            <Title style={Guide3Style} level={5}>3: Defiance will render my admission canceled at any point in time.</Title>

            <Title style={Guide4Style} level={5}>4: Upon completion, of the course, I will complete the required project by Hyphen Academy.</Title>    
            </div>
            <Button className='submit' style={btnStyle} type='primary button' onClick={PostData} >Submit</Button>
          </div>
          </div>
)
}

export default Main