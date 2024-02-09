import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateRole,selectRole } from "../redux/role.slice";

const urls = {
    admin: 'http://localhost:4040/create',
    teacher: 'http://localhost:4040/teacherSignup'
}

const Signup = ()=>{

    type values = {
        email : string,
        password: string,
        name : string,
        confirmPass: string
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeRole = useSelector(selectRole);
    console.log("storeRole", storeRole)

    const [values,setValues] = useState<values>({
      email : " ",
      password : " ",
      name:" ",
      confirmPass: " "
    });


    const [role,setRole] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      setValues({...values,[e.target.name] : e.target.value})
    }

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setRole(e.target.value);
        console.log(role);
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let endpoint = '';
      if(role == "Admin") endpoint = urls.admin;
      if(role == "Teacher") endpoint = urls.teacher;
      if(values.password==values.confirmPass){
        dispatch(updateRole(role));
        console.log(storeRole);
        console.log();
        axios({
          url:endpoint,
          method: 'POST',
          data : values
        })
        .then((res)=>{
          localStorage.setItem('id',values.email);
          if(role=="Admin") navigate('/login')
          else navigate('/verify');
          console.log(values)
  
          
        })
        .catch((err)=>console.log(err));
      }
      else alert("Password mismatch.")
      console.log(values)
    }
    
    return(
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e)=>handleSubmit(e)}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com"></input>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" onChange={handleChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                    <select name="role" onChange={handleSelect} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 
                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a role</option>
                        <option key="admin" value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                  </div>
                    {
                        (role=="Admin")?
                        <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin name</label>
                        <input type="text" onChange={handleChange} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 
                        sm:text-sm rounded-lg 
                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name"></input>
                        </div>
                        :
                        <div></div>
                    }

                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" onChange={handleChange} name="confirmPass" id="confirmPass" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                  </div>
                  <div>
                    {
                      (values.password!="" && values.confirmPass==values.password)?
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password matched.</label>
                      :(values.password!=""&& values.confirmPass!=values.password)?
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">Password not matching.</label>
                      :
                      <div></div>
                    }
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"></input>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
            </div>
        </div>
        </div>
        </section>
    )
}

export default Signup;