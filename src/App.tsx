import React, { useEffect } from 'react';
import './App.css';
import Login from './login-signup/login';
import Header from './header-footer/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './login-signup/profile';
import AdminDashboard from './users/admin_dashboard';
import OTP from './login-signup/otp';
import EditProfile from './login-signup/edit-profile';
import TeacherDashboard from './users/teacher_dashboard';
import Signup from './login-signup/signup';


function App() {
  const dataAWS = process.env.REACT_APP_S3KEYS;
  // console.log(dataAWS, "dataaws");
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/account' element={<Profile></Profile>}></Route>
          <Route path='/me' element={<TeacherDashboard></TeacherDashboard>}></Route>
          <Route path='/admin/teachers' element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path='/verify' element={<OTP></OTP>}></Route>
          <Route path='/editTeacher' element={<EditProfile></EditProfile>}></Route>     
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
