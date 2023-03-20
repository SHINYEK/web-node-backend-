import React, { useEffect, useRef, useState } from 'react'
import {Row,Col,Card, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import empty_image from '../images/a1.png'

const MyPage = ({history}) => {
    
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState(null);
    const [image,setImage] = useState('');
    const [form,setForm] = useState({
        uid:'',
        upass:'',
        uname:'',
        address:'',
        phone:'',
        photo:''
    })
    const {uid, upass, uname, address,phone,photo} = form;

    const getUser = async() =>{
        setLoading(true);
        const result = await axios(`users/${sessionStorage.getItem('uid')}`);
        setForm(result.data);
        setImage(result.data.photo);
        setLoading(false);
    }

    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    
    }

    const onChangeFile = (e) =>{
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
    }

    const onSubmit  = async(e) =>{
        e.preventDefault();  
            if(!window.confirm("회원정보를 수정하실래요?"))return;    
            const formData = new FormData();

            formData.append('uid',uid);
            formData.append('upass',upass);
            formData.append('uname',uname);
            formData.append('address',address);
            formData.append('phone',phone);
            formData.append('file',file);
            formData.append('photo',photo);

            const config = {
                Headers:{'content-type':'multipart/form-data'}
            }

            await axios.post('/users/update',formData,config);
            history.push('/')
        
    }

    useEffect(()=>{
        getUser();
    },[])

    if(loading) return <h1>로딩중...</h1>
   
  return (
    <Row className='justify-content-center m-5 login'>
        <Col md={4}>
            <Card className='p-4'>
                <Card.Title>
                    <h3 style={{paddingTop:'20px'}}>회원정보</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={onSubmit}>                           
                        <Form.Control placeholder='아이디' className='mb-2' value={uid} />

                        <Form.Control placeholder='비밀번호' className='mb-2' type='password' name='upass' value={upass} onChange={onChange}/>
                        <Form.Control placeholder='이름' className='mb-2' value={uname} name='uname' onChange={onChange}/>
                        <Form.Control placeholder='주소' className='mb-2' value={address} name='address' onChange={onChange}/>
                        <Form.Control placeholder='전화' className='mb-2'  value={phone}  name='phone' onChange={onChange}/>
                        
                        {image ? <img src={image} width={200}/> : <img src={empty_image} width={200}/>}
                        <hr />
                        <Form.Control placeholder='이미지' className='mb-2' type='file'  accept='image/*' onChange={onChangeFile}/>
                        <Button type='submit' className='my-2'>수정하기</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default MyPage