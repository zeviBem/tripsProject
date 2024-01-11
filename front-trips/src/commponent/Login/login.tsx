import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL} from "../../Graphiql/QueryAndMutation/queryes";
import { ChangeEvent, useState } from "react";
const styles = {
    banner: {
      background: 'url(\'https://s1.1zoom.me/b6058/448/Dogs_Svetlana_Shelemeteva_Hug_Little_girls_568770_1920x1080.jpg\')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  };

const LogIn = () => {
    const navigate = useNavigate();

    const [inputLogin, setInputLogin] = useState({
        email: '',
        password: '',
      });
    
    // const { loading, error, data } = useQuery(GET_USER_BY_EMAIL, {
    //     variables: {inputLogin.email} 
    // });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
  
    // const user = data.usersTableByEmail;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputLogin({
        ...inputLogin,
        [e.target.name]: e.target.value,
        });
    };

    // const handleLogin = (
    //     if ()
    // )
    return (
<div>
<div className='grid grid-cols-12'>
        <div className="col-span-4 text-white font-sans font-bold bg-emerald-900 min-h-screen pl-7">
            <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
                <div className="row-span-4 row-start-2 text-4xl">
                    Sign In                    
                    <div className="pt-10 pr-20">                        
                        <label className="text-sm font-sans font-medium">
                            Email
                        </label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Write your email" 
                            className="w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans rounded-full"/>                            
                    </div>
                    <div className="pt-2 pr-20">
                        <label className="text-sm font-sans font-medium">
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Write your password" 
                            className="w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans rounded-full"
                            />
                        <a href="" className="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a>
                    </div>
                    <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
                        <button 
                            type="button"   
                            className="text-center w-full py-4 bg-black hover:bg-gray-400  text-white rounded-full">
                                SIGN IN
                        </button>
                    </div>
                </div>
                <p className="text-sm font-sans font-medium text-gray-400 underline" onClick={() => navigate('/register')}>
                    Don´t have an account? Sign up
                </p>
            </div>         
        </div>

        <div className="banner col-span-8 text-white font-sans font-bold" style={styles.banner}>
          <p>Some content here</p>
        </div> 
</div>

</div>
    )
}

export default LogIn 