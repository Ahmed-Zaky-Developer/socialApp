import React, { useContext, useRef, useState } from 'react'
import {Button, Modal} from "@heroui/react";
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UserData } from '../Context/UserData';

export default function CreatePost() {
    // user data
  let {data:userData} = useContext(UserData);

   let query = useQueryClient();
    // انا لو عايز اسحب الداتا من التيكست اريا والاميددج دي طريقه تانيه بدل اليوز فورم والريجستر بستخدك علي التيكست اريا والانبوت اللي نوعو فايل ريف واديلها اسم الفاليبول
    let body = useRef(); // {current}
    let image = useRef(); // {current}

    const [imgSrc, setimgSrc] = useState(null);

    function previweImage(e){
         // هنا كده انا بديلو السورس بتاع الصورة وهو بيجبلي الصورة اللي انا اختارتها
         setimgSrc(URL.createObjectURL(e.target.files[0]))
    }

    function closeImage(){
        setimgSrc(null)
    }

    function createPost(){
      return axios.post(`https://route-posts.routemisr.com/posts` , handlePostData() ,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('userToken')}`
            }
        }
     )
    }

   let {data , error , isError , isPending , mutate} =  useMutation({
        mutationFn:createPost ,
        onSuccess: ()=>{
          setimgSrc(null),
          query.invalidateQueries({queryKey:['getPosts']})
          toast.success("Post Created Successfully")
        },
        onError:()=>{
        toast.success("Cant Created")
        }

    })
 
    function handlePostData(){
       let formData = new FormData();
       if( body.current.value){
           formData.append(  "body"  ,  body.current.value )
       }
       if(image.current.files[0]){
         formData.append(  "image"  , image.current.files[0]  )
       }
        // هنا كده الريترن بيرروح لمكان الكول بتاع الفنكشون يعني لما انادي الفنكشون دي الفورم داتا هتروح مكان الكول
       return formData // data
    }

  return <>
        {/* Start Modal */}
      <Modal>
        <section className="bg-gray-400 p-4 rounded shadow  w-1/2 mx-auto my-4 py-6">
          <div className="flex items-center space-x-3 mb-4">
                 <img src={userData?.photo} className='h-10 w-10 rounded-full' alt="" />
              <Button variant="secondary" className="w-full">
              <input type="text" placeholder="What's on your mind?" className="" />
              </Button>
          </div>
        
            <Modal.Backdrop>
                <Modal.Container>
                <Modal.Dialog className="sm:max-w-[360px]">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                    <Modal.Heading>Add Post</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='flex gap-3 items-end'>
                            <textarea ref={body} className='border w-full p-4' rows="4" placeholder='Enter Your Post' id=""></textarea>
                            <label htmlFor="upload">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </label>
                            <input ref={image} onChange={previweImage} id='upload' type="file" hidden/>
                        </div>
                        <div className='relative'>
                          <img className='py-2' src={imgSrc} alt="" />
                          <svg onClick={closeImage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-3 right-2 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    {/* mutate ==> الفنكشون بتاعت اليموتيشن اللي هتشغلي ال ايه بي اي هتتنفذ لما ادوس علي الزرار */}
                    <Button onClick={mutate} className="w-full" slot="close">
                        Create Post
                    </Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
  
        </section>
      </Modal>
        {/* End Modal */}
   
         </>
}
