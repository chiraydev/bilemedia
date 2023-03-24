import api from '@/utils/api'
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import OtpInput from 'react-otp-input'
import { toast } from 'react-toastify';
import styles from "./style.module.css";
import Logo from "../../../public/assets/login_popup_logo.png"
import { useGlobalStore } from '@/utils/store';


function Verify({setAuth,auth,setPopup,popup}) {

const [verifyOtp, setVerifyOtp] = useState({ otp: "" })
const {setUserDetails} = useGlobalStore(state => state )


console.log(auth,"auth");

function VerifyOTP(){
    if(!verifyOtp?.otp){
        toast.error("Otp is required")
        return
    }
 

        if(Object.keys(auth?.signupValues).length === 0){
          api.get(`auth_api/otp_register_process?email=${auth?.forgotMail}&otp=${verifyOtp?.otp}`)
          .then((res) => {
            console.log(res, "gotRes");
            if(res?.status == true){
            
    setAuth({...auth,forgotMail:auth?.forgotMail, otp:verifyOtp?.otp});
            setPopup({...popup,verified:true})
    
            }else{
              toast.error(res?.message)
            }
          
          })
          .catch((err) => {
            toast.error(err);
          });
        }else{
          api.get(`auth_api/otp_register_process?email=${auth?.signupValues?.email}&otp=${verifyOtp?.otp}`)
          .then((res) => {
            console.log(res, "gotRes");
            if(res?.status == true){
              api.post("auth_api/user_register", auth?.signupValues).then((res) => {
                console.log(res, "gotRes");
                setUserDetails(res?.results[0])
                setAuth({...auth,verify:false,signupValues:{}})
                setPopup({...popup,success:true})
              }).catch(err => {
                  toast.error(err)
              });
    
            }else{
              toast.error(res?.message)
            }
          
          })
          .catch((err) => {
            toast.error(err);
          });
        
        }
 
}

  return (
    <div>
        <div className="text-center" >
            <Image src={Logo} style={{width:"20%",height:"100%",marginBottom:"25px",marginTop:"15px"}} alt="logo" />
            </div>
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
        <Button onClick={VerifyOTP} style={{width:"100%",background:"#5BCBF5"}} >Verify</Button>
    </div>
 
</div>
  )
}

export default Verify