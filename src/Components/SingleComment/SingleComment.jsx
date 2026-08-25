import React from 'react'

export default function SingleComment({comment}) {

    console.log(comment); // {commentCreator :{name , photo } , content }

  return <>
             <header className="flex items-center space-x-3 mb-3 border my-3 p-2">
                {/* ? ==> انا هنا بعمل كويشن عشان ساعات بتاخد وقت فنا بقولو لما تلاقيها اعرضها اوبشن اتشينج */}
              <img src={comment?.commentCreator?.photo} className='w-10 h-10 rounded-full' alt={comment?.commentCreator?.name} />
                <div>
                  <p className="font-semibold">{comment?.commentCreator?.name}</p>
                  <p className="text-xs text-gray-500">{comment?.content}</p>
                </div>
              </header>
  
         </>
}
