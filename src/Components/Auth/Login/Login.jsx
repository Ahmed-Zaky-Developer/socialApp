import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../Context/UserData';



export default function Login() {
  
 let {Token, setToken} =  useContext(UserData);



//useNavigate ==> انا هنا مستخدمها بسبب اني لو الاكونت خلاص اتكريت يوديني علي بيدج اللوجن
let navgate = useNavigate();


   let [loading, setloading] = useState(false);
   let [errMsg, seterrMsg] = useState(null);
   

// valduation
let schema = z.object({
   email : z.email(),
   password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/  , "invalid Pass"),// ==> البترن ده انا بجيبه من التيست بتاع ال اي بي اي من الباك اند هو اللي بيبقي مديني الرجيكس
})


 let { register , handleSubmit , formState  } = useForm({
      defaultValues:{
         email:"",
         password:"",
      },
      resolver : zodResolver(schema)  // انا كده ربط الفالدويشن بالانبوت
   })


// values ==> دي كده الداتا اللي داخله ف الانبوتس انا بستقبلها كبرامتر
   function submitForm( values ){
    // ==> {} object ==> call Api
    /* Start Loading */
    setloading(true)
      axios.post(`https://route-posts.routemisr.com/users/signin` , values)
      .then( (res)=> {
         console.log(res.data.message);
         if(res.data.message == 'signed in successfully'){

         // token ==> ده لما بعمل لوجين بيتعمل توكين اليوزر بيبقي ليه توكن حتي ف ال ايه بي اي كل اي بي اي بيطلب توكن مني
         // بس لو اتنين يوزر دخلو علي الموقع بتاعي اخر توكين هو اللي هعيمل اوفر رايت وهيفتح الموقع الاولاني مش هيفتح معايا
         // لازم اخزن  التوكن عندي ف مكانين تخزين فعليا اللي هي اللوكال استرودج وغير فعليا اللي هي الستيت اللي هي ست اللي هو كونتر كونتكست
         console.log(res.data.data.token);
         localStorage.setItem("userToken" , res.data.data.token);
         setToken(res.data.data.token);





         /* Stop Loading */
         setloading(false)
          navgate('/home')
         }   
      } )
      .catch((err)=>{
         /* Stop Loading */
        setloading(false)
         console.log(err.response.data.message);
         seterrMsg(err.response.data.message)
      } )
   }



  return <div className='bg-gray-200 text-black p-5 w-[75%] mx-auto mt-4 rounded-2xl'>
            <h2>Login Now!</h2> 
            {/* هنا كده لو المسدج ايرور فيها ايرور يعرضلي المسدج دي */}
            {errMsg !== null ? <h5 className='bg-red-600 text-center w-[95%]'>{errMsg}</h5>: "" }
            {/* handleSubmit ==> في الحاله دي هعمل راوند بيراكت عشان ابعت جواها الفنكشون اللي نا عايزها تتنفذ والهندله دي بتخلي الفورم بتاعتي وانا بعمل سمت ميحصلش ريلود */}
            <form onSubmit={ handleSubmit( submitForm ) }>

                  {/* Email Input */}
                  <div>
                     <Input {...register("email")} name="email" aria-label="email" className="w-[95%] mx-auto my-3" placeholder="Enter your Email" />
                     { formState.errors.email ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.email.message}</p> : "" }
                  </div>


                  {/* Password Input */}
                  <div>
                     <Input {...register("password")} name="password" aria-label="password" className="w-[95%] mx-auto my-3" placeholder="Enter your Password" />
                     { formState.errors.password ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.password.message}</p> : "" }
                  </div>


                  <Button type='submit' className="w-[95%]">
                  { loading == true ?   <i className='fa fa-spin fa-spinner'></i> : "Login"  }
                  </Button>

            </form>   


         </div>
}
