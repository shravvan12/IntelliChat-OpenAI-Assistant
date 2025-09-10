import { Box ,Typography ,Button} from '@mui/material'
import React, { useEffect } from 'react'
import CustomizedInput from '../components/shared/CustomizedInput'
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const signUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const fomData = new FormData(e.currentTarget);
    const name = fomData.get('name') as string;
    const email = fomData.get('email') as string;
    const password = fomData.get('password') as string ;
    console.log(email, password);
    try {
      toast.loading("Signing Up...",{id:"signup"});
      await auth?.signup(name,email,password);
      toast.success("Logged in successfully",{id:"signup"});
    } catch (error) {
      toast.error("Signup failed. Please try again.",{id:"signup"});
      console.error("Login error:", error);
    }
  }

  useEffect(()=>{
    if(auth?.user){
      navigate("/chat");
    }
  },[auth])
  
  return (
    <Box width={"100%"} height={"100%"}  display="flex" flex={1} >
      <Box padding={8} mt={8} display={{md:"flex" , sm:"none" , xs:"none"}}>
        <img src="/airobot.png" alt='Robot' style={{width:"400px"}} />
      </Box>
      <Box display={"flex"} 
      flex={{xs:1 , md: 0.5}}
      justifyContent={"center"} 
      alignItems={"center"} 
      padding={2}
      ml={'auto'}
      mt={16}>
        <form onSubmit={handleSubmit} style={{margin:"auto", padding:'30px',
          boxShadow:"10px 10px 20px #000",
          borderRadius:"10px",
          border:"none"
      }}>
        <Box sx={{display:'flex', flexDirection:"column", justifyContent:"center"}}>
        <Typography variant='h4' textAlign="center" padding={2} fontWeight={600}>
          Signup
        </Typography>
        <CustomizedInput type='text' name='name' label='Name'></CustomizedInput>
        <CustomizedInput type='email' name='email' label='Email'></CustomizedInput>
        <CustomizedInput type='password' name='password' label='password' ></CustomizedInput>
        <Button type='submit' sx={{px:2,py:1,mt:2,width:"400px",borderRadius:2,bgcolor:"#00fffc",
          ":hover":{
            bgcolor:"white",
            color:"black"
          }
        }} endIcon={<IoIosLogIn></IoIosLogIn>}>Signup</Button>
        </Box>
        </form>
      </Box>
    </Box>
  )
}

export default signUp
