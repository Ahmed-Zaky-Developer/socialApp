import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import SingleComment from '../SingleComment/SingleComment';
import CreateComment from '../CreateComment/CreateComment';

export default function PostDetails() {

    let {id} =  useParams(); // {id:Postid} ==> ده هوك بستخدمه عشان اهندل ال اي دي بعد مهندلت الراوتينج وسميت هناك اي دي هيترفع بعد البوست دتيلز بيرفع الاسم المتغير اللي انا سميته هناك يعني لو كنت سميته هناك تيست كان هيتسمي هنا تيست

    function getAllComments(){
                         // هو اللي قايلي برضو اني لازم احط هنا بوست اي دي ما بين السلاشين
        return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10` , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }

    // هنا ف اليوز الكويري لو اكتر من يوز كويري ف الاوبجكت اللي بيجعلي الاسامي مينفعش تبقي هي هي بسميها انا اسم تاني عشان الاسامي متبقاش متكرره
    // كده الداتا عندي بقت متخزنه جوا كومنتت
    let {data:comments } = useQuery({
        queryKey : ["getComments"] ,
        queryFn : getAllComments ,
        select: (res)=> res?.data.data.comments,
    })

    console.log(comments); // [{} , {}] ==> دي كده عباره عن الاراي اوف الكومنت


    function getPostDetails(){
      return axios.get(`https://route-posts.routemisr.com/posts/${id}` , {  // هنا كده لازم اجيب بوست اي دي الراجل بتاع الباك هو اللي قايلي كده وانا بتيست ال ايه بي اي
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }

    let {data , error , isError , isLoading} = useQuery({
        queryKey : ['postDetails'] ,
        queryFn : getPostDetails ,
        select : (res) => res?.data.data.post //Selsct ==> هنا بتاخد الريس بالداتا وبتخزنها مكان الداتا اللي مبعوته ف اليوز كويري وبعدها انا بعمل رترن لدوت داتا دوت داتا دوت بوست
    })
    //  console.log(data);


  return <> {/* Post Details */}
           <div className="bg-gray-200 text-black w-1/2 mx-auto my-3 p-4 rounded shadow">
                <header className="flex items-center space-x-3 mb-3">
                    <img src={data?.user.photo} className='w-10 h-10 rounded-full' alt={data?.user.name} />
                <div>
                    <p className="font-semibold">{data?.user.name }</p>
                    <p className="text-xs text-gray-500">{data?.createdAt}</p>
                </div>
                </header>
                {data?.body && <p className="mb-3">{data?.body}</p>} {/* && ==> ده معناه لو كان البوست عنده بادي اعرضه ف برجراف */}
                {data?.image &&  <img src={data?.image} alt={data?.body} className="rounded max-h-96 w-full object-cover mb-3" />}
                <div className="flex justify-between text-gray-600 text-sm font-semibold">
                <button className="flex items-center cursor-pointer space-x-1 hover:text-blue-600">
                    <i className="fas fa-thumbs-up" /><span>{data?.likesCount} Like</span>
                </button>
                <button className="flex items-center cursor-pointer space-x-1 hover:text-blue-600">
                    <i className="fas fa-comment" /><span>Comment</span>
                </button>
                <button className="flex items-center cursor-pointer space-x-1 hover:text-blue-600">
                    <i className="fas fa-share" /><span>Share</span>
                </button>
                </div>
{/* لازم ابعتلها اي دي عشان انا كنت ببعتلها داتا ف البروبس اي دي برضو ف الكريت كومنت عشان اقدر اكريت كومنت*/}
                <CreateComment id = {id} />



                 {/* display To All Comments */}
                    {comments?.map( (com)=> {
                        // comment==> لازم هنا يبقي اسمها كومنت عشان انا ببعت اصلا ف السينجل كومنت كومنت ف الديستركت
                        return <SingleComment key={com._id}  comment = {com} />
                    } )}
            </div>
         </>
}
