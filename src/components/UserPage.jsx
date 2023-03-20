import React, { useEffect, useState } from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import axios from 'axios'
import empty_image from '../images/a1.png'


const UserPage = () => {
    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(false);

    const getUsers = async()=>{
        setLoading(true);
        const url = '/users';

        const result = await axios(url);
        console.log(result.data);
        setUsers(result.data)
        setLoading(false);
    }

    useEffect(()=>{
        getUsers();
    },[])

    if(loading) return <h1>Loading...</h1>

  return (
    <Row className='justify-content-center'>      
        <Col xl={7}>       
                <h1 style={{paddingTop:'20px'}}>사용자목록</h1>
                {users.map(user=>
                    <Card key={user.uid} className='my-2'>
                        <Card.Body>
                            <Row>
                                <Col md={3}>
                                    {user.photo? <img src={user.photo} width={100}/>: <img src={empty_image} width={100}/>}
                                </Col>
                                <Col>
                                    <h5>이름:{user.uname} ({user.uid})</h5>
                                    <h5>주소:{user.address}</h5>
                                    <h5>전화:{user.phone}</h5>
                                    <h5>가입일:{user.fmt_date}</h5>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>)}     
        </Col>
    </Row>
  )
}

export default UserPage