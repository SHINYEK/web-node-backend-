import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderPage from './components/HeaderPage';
import { Route, Switch } from 'react-router-dom';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import InsertPage from './components/InsertPage';
import MyPage from './components/MyPage';
import Home from './components/Home';


function App() {
  const [user,setUser] = useState(null);
  return (
    <UserContext.Provider value={{user,setUser}}>
      <div className="App">
       <HeaderPage/>

        <Switch>
          <Route path='/' component={Home} exact={true}></Route>
           <Route path='/users' component={UserPage} exact={true}></Route>
           <Route path='/login' component={LoginPage}></Route>
           <Route path='/users/insert' component={InsertPage}></Route>
           <Route path='/mypage' component={MyPage}></Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
