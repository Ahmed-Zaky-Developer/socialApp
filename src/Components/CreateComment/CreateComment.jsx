import React from 'react'
import { useForm } from 'react-hook-form'
import Register from './../Auth/Register/Register';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function CreateComment( {id} ) {
    // انا عملت الهوك ده عشان اعندل لما اضيف كومنت يضاف علي طول من غير مروح لتابه تانيه وارجع للبيدج
    let query = useQueryClient();


    let {register , handleSubmit} = useForm({
        defaultValues: {       //الباك اللي قايلي لازم اهندل الكونتنت والايمدج
            content: "" ,
            image: ""
        }
      })

      function addComment(){
        return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments` , formdata , {  // الباك اللي قايلي اهندله ف ال ايه بي اي الفورم داتا والايدي
             headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
             }
        } )
      }
        // انا هنا مينفعش استخدم يوز كويري عشان اليوز كويري كنت بستخدمها لما الداتا كانت بتجيلي انما هنا انا اللي بببعت الداتا فهنستخدم يوز موتيشن
        // useMutation ==> بستخدمها لما باجي ابعت داتا مع ال ايه بي اي واققل حاجه لازم احط بروبرتي اللي هي موتيشن فنكشون وهنا ال ايز لودينج اللي كانت اسمها كده ف اليوز كويري اسمها هنا ايز بندينج
        // mutate ==> الفنكشون دي لازم احطها ف الديستركت ومكان منا انادي عليها الفنكشون بتاعت الادد كومنت هتتنفذ
       let {data , error , isError , isPending  , mutate} = useMutation({
            mutationFn : addComment ,
            // لو الكومنت اضاف الصكصص اللي هتشتغل
            onSuccess:()=>{
             // هنا كده عشان اعرض الكومنت علي طول من غير مروح تابه تانيه بمسك الكويري وبديها الكيه بتاع البوست اللي انا كنت مسميه ف الهوم
             query.invalidateQueries({queryKey:['getPosts']});
             query.invalidateQueries({queryKey:['getComments']});
             toast.success('Created Successfully');
            },
            // لو الكومنت مضافش الايرور اللي هتشتغل
            onError:()=>{
              toast.error('Cant Created');
            } ,
            // دي هتشتغل لو الصكصص اشتغلت او الايرور اشتغلت ف الحالتين هتشتغل
            // onSettled:()=>{

            // }
        })
      
      let formdata = new FormData(); // FormData ==> object
      // لازم اخلي الداتا بتاعت التيكست والايمدج تكون علي شكل فورم داتا الباك اند اللي قايلي كده
      function handleComment(values){  // بعمل هنا كده عشان امنع الريلود بتاع الكومنت وعشان ابعته جوا الفورم داتا هنا كده الفاليوز دي القيم اللي انا بدخلها ف الانبوت او الصورة
         console.log(values); // {content:'' , image:Filelist}
         // هنا كده بقولو لو اليوزر مدخلش كومنت او صورة همنعه انه يشوف سطرين الفورم داتا بتاعت الكونتنت والايمدج انا بعمل كده ده عشان امنع اني يالوزر يسيبهم فاضي ويبعتش حاجه للباك اند
         if(!values.content && !values.image) return
         // انا هنا كده لما عملت ريترن اي لاين بعد الريترن مش بيتشاف لازم يكون علي نفس اللاين عشان يتشاف
         if(values.content){
              formdata.append( "content"  , values.content  )
         }
         if(values.image){
              formdata.append( "image"  , values.image[0]  ) // لازم اعملها اوف زيرو الباك اند اللي قايلي كده
         }
         // Call API
         mutate();
      }


  return <>
        {/* عندي مكتبه اسمها تلويند فلكس جيبت منها الديزاين وفي مكتبه تانيه اسمها مكتبه هيرو ايقون دي جبت منهتا الايقوناات بعمل كل ده ليه  */}
        {/* api ==> الباك اند اللي قايلي اهندل حاجتين انيوت للتيكست وانبوت للصوره عرفت منين وانا بعمل تيست لل ايه بي اي */}
    <form onSubmit={handleSubmit(handleComment)}>
        <div className="flex items-center my-5">
        <label htmlFor="image"  className='me-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            </label>
            <input {...register('image')} id='image' type="file" hidden /> {/* hidden ==> بتخفي جمله جمله التشوز الكبيرة الل بتخليني اختار فايل */}
            <input {...register('content')} type="text" id="input-9" className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm" placeholder="Add Your Comment" />
            <button className="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
            </button>
        </div>
    </form>

        </>
}
