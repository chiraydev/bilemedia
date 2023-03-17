import Login from '@/components/auth/signin'
import SignUp from '@/components/auth/signup'
import CommonModal from '@/components/common/modal'
import SimpleInput from '@/components/common/simpleInput'
import Header from '@/components/header'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import OtpInput from 'react-otp-input'
import styles from "./homepage.module.css"

function HomePage() {

    const [auth, setAuth] = useState({login:false,signup:false,forgot:false,verify:false})
const [verifyOtp, setVerifyOtp] = useState({ otp: "" })


  return (


    <div className={styles.container} >
        
        <CommonModal 
        
    show={auth.login}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false})}
    auth
    bodyContent={<Login setAuth={setAuth} /> }
        />

        <CommonModal 
        
    show={auth.forgot}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false})}
    auth
    bodyContent={
        <div>
            <h5 className={styles.normalTxt} >Forgot Password</h5>
     <p className={styles.smallTxt} >{"Enter your registered email address we'll send an OTP to authenticate & verify your account."}</p>
            <SimpleInput auth inputStyle={{width:"100%"}} placeholder="Email Id" style={{marginBottom:"10px"}} />
           
            <div>
                <Button style={{width:"100%",background:"#5BCBF5"}} >Send Me OTP</Button>
            </div>
         
        </div>
    }
        />

        <CommonModal 
        
    show={auth.verify}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false})}
    auth
    bodyContent={
        <div>
            <h5 className={styles.normalTxt} >Verification</h5>
     <p className={styles.smallTxt} >{"You must receive a 4-digit OTP that sent to"}<span style={{color:"#fff"}} >****@gmail.com</span> </p>
     <OtpInput
          value={verifyOtp?.otp}
          onChange={(otp) => setVerifyOtp({ otp })}
          containerStyle={{ justifyContent: "center", margin: "20px 0 25px" }}
          numInputs={4}
          shouldAutoFocus
          isInputNum
          inputStyle={{
            width: "3rem",
            border: "none",
            outline: "unset",
            padding: "10px",
            textAlign: "center",
            color:"white",
            fontSize: "14px",
            margin: "0 20px",
            background: "#8996b5 0% 0% no-repeat padding-box",
            // border: "1px solid black",
          }}
      />
            <div className='mt-3 text-center' >
                
                <p className={styles.smallTxt} ><span style={{color:"#5BCBF5"}} >Resend Me OTP</span></p>
            </div>
            <div>
                <Button style={{width:"100%",background:"#5BCBF5"}} >Verify</Button>
            </div>
         
        </div>
    }
        />

        <CommonModal 
        
    show={auth.signup}
    setShow={() => setAuth({login:false,signup:false,forgot:false,verify:false})}
    auth
    bodyContent={<SignUp setAuth={setAuth} /> }
        />
 <Header setAuth={setAuth} />
       
        </div>
  )
}

export default HomePage