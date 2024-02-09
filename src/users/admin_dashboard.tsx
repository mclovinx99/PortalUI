import { useEffect, useState } from "react";
import axios from "axios";

  type teacher ={
    email : string,
    name: string,
    id: string,
    current_school : string,
    experience : string,
    expertise : string,
    picture: string,
    previous_school : string,
    verified : boolean
  };
  

  const AdminDashboard = ()=>{
    const [teachers, setTeachers] = useState<teacher[]>([]);
    
    useEffect(()=>{
      axios({
        url:'http://localhost:4040/getTeachers',
        method:'GET'
      })
      .then((res)=>{
        const data : teacher[] = res.data.teachers;
        setTeachers(data);
        console.log(teachers,"teachers");
      })
      .catch((error)=>{
        console.log(error);
      })
    },[])

    const handleVerification =(email : any)=>{
      const token = localStorage.getItem('token');
      const data = {
        teacherEmail : email
      }
      axios({
        url: 'http://localhost:4040/verifyTeacher',
        method: 'POST',
        data: data,
        headers :{
          authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log("res")
        setTeachers((prevTeachers: teacher[]) => {
          const updatedTeachers: teacher[] = prevTeachers.map((teacher) =>
            teacher.email === email ? { ...teacher, verified: true } : teacher
          );
          return updatedTeachers;
        });
        console.log(teachers);
      })
      .catch((err)=>{
        console.log(err);
        console.log("err");
      })
    }
    
    const handleDelete =(email:any)=>
    {
      const data ={
        email : email
      };
      const token = localStorage.getItem('token');
      axios({
        url: 'http://localhost:4040/deleteTeacher',
        method: 'POST',
        data: data,
        headers :{
          authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        setTeachers((prevTeachers: teacher[]) => {
          const updatedTeachers: teacher[] = prevTeachers.filter((teacher)=>{
            return teacher.email != email;
          });
          return updatedTeachers;
        });
        console.log(teachers);
      })
      .catch((err)=>{
        console.log(err);
        console.log("err");
      })
    }

  return(
    <div className="p-6 m-6"> 
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
            </th>
        </tr>
    </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teachers.map((teacher)=>{
            return(
              <tr key={teacher.email} className="py-5 px-5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`http://localhost:4040/${teacher.picture}`} alt=""></img>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {teacher.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {teacher.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">                   
                  <div className="text-sm text-gray-900">
                    {teacher.experience}
                  </div>                    
                  <div className="text-sm text-gray-500">{teacher.expertise}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {
                    (teacher.verified==null)?
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Unverified
                    </span>:
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Verified
                    </span>
                  }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Teacher
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    {
                      (teacher.verified==null)?
                      <button onClick={()=>handleVerification(teacher.email)} className="text-indigo-600 hover:text-indigo-900">Verify</button>
                      :
                      <button  className="text-indigo-600 hover:text-indigo-900">Verified</button>
                    }
                    <button onClick={()=>handleDelete(teacher.email)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                  </td>
              </tr>
            )
            })
          }
        </tbody>
    </table>
    </div>
    )
}

export default AdminDashboard;




  