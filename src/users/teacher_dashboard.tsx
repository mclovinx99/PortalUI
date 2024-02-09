import axios from "axios";
import { useEffect, useState } from "react";
const email = localStorage.getItem("id");

type details = {
    name:string,
    address:string,
    pic:string,
    current_school:string,
    previous_school:string,
    experience:string,
    expertise:string,
    verified:boolean | null
}


const TeacherDashboard = () => {
    const [teachers, setTeachers] = useState<details>({
        name:" ",
        address:" ",
        pic:" ",
        current_school: " ",
        previous_school: " ",
        experience: " ",
        expertise: " ",
        verified: null
    });
    useEffect(()=>{
      axios({
        url:'http://localhost:4040/getTeacher',
        method:'POST',
        data: {email: localStorage.getItem("id")}
      })
      .then((res)=>{
        const data = res.data.teachers;
        console.log(data);
        setTeachers({
            name: data.name,
            address: data.address,
            pic: data.picture,
            current_school: data.current_school,
            previous_school: data.previous_school,
            experience : data.experience,
            expertise: data.expertise,
            verified: data.verified
        });
      })
      .catch((error)=>{
        console.log(error);
      })
      console.log(teachers, "teacher");
    },[])

    return (
        <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center flex-col cursor-pointer rounded-full m-10">
            <img src={`http://localhost:4040/${teachers.pic}`} className="w-14 h-14 rounded-full" alt="Teacher Profile" />
            <h4 className="text-base text-[#333] font-bold mt-3">{teachers.name}</h4>
            <p className="text-xs text-gray-500 mt-1">{email}</p>
        </div>
        <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Information</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{teachers.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Current School</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{teachers.current_school}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Previous School</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{teachers.previous_school}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Experience</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{teachers.experience}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Expertise</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{teachers.expertise}</dd>
                    </div> 
            </dl>
        </div>
        <div className="flex justify-center mt-5"> 
            <button
                
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 
                rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
            Edit
            </button>
        </div>
    </div>
    
    )
}
export default TeacherDashboard;