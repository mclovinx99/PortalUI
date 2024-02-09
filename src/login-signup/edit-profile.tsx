import { useState } from "react";
import axios from "axios";

type teachers = {
    name : string,
    address : string,
    current_school : string,
    previous_school : string,
    experience : string,
    expertise: string,
    picture : File | null,
    email: string
};
type image={
    picture: File | null
}

const EditProfile = ()=>{

    const [teacherData, setTeachers] = useState<teachers>({
        name: " ",
        address: " ",
        current_school: " ",
        previous_school: " ",
        experience: " ",
        expertise: " ",
        picture: null,
        email : "aditya.rathi.hestabit@gmail.com"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setTeachers({...teacherData,[e.target.name] : e.target.files[0]});
        }
        else setTeachers({...teacherData,[e.target.id] : e.target.value});
      }
      const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios({
          url:'http://localhost:4040/createTeacher',
          method: 'POST',
          data : teacherData,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then((res)=>{
          console.log(res)
          console.log(teacherData);
          
        })
        .catch((err)=>console.log(err));
      }


    return(
        <div className="p-6">
            <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Complete your account!</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                            <input id="name" onChange={handleChange} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 
                            dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></input>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="address">Address</label>
                            <input id="address" onChange={handleChange} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></input>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="previous_school">Current School</label>
                            <input id="current_school" onChange={handleChange} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></input>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="previous_school">Previous School</label>
                            <input id="previous_school" onChange={handleChange} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></input>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="experience">Experience</label>
                            <input id="experience" type="text" onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></input>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="Expertise">Expertise</label>
                            <input id="expertise" type="text" onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></input>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <div>
                            <label className="block text-sm font-medium text-white">
                            Image
                        </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-white" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span className="">Upload a file</span>
                                    <input id="file-upload" name="picture" 
                                    onChange={handleChange} type="file" 
                                    className="sr-only"></input>
                                    </label>
                                    <p className="pl-1 text-white">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button
                        type="submit" 
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 
                        rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default EditProfile;