import React, { useContext } from 'react'
import SingleComment from '../SingleComment/SingleComment';
import { Link } from 'react-router-dom';
import CreateComment from '../CreateComment/CreateComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import DropDown from '../DropDown/DropDown';
import { UserData } from '../Context/UserData';
// كنت ببعت البوست ده ف الهوم عشان اجيب ال اي دي
export default function PostCard(  {post}  ) {

   let {data:userData} =  useContext(UserData);

    let query = useQueryClient();

    // هنا عشان النوع put 
    // لازم ابعتله داتا بس الداتا دي هتكون فاضيه فممكن تكون اوبجكت فاضي
    function likePost(){
        return axios.put(`https://route-posts.routemisr.com/posts/${post.id}/like`,{} ,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }


   let {data:likeData , error:likeErr , isError:likeIsErr , mutate:likeFn} =  useMutation({
        mutationFn:likePost , 
        onSuccess:()=>{
            query.invalidateQueries({queryKey:['getPosts']});
            query.invalidateQueries({queryKey:['userPosts']});
            toast.success('Liked')
        },
        onError:()=>{
            toast.error("Un-Liked")
        }
    })

    // console.log(likeData?.data.data.liked);

    // console.log(post); // {body , createdAt , image , likesCount , topComment ,....} // ده الاوبجكت اللي راحعلي من الباك اند ده الداتا


  return <>
           <div className="bg-gray-200 text-black w-1/2 mx-auto my-4 p-4 rounded shadow">
               
                <header className="flex justify-between items-center space-x-3 mb-3">
                <Link to={`postdetails/${post?.id}`}>
                   <div className='flex gap-3'>
                     <img src={post?.user.photo} className='w-10 h-10 rounded-full' alt={post?.user.name} />
                     <div>
                        <p className="font-semibold">{post?.user.name }</p>
                        <p className="text-xs text-gray-500">{post?.createdAt}</p>
                     </div>
                   </div>
                </Link>
                {/* Start DropDown */}
                <div>
                    {/* هنا كده بهندل اني الدروب داون يظهر بس علي بوستاتي انا بس مش كل البوستات بقارن ما بين الايدي الللي شيرد علي الموقع كله بتاع التوكن وما بين الايدي بتاع اليوز بتاع البوست نفسه*/}
                    { post.user._id === userData._id && <DropDown id={post?._id} /> }
                </div>
                {/* End DropDown */}
                </header>
              
                {post.body && <p className="mb-3">{post.body}</p>} {/* && ==> ده معناه لو كان البوست عنده بادي اعرضه ف برجراف */}
                {post.image &&  <img src={post?.image} alt={post?.body} className="rounded max-h-96 w-full object-cover mb-3" />}
                <div className="flex justify-between text-gray-600 text-sm font-semibold">
                <button onClick={likeFn} className={`flex items-center cursor-pointer space-x-1 hover:text-blue-600 ${likeData?.data.data.liked ?'text-blue-600' : '' }`}>
                    <i className="fas fa-thumbs-up" /><span>{post?.likesCount} Like</span>
                </button>
                <button className="flex items-center cursor-pointer space-x-1 hover:text-blue-600">
                    <i className="fas fa-comment" /><span>Comment</span>
                </button>
                <button className="flex items-center cursor-pointer space-x-1 hover:text-blue-600">
                    <i className="fas fa-share" /><span>Share</span>
                </button>
                </div>
                {/* Start Add Comment */}
                   <CreateComment id = {post?.id} />
                {/* End Add Comment */}



                {/* Single Comment */}
                 {post.topComment &&  <SingleComment comment = {post?.topComment} />}
            </div>


         </>
}
