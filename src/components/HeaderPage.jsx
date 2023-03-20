import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from './UserContext';

const HeaderPage = ({history}) => {
  const {user,setUser} = useContext(UserContext);

  //유저 정보 가져오는 함수
  const getUser = async() =>{
    const result = await axios(`/users/${sessionStorage.getItem('uid')}`);
    setUser(result.data);
  }

  useEffect(()=>{
    getUser();
  },[sessionStorage.getItem('uid'), user])

  const onLogout = (e) =>{
    e.preventDefault();
    sessionStorage.removeItem('uid');
    setUser(null);
    history.push('/');
  }
  
  return (
    <>
    <img src="https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/e6bbfa0b-004d-4b9c-923b-02c4521af50d.jpg" style={{width:'100%'}}/>
        <Navbar bg="dark" variant="light">
        <Container>
          <Nav className="me-auto">
            <Link to='/'>Home</Link>
            <Link to='/users'>사용자목록</Link>
            {user ? <Link to='#' onClick={onLogout}>로그아웃</Link> : <Link to='/login'>로그인</Link>}
            { (user && user.uname) && <Link to='/mypage'>{user.uname}님</Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default withRouter(HeaderPage);