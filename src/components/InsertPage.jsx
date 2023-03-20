import React, { useEffect, useRef, useState } from 'react'
import {Row,Col,Card, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import empty_image from '../images/a1.png'


const InsertPage = ({history}) => {
    const [image,setImage] = useState('');
    const [check,setCheck] = useState(false);
    const [file,setFile] = useState(null);
    const [form,setForm] = useState({
        uid:'user10',
        upass:"pass",
        uname:'성춘향', 
        address:'인천 남구 학익동',
        phone:'010-1000-1000',
        photo:''
    });

    const {uid,upass,uname,address,phone,photo} = form;

    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })

        if(e.target.name==='uid') setCheck(false);
    }

    const onChangeFile = (e) =>{
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onSubmit  = async(e) =>{
        e.preventDefault();
        if(!check){
            alert("아이디를 중복 체크해주세요!");
            return;
        }else{
            if(!window.confirm("새로운 회원을 등록하실래요?"))return;
        
            const formData = new FormData();
            formData.append('uid',uid);
            formData.append('upass',upass);
            formData.append('uname',uname);
            formData.append('address',address);
            formData.append('phone',phone);
            formData.append('file',file);
            const config = {
                Headers:{'content-type':'multipart/form-data'}
            }

            await axios.post('/users/insert',formData,config);
            history.push('/login')
        }
    }
    
    const onCheckId = async() =>{
        const result = await axios.get(`/users/${uid}`);
        if(result.data===""){
            alert("사용 가능한 아이디입니다!");
            setCheck(true);
        }else{
            alert("이미 사용중인 아이디입니다!")
        }
    }

  return (
    <Row className='justify-content-center m-5 login'>
        <Col md={4}>
            <Card className='p-4'>
                <Card.Title>
                    <h3 style={{paddingTop:'20px'}}>회원가입🙎‍♀️</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                       <Row>
                            <Col xl={9} md={7} xs={5}>
                                <Form.Control placeholder='아이디' className='mb-2' value={uid} name="uid" onChange={onChange}/>
                            </Col>
                            <Col>
                                <Button onClick={onCheckId}>중복체크</Button>
                            </Col>
                            
                       </Row>
                        <Form.Control placeholder='비밀번호' className='mb-2' type='password'  value={upass} name="upass" onChange={onChange}/>
                        <Form.Control placeholder='이름' className='mb-2'  value={uname} name="uname" onChange={onChange}/>
                        <Form.Control placeholder='주소' className='mb-2'  value={address} name="address" onChange={onChange}/>
                        <Form.Control placeholder='전화' className='mb-2'  value={phone} name="phone" onChange={onChange}/>
                        
                        {image ? <img src={image} width={200}/> : <img src={empty_image} width={200}/>}
                        <hr />
                        <Form.Control placeholder='이미지' className='mb-2' type='file' onChange={onChangeFile} accept='image/*' />
                        <Button type='submit' className='my-2'>가입하기</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default InsertPage