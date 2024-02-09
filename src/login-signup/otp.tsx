import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type values = {
    input1: string,
    input2: string,
    input3: string,
    input4: string
  }

const OTP = ()=>{
    const [InputValues, setInputValues] = useState<values>({
        input1:" ",
        input2:" ",
        input3:" ",
        input4:" "
    });
    const [indexVal,setIndex] = useState<string>("false");
    indexVal? console.log("false") : console.log("true");
    const navigate = useNavigate();
    // console.log(indexVal);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setInputValues({...InputValues,[e.target.name] : e.target.value.replace(/\D/g, '').slice(0, 1)})
      };
      const email = localStorage.getItem('id');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        console.log(indexVal,"index")
        e.preventDefault();
        let OTP_key = InputValues.input1+ InputValues.input2 + InputValues.input3 + InputValues.input4;
        const data = {
            OTP : OTP_key,
            email : email
        }
        console.log(data);

        axios({
            url:'http://localhost:4040/OTPTeacher',
            method: 'POST',
            data : data
          })
          .then((res)=>{
            console.log(res);
            setIndex("true");
            setTimeout(()=>{
                navigate('/students')
            },2000)     
          })
          .catch((err)=>console.log(err));
    }
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div style={{ zIndex : indexVal==="false"?1:-1}} className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 
                            outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            value={InputValues.input1} onChange={(e) => handleInputChange(e)} name="input1" id=""></input>
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 
                            outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            value={InputValues.input2} onChange={(e) => handleInputChange(e)} name="input2" id=""></input>
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 
                            outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            value={InputValues.input3} onChange={(e) => handleInputChange(e)} name="input3" id=""></input>
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 
                                outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            value={InputValues.input4} onChange={(e) => handleInputChange(e)} name="input4" id=""></input>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ zIndex : indexVal==="true"?1:-1}} className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verified!</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>Logging you in.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTP;