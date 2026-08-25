import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../Context/UserData'



// في مواقع عندي لو انا عايز اي ديزاين بجيب من المواقع دي زي موقع 
//==> daisy Ui ==> ده تبع التلويند لازم اكون منزل عندي التلويند وهنا باخد الاكواد من المكتبه باخد اكواد جي اس اكس
//==> بعمل كنترول اف وبعمل سيرش ف الموقع
//==> قبل ما احط الاكواد من الموقع لازم انزل مكتبه من الموقع هو اللي قايلي عليها من الموقع
//==> npm i -D daisyui@latest 
//==> وبعدها بربط اللي هو قايلي عليها ف الاندكس

// hero ui ==> دي مكتبه مهمه جدا جدا هنتعامل معاها كتير


export default function Navbar() {

  const navigate = useNavigate();

 let {Token, setToken , data} =  useContext(UserData);
 console.log(data); // data user
 
 function signOut(){       // انا هنا كده بمسح التوكن من المكانين عشان لما ادوس لوح اوت يتمسح معايا التوكين
   localStorage.removeItem("userToken");
   setToken(null);
   navigate( "/login" )
 }

  return <>
           <div className="navbar bg-base-100 shadow-sm px-16 bg-gray-200">
             {Token !==null?      <div className="flex-1"> {/* User Loged */}
                                    <Link to="home" className="btn btn-ghost text-xl text-black">Home</Link>
                                    <Link to="profile" className="btn btn-ghost text-xl text-black">Profile</Link>
                                  </div> 
                                  : 
                                  <h2 className='text-black text-2xl flex-1'>SocialApp</h2>
                                    }
            

            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={data?.photo} />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                  {Token !==null?  <li><span onClick={()=> signOut() } className='text-2xl cursor-pointer'>Logout</span></li>
                                  :
                                  <>
                  
                                   <li><Link to ="register" className='text-2xl'>Register</Link></li>
                                   <li><Link to ="login" className='text-2xl'>Login</Link></li>
                                  </> 
                                  }
                </ul>
              </div>
            </div>
          </div>
         </>
}
