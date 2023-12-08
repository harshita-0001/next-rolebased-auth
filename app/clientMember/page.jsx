'use client';
// import { getServerSession } from "next-auth";
// import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import {useSession} from 'next-auth/react'
const clientMember=()=>{
    // ====================support in server ==================
    // const session=await getServerSession(options);
    // if(!session)
    // {
    //     redirect("/api/auth/signin?callbackUrl=/clientMember")
    // }

    // client component

    const{data:session}=useSession({
            required:true,
            onUnauthenticated(){
                redirect("/api/auth/signin?callbackUrl=/clientMember");
            },
    });

    return(
        <div>
            <h1>
                Member Client Session
            </h1>
            <h4>{session?.user?.email}</h4>
            <h4>{session?.user?.role}</h4>
        </div>
    )
}

export default clientMember;