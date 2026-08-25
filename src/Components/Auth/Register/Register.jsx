import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
/* React Hook Form ==> بتمنع ريلورد ف الفورم لما ادوس علي زرار السمت وبتخليني اسحب الداتا من جوا الفورم*/
import { useForm } from 'react-hook-form';
// Zod ==> دي مكتبه بتخليني اعمل فالدويشن
import z from 'zod'
//@hookform/resolvers ==> دي بكدج بتربطلي الفالدويشن ب الانبوت اللي عندي
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// hero ui ==> موقع في مكاتب ممكن استخدمها
// لازم اكون منزل المكاتب دي عندي npm i @heroui/styles @heroui/react
// لو استخدمت اي كمبونت زي البتون لازم اعمله انبورت
// بعمل سيرش وهجيب انبوت من الموقع

export default function Register() {
//useNavigate ==> انا هنا مستخدمها بسبب اني لو الاكونت خلاص اتكريت يوديني علي بيدج اللوجن
let navgate = useNavigate();


   let [loading, setloading] = useState(false);
   let [errMsg, seterrMsg] = useState(null);
   let [validMsg, setvalidMsg] = useState(null);

// valduation ==> عن طريق مكتبة زود
let schema = z.object({
   name : z.string().min(2 , '! at Leats 2 Chars').max(9 , '!max Chars is 9'),
   username : z.string().regex(/^[a-z0-9_]{3,30}$/ , "ex.ahmed123"),
   email : z.email(),
   dateOfBirth : z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Invalid data")
   //refine ==> انا دلوقتي بعمل اني مينفعش اليوزر يدخل تاريخ لسه مجاش بيبقي شايل فنكشون لازم ترترن ترو وبتشيل مسدج
   .refine( (date)=>{
      let userDate = new Date(date);
      let todayDate = new Date(); //ده كده بيجبلي تاريخ انهارده
      todayDate.setHours(0,0,0,0) // هنا كده الديت بيبقي ششايل اربع حاجات جواه انا بصفرهم عشان يجيبلي تاريخ انهارده
      return userDate < todayDate // انا هنا كده بقولو اني لازم تاريخ اليوزر اللي هيدخله يبقي اققل من تاريخ اليوم          //condation = true
   } , "Invalid Date" ),
   gender : z.enum([ "male" , "female" ] , "Gender Required"),
   password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/  , "ex.Ahmed123@@"),// ==> البترن ده انا بجيبه من التيست بتاع ال اي بي اي من الباك اند هو اللي بيبقي مديني الرجيكس
   rePassword : z.string()

}).refine((obj)=>{
   return  obj.password  == obj.rePassword   //condation = true //==> انا هنا كده مستخدمها علي مستوي اوبجكت هيبقي شايلي الاوبجكت بالكامل

}, {
   // هنا ممكن بدل مكنت اعمل مسدج ممكن اعمل اوبجكت هو جواه مثود الايرور والباث اللي هو يشاورلي المشكله في انهي انبوت
   error : "pass & repass Not Same",
   path : ['rePassword']
} )




//use Form ==> ده عباره عن فنكشون ده الاوبجكت اللي انا هبعته للباك اند
// handleSubmit ==> بيساعدني اني اسمت الفورم من غير ميحصل اي ريلود
//formState ==> ده بيبقي شايل الايرورو بتاعتي
 let { register , handleSubmit , formState  } = useForm({
      defaultValues:{
         name: "",
         username:"",
         email:"",
         dateOfBirth:"",
         gender:"",
         password:"",
         rePassword:""
      },
      resolver : zodResolver(schema)  // انا كده ربط الفالدويشن بالانبوت
   })


// register==> دي حاجه من جوا ال يوز فورم شايلاها انا عملتلها ديستركت و برضو بيرجعلي اوبجكت لازم وانا بنادي علي الريجستر انادي جواها فاليو زي استرينج
// اهم وظيفه فيها بتمسكلي كل انبوت وبتربطهولي ب الاوبجكت اللي انا عملته فوق للباك اند
// let {name , onChange , onBlur , ref}  = register('');  






// values ==> دي كده الداتا اللي داخله ف الانبوتس انا بستقبلها كبرامتر
   function submitForm( values ){
    // ==> {} object ==> call Api
    /* Start Loading */
      setloading(true)
      axios.post(`https://route-posts.routemisr.com/users/signup` , values)
      .then( (res)=> {
         console.log(res.data.message);
         setvalidMsg(res.data.message)
         if(res.data.message == 'account created'){
         /* Stop Loading */
         setloading(false)
          navgate('/login')
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
            <h2>Register Now!</h2> 
            {/* هنا كده لو المسدج ايرور فيها ايرور يعرضلي المسدج دي */}
            {errMsg !== null ? <h5 className='bg-red-600 text-center w-[95%]'>{errMsg}</h5> : validMsg == "account created" ? <h5 className='bg-green-600 text-center w-[95%]'>{validMsg}</h5> : "" }
            {/* handleSubmit ==> في الحاله دي هعمل راوند بيراكت عشان ابعت جواها الفنكشون اللي نا عايزها تتنفذ والهندله دي بتخلي الفورم بتاعتي وانا بعمل سمت ميحصلش ريلود */}
            <form onSubmit={ handleSubmit( submitForm ) }>
                  {/* Name Input */}
                  <div>
                     {/* ... ==> عملت هنا عشان الريجستر جواه اوبجكت النيم والاون شانج الحاجات دي */}
                     <Input {...register("name")} name="name" aria-label="Name" className="w-[95%] mx-auto my-3" placeholder="Enter your name" />
                     {/* انا هنا بسال لو في ايرور يعرضلي المسدج اللي انا كنت عاملها ف الفالدويشن الفورم ستيت هو شايل جواه حاجه اسمها ايرور */}
                     { formState.errors.name ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.name.message}</p> : "" }
                  </div>


                  {/* UserName Input */}
                  <div>
                     <Input {...register("username")} name="username" aria-label="username" className="w-[95%] mx-auto my-3" placeholder="Enter your UserName" />
                     { formState.errors.username ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.username.message}</p> : "" }
                  </div>


                  {/* Email Input */}
                  <div>
                     <Input {...register("email")} name="email" aria-label="email" className="w-[95%] mx-auto my-3" placeholder="Enter your Email" />
                     { formState.errors.email ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.email.message}</p> : "" }
                  </div>


                  {/* Birth Input */}
                  <div>
                     <Input {...register("dateOfBirth")} type='date' name="dateOfBirth" aria-label="dateOfBirth" className="w-[95%] mx-auto my-3"  />
                     { formState.errors.dateOfBirth ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.dateOfBirth.message}</p> : "" }
                  </div>


                  {/* Password Input */}
                  <div>
                     <Input {...register("password")} name="password" aria-label="password" className="w-[95%] mx-auto my-3" placeholder="Enter your Password" />
                     { formState.errors.password ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.password.message}</p> : "" }
                  </div>


                  {/* Re-Password Input */}
                  <div>
                     <Input {...register("rePassword")} name="rePassword" aria-label="rePassword" className="w-[95%] mx-auto my-3" placeholder="Enter your Re-Password" />
                     { formState.errors.rePassword ? <p className='bg-red-500 px-2 w-[95%]'>{formState.errors.rePassword.message}</p> : "" }
                  </div>


                  {/* Gender Input */}
                  <div>
                     <Input {...register("gender")} id='male' type='radio' value="male" name="gender" aria-label="gender" className=" mx-2 my-3"  />
                     <label htmlFor="male">Male</label>
                  </div>


                  {/* Gender Input */}
                  <div>
                     <Input {...register("gender")} id='female' type='radio' value="female" name="gender" aria-label="gender" className=" mx-2 my-3"  />
                     <label htmlFor="female">Fe-Male</label>
                  </div>
                    { formState.errors.gender ? <p className='bg-red-500 px-2 w-[95%] my-2'>{formState.errors.gender.message}</p> : "" }


                  <Button type='submit' className="w-[95%]">
                  { loading == true ?   <i className='fa fa-spin fa-spinner'></i> : "Register"  }
                  </Button>

            </form>   


         </div>
}
