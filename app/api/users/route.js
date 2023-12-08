import User from "@/app/(models)/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
export async function POST(req)
{

    try {
        const userData=await req.json();
        console.log(userData,"user");

       
        if(!userData.email||!userData.password)
        {
        return NextResponse.json({message:"All field are required"},{status:400});
        }
        // check for duplicate email
        const duplicate=await User.findOne({email:userData.email}).lean().exec();
        if(duplicate)
        {
            return NextResponse.json({message:"Email is already Exist"},{status:409})
        }

        const hashedPassword=await bcrypt.hash(userData.password,10);
        userData.password=hashedPassword;
        await User.create(userData);
        return NextResponse.json({message:"User Creaed Succesfully."},{status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"ERROR",error},{status:500})
    }
}