import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@heroui/react'
import axios from 'axios'
import PostCard from '../PostCard/PostCard';
import { ScaleLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import CreatePost from '../CreatePost/CreatePost';
import useApi from './useApi';



export default function Home() {

let {data , error , isError, isLoading , isFetched , isFetching } = useApi();

// Tanstack Query ==> هنا ف الايرور لو لقي ايرور هو بيقعد يحاول مره واتنين وارربعه لحد ميتاكد لو الايرور فضل موجود بيعرضه زي منا مقولتلو
//Error
console.log(data); // { {} }
if( isError == true ){
  return <div className='h-screen flex justify-center items-center'>
            <h2>{error.message}</h2>
         </div>
}

// Loading
if( isLoading == true ){
  return <div className='h-screen flex justify-center items-center'>
            <ScaleLoader color='gray'/>
         </div>
}




  return <>
          {/* Create Post Box */}
           
          <CreatePost/>


          {data?.map( ( post )=>{
            return <PostCard key={post.id} post = {post}  />
          } )}
          

        </>
}
