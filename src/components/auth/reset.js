import api from '@/utils/api';
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import SimpleInput from '../common/simpleInput'
import styles from "./style.module.css";
import Logo from "../../../public/assets/login_popup_logo.png"


function Reset({setAuth,auth,setPopup}) {

   
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    function SendOTP(){

        if(!password || !confirmPassword ){
            toast.error("Both Password are required")
            return
        }

        if(password !== confirmPassword ){
            toast.error("Passwords doesn't match")
            return
        }

 
        api
          .patch(`auth_api/update_password`,{
            password:password,
            otp:auth?.otp,
            email:auth?.forgotMail
          })
          .then((res) => {
            console.log(res, "gotRes");
            if(res?.status == true){
              toast.success(res?.message)
           
  setAuth({
              login: false,
              signup: false,
              forgot: false,
              verify: false,
              reset:false,
              forgotMail:""
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
    <h5 className={styles.normalTxt} >Reset Password</h5>
<p className={styles.smallTxt} >{"Create New Password"}</p>
<SimpleInput auth inputStyle={{width:"100%"}} value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="New Password" style={{marginBottom:"15px"}} />
    <SimpleInput auth inputStyle={{width:"100%"}} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  placeholder="Confirm Password" style={{marginBottom:"10px"}} />
   
    <div>
        <Button style={{width:"100%",background:"#5BCBF5"}} onClick={SendOTP}  >Submit</Button>
    </div>
 
</div>
  )
}

export default Reset