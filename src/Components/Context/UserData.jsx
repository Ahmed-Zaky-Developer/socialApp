import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export let UserData = createContext();

export function UserDataProvider({children}){
     
    function getUserData(){
      /* لما اجي اعمل تيست هلاقيه مش عايز اي دي فهشيل السلاشين اللي هو حاطتهم وهحط ال ايه بي اي اللي هنك عشان كده لازم اعمل تيست قبل ما اكلم ال ايه بي اي*/
     return axios.get(`https://route-posts.routemisr.com/users/profile-data` ,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
          }

      })
         
      
    }

    let {data , error , isError , isLoading } = useQuery({
      queryKey:['userData'],
      queryFn: getUserData,
      select:(res)=>res?.data.data.user
    })

    // console.log(data);





                            // useState(null)==> هشيل النل وهحط اللوكال استرودج عشان لما كنت بعمل ريلود كا بيجيب كأني مسجلتش وكان بيظهر معايا== لوج ان وريجستر== ف الناف بار
                            //طيب انا هنا هعمل ف اليوز استيت لوكال استردودج وفيه جت ايتم ب اليوزر توكن اللي انا مسميه كده عشان لما اعمل ريلود الكمبونت ببيدخل ف ري ريندر وكان بيرجعها ب نل فكان بيظهرف الناف بار (اللوج ان والريجستر) كأني معملتش اللوج ان المفروض اللي يظهر اللوج اوت عشان كده شيلت النل عشان كده شيلت النل وحطيت اللوكال استرودج
    const [Token, setToken] = useState(localStorage.getItem("userToken")); 

    return <UserData.Provider value={ {Token ,  setToken , data } }>

              {children}

           </UserData.Provider>
}