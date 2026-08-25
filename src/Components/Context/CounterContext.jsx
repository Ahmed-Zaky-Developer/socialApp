import { createContext, useState } from "react";
// هنا كده انا بعمل الكونت تيكست ده لو انا عايز اشير داتا واجمعها ف فايل واحد داتا اللي جوا مش الكبمونت نفسه زي 
//(State , Function , varible .... )
//عشان اعمل كون تكست لازم اعمل حاجتين فاليبول وكمبونت اللي هو فنكشون بسميه نفس اسم الفاليبول بس بزود عليه كلمه بروفيدر ولازم الفنكشون دي ترترن 
export let CounterContext = createContext(); //1
// props==> ده لما ببعته كبرامتر  ده اوبجكت شايل جواه حاجه اسمها اتشيلدرن فممكن اعمل ديستركت للشيلدرن علي طول
export function CounterContextProvider({children}){   // 2==> children ==> دي البروفيدر اللي ف ال اب اللي شايله الكمبونت بتوعي كلهم بيبعت بروبس هنا ف المونترمونتكستبرفيدر بس جواها عملنا ديستركت للشيلدرن دي اللي شايله كل الكبونت بتاعتي بتاع الخريطه بتاع الراوتينج

    const [count, setcount] = useState(10);

    return <CounterContext.Provider  value={{ count , setcount }} >   {/*  Shared Data  */}
                   
               
             {children}  {/* componets children ==>  <App/> ==> all componet*/}
 
            </CounterContext.Provider>
}

//////////ملحوظه انا لو هستخدم اي هوك زي يوز نفيجيت او يوز كونتكست بستخدمها ف اول الكنبونت بعد الاكسبورت علي طول //////////////
