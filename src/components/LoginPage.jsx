import React, { useRef, useState } from 'react'
import {Col,Row,Card,Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';

const LoginPage = ({history}) => {
    const [form,setForm] = useState({
        uid:'user01',
        upass:'pass'
    });
    const {uid,upass} = form;

    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit  = async(e) =>{
        e.preventDefault();
        const result = await axios.post('/users/login',form)
        const user =  result.data.result;

        if(user===0){
            alert("해당 유저는 존재하지 않습니다");
        }else if(user===2){
            alert("비밀번호가 틀립니다")
        }else{
            alert("환영합니다!");
           sessionStorage.setItem("uid",uid);
           history.push('/');
        }
    }
  return (
    <Row className='justify-content-center m-5 login'>
        <Col md={4}>
            <Card className='p-4'>
                <Card.Title>
                    <h3 style={{paddingTop:'20px'}}>로그인🔒</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Control placeholder='아이디' value={uid} name="uid" onChange={onChange}/>
                        <Form.Control placeholder='비밀번호' type='password' value={upass} name="upass" className='my-2' onChange={onChange}/>
                        <Button type='submit' className='my-2'>로그인</Button>
                        <Link to='/users/insert'><Button className='mx-2'>회원가입</Button></Link>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default LoginPage