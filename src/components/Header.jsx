import React from 'react'
import { Button,  Layout, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, Router } from 'react-router-dom';
import Main from "./Main"
import logo from '../HyphenLogo.png'



const {  Footer,  Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "white",
  marginTop: -50,
}

const titleStyle ={
  marginLeft: "auto",
  marginRight: 'auto',
  marginTop: -80,
  fontSize: 26,
  fontWeight: 800,
}

const footerStyle ={
    display: 'flex',
    color: '#666',
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: -35
}

const listStyle ={
    color: 'lightgrey',
    fontSize: '1rem',
    marginLeft: 0,
    marginTop: 10
}

const contentStyle ={
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: -20,
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const btnStyle ={
  background: '#fafafa',
  color: '#f4801c',
  borderColor: '#f0f0f0',
  width: 140,
  height: 35,
  marginLeft: 8,
  marginBottom: 10
}

const Header = () => {
  return (
    <div className='header1'>
      <Layout.Header style={headerStyle}>
      <div className='imgg'>
         <Image
      width={300}
      src={logo}  
      className='logo'
      />
      </div>
      <Title level={2} style={titleStyle}   className="lines">COURSE REGISTARTION FORM</Title>
      <Footer style={footerStyle}>
      <Title level={5} style={listStyle} className="services">Services - Education - Registration</Title>
      </Footer>

 
          <Content style={contentStyle}>
          
        <Link to="/"><Button type='primary' style={btnStyle} className="btns">New Application</Button> </Link> 
       
         <Link to="/Download"><Button type='primary' style={btnStyle}>Download ID Card</Button></Link>
          
        <Link to="/result" > <Button type='primary' style={btnStyle}>Result</Button> </Link>
    
          </Content>
      </Layout.Header>

      <Main />
      </div>
  )
}

export default Header