import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layouts/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import { CounterContextProvider } from './Components/Context/counterContext';
import { UserDataProvider } from './Components/Context/UserData';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetails from './Components/PostDetails/PostDetails';
//هنا كده دي اللي بتعرفني حاله الريكوست بتاعتي الداتا اتعرضت وجديده ولا لا دي من المكتبه اللي نزلتها دي
//fresh ==> 0 / 1 ==> 0 ==> دي كده معناها اني الداتا مش فريش قديمه ولو كانت بواحد ده معناه اني الداتا فريش جديده
//fetching ==> 0 /1 ==> 0 ==> دي كده معناها اني الداتا كده ولو الداتا بواحد معناها اني الريكوست لسه شغال
// stale ==>  0 /1 ==> دي عكس الفريش لو كانت بواحدد معناه اني كده الداتا دي مش فريش قديمه ولو كانت بزيرو هتلاقي الفريش بقت واحد يعني بقت جديده علاقه عكسية
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// دي مكتبه انا منزلها عشان اعمل اليرت لما اضيف كومنت او بوست
import { ToastContainer} from 'react-toastify';


//Tanstack Query ==> Method ==> ( fetchin Data mn 4ier mact5dm useEffect , Handle Error & Loading mn 4ier mact5dm useState , Caching ==> اني الداتا عندي تتخزن تفضل موجوده , Automatic Refetch ==> لو الداتا حصل فيها تغيير الكويري بتحس وبتعرض الداتا بعد ميحصل فيها تغيير , Sharing Data ==> زي كونتكست داتا  )
//دي بكدج اسمها npm i @tanstack/react-query
// الخطوات باجي هنا ف الاول ف ال ابب وبعمل انبورت كويري كلينت وبعمل لكويري كلاينت بروفيدر
//QueryClient==> obj ,,,, QueryClientProvider==> componet ==> الاتنين معتمدين علي بعض لازم الاول اخد من الكويري كلاينت نسخه عشان احط النسخه دي ف الكويري كلاينت بروفيدر جوا الكلاينت

let qurerClient = new QueryClient();

function App() {
  

let routing =  createBrowserRouter([
    {  path : "" , element : <Layout/> , children : [
      {path : 'home' , element :<ProtectedRoute><Home/></ProtectedRoute>  },
      //home/postdetails/:id ==> انا هنا كده بقولو بعد الهوم والدتيلز ممكن يجي بعديها ايحاجه ممكن تترفع ف اليو ار ال
      {path : 'home/postdetails/:id' , element :<ProtectedRoute><PostDetails/></ProtectedRoute>  },
      {path : 'profile' , element :<ProtectedRoute> <Profile/></ProtectedRoute> },
      {path : 'login' , element : <Login/> },
      {path : 'register' , element : <Register/> },
      {path : '*' , element : <Notfound/> },
    ]  },
  ])

  return (
                              // دي النسخه
  <QueryClientProvider  client={qurerClient}>
    {/* هنا كده دي اللي بتعرفني حاله الريكوست بتاعتي الداتا اتعرضن وجديده ولا لا دي من المكتبه اللي نزلتها وعملتلها امبورت فوق */}
     <ReactQueryDevtools/>
      <UserDataProvider>
        <ToastContainer/>
        <RouterProvider router={routing}></RouterProvider>{/* AllComponets */}
      </UserDataProvider>
  </QueryClientProvider> 

    
  )
}

export default App
