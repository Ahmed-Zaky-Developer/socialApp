import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children}) {

    if(localStorage.getItem("userToken") !== null){  // user Logged ==> هنا كده بقولو لو كان اليوزر ليه توكين يعني عامل لوج ان اعرض غير كده لو اللوكال استرودج فاضي رجعه علي بيدج اللوج ان
       return children
    }else{
        return <Navigate to="/login"/>    // بدل معمل هوك يوز نفي جيت عندي كبونت جاهز اسمه نفيجات من مكتبه رياكت راوتر دوم دي برضو بتخليني اروح للباص اللي انا عايزه
    }
}
