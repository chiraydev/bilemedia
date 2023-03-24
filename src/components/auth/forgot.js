import api from '@/utils/api';
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import SimpleInput from '../common/simpleInput'
import styles from "./style.module.css";
import Logo from "../../../public/assets/login_popup_logo.png"


function Forgot({setAuth}) {

    const [mailState, setMailState] = useState("")


    function SendOTP(){
      let mailFormat = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if(!mailState){
            toast.error("Email is required")
            return
        }

        if(!mailFormat.test(mailState)){
          toast.error("Enter Valid Email")
            return
        }

        api
          .get(`auth_api/otp_register_process?email=${mailState}`)
          .then((res) => {
            console.log(res, "gotRes");
            if(res?.status == true){
              toast.success("Otp Send Successfully")
              console.log(mailState,"mailState");
  setAuth({
              login: false,
              signup: false,
              forgot: false,
              verify: true,
              forgotMail:mailState
            });
            
            }else{
              toast.error(res?.message)
            }
          
          })
          .catch((err) => {
            toast.error(err);
          });
    }

  return (
    <div>
        <div className="text-center" >
            <Image src={Logo} style={{width:"20%",height:"100%",marginBottom:"25px",marginTop:"15px"}} alt="logo" />
            </div>
    <h5 className={styles.normalTxt} >Forgot Password</h5>
<p className={styles.smallTxt} >{"Enter your registered email address we'll send an OTP to authenticate & verify your account."}</p>
    <SimpleInput auth inputStyle={{width:"100%"}} value={mailState} onChange={(e) => setMailState(e.target.value)}  placeholder="Email Id" style={{marginBottom:"10px"}} />
   
    <div>
        <Button style={{width:"100%",background:"#5BCBF5"}} onClick={SendOTP}  >Send Me OTP</Button>
    </div>
 
</div>
  )
}

export default Forgot