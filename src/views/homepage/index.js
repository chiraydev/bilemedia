import Forgot from '@/components/auth/forgot'
import Reset from '@/components/auth/reset'
import Login from '@/components/auth/signin'
import SignUp from '@/components/auth/signup'
import Verify from '@/components/auth/verify'
import CommonModal from '@/components/common/modal'
import Header from '@/components/header'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Banner from './banner'
import VerifyImg from "../../../public/assets/verified_popup_icon.png"
import SuccessImg from "../../../public/assets/congratulation_image.png"
import styles from "./homepage.module.css"
import { useGlobalStore } from '@/utils/store'

function HomePage() {

    const [auth, setAuth] = useState({login:false,signup:false,forgot:false,verify:false,reset:false,otp:"",forgotMail:"",signupValues:{}})
const [popup, setPopup] = useState({verified:false,tc:false,active:1,success:false})
const {userDetails} = useGlobalStore(state => state)

console.log(auth,"auth");
console.log(userDetails,"userDetails");

  return (


    <div className={styles.container} >
        
        <CommonModal 
        
    show={auth.login}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false,reset:false,otp:"",forgotMail:""})}
    auth
    bodyContent={<Login setAuth={setAuth} auth={auth} setPopup={setPopup} popup={popup} /> }
        />

        <CommonModal 
        
    show={auth.forgot}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false,reset:false,otp:"",forgotMail:""})}
    auth
    bodyContent={<Forgot setAuth={setAuth} auth={auth} setPopup={setPopup} popup={popup} /> }
        />

        <CommonModal 
        
    show={auth.verify}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false,reset:false,otp:"",forgotMail:""})}
    auth
    bodyContent={<Verify setAuth={setAuth} auth={auth} setPopup={setPopup} popup={popup} />}
        />

        <CommonModal 
        
    show={auth.signup}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false,reset:false,otp:"",forgotMail:""})}
    auth
    bodyContent={<SignUp setAuth={setAuth} auth={auth} setPopup={setPopup} popup={popup} /> }
        />

        <CommonModal 
        
    show={auth.reset}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false,reset:false,otp:"",forgotMail:""})}
    auth
    bodyContent={<Reset setAuth={setAuth} auth={auth} setPopup={setPopup} popup={popup} /> }
        />

        <CommonModal    
    show={popup.tc}
    setShow={() => setPopup({verified:false,tc:false,success:1,active:1})}
    
    bodyContent={
        <div>
            <div className='d-flex justify-content-around pointer' >
                <p className='mb-0 fw-bold fs-6' style={{color:popup?.active == 1 ? "#81d6f6" : "#a4aec5"}} onClick={() => setPopup({...popup,active:1})} >  Terms & Conditions</p>
                <p className='mb-0 fw-bold fs-6' style={{color:popup?.active == 2 ? "#81d6f6" : "#a4aec5"}} onClick={() => setPopup({...popup,active:2})} >Privacy Policy</p>
            </div>
            <div className='d-flex pointer '  >
                <hr onClick={() => setPopup({...popup,active:1})} className={styles?.underline}  style={{background:popup?.active == 1 ? "#81d6f6" : "#a4aec5"}} />
                <hr onClick={() => setPopup({...popup,active:2})} className={styles?.underline}  style={{background:popup?.active == 2 ? "#81d6f6" : "#a4aec5"}} />
            </div>
            <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <Button style={{width:"100%",background:"#5BCBF5",border:"transparent"}} onClick={() => {
           
            setPopup({...popup,tc:false})
        }}  >Okay,I Agree</Button>
        </div>
     }
        />

        <CommonModal 
        
    show={popup.verified}
    setShow={() => setPopup({verified:false,tc:false,success:false,active:1})}
    bodyContent={
        <div>
              <div className="text-center" >
            <Image src={VerifyImg} style={{width:"20%",height:"100%",marginBottom:"25px",marginTop:"15px"}} alt="logo" />
            </div>
            <h4 style={{color:"#6fc895",textAlign:"center"}} >OTP Verified</h4>
            <p className='text-center' >Now you can create your new password</p>
        <Button style={{width:"100%",background:"#5BCBF5",border:"transparent"}} onClick={() => {
            setAuth({...auth,reset:true})
            setPopup({...popup,verified:false})
        }}  >Continue</Button>
        <Button style={{width:"100%",background:"white",color:"#5BCBF5",border:"transparent"}} onClick={() => {
            setAuth({...auth,login:true})
            setPopup({...popup,verified:false})
    }}   >Back To Login</Button>

        </div>
    }
        />

        <CommonModal 
        
    show={popup.success}
    setShow={() => setPopup({verified:false,tc:false,success:false,active:1})}
    bodyContent={
        <div>
             <div className="text-center" >
            <Image src={SuccessImg} style={{width:"70%",height:"100%",marginBottom:"25px",marginTop:"15px"}} alt="logo" />
            <h4 className={styles.congo_txt} >{ userDetails?.user_name ? userDetails?.user_name : userDetails?.first_name}</h4>
            </div>
            <p className='text-center' >You are successfully registered with <span className='fw-bold mb-0' >Bile Media</span> Platform</p>
           

        </div>
    }
        />


 <Header setAuth={setAuth} />
 {/* <Banner /> */}

       
        </div>
  )
}

export default HomePage