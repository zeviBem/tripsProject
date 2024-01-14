import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LOGIN_WITH_JWT } from "../../Graphiql/QueryAndMutation/mutaion";
import { useMutation } from "@apollo/client";

const styles = {
    banner: {
      background: 'url(\'https://s1.1zoom.me/b6058/448/Dogs_Svetlana_Shelemeteva_Hug_Little_girls_568770_1920x1080.jpg\')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  };

const LogIn = () => {
    const [loginUserMutation] = useMutation(LOGIN_WITH_JWT);
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();
    const [inputLogin, setInputLogin] = useState({
        email: '',
        password: '',
      });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputLogin({
        ...inputLogin,
        [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Before mutation call');
        try {
            const { data } = await loginUserMutation({
                variables: {
                    input: {
                        email: inputLogin.email,
                        password: inputLogin.password
                    }
                }
            })
            setLogin(true)
            const jwt = data.authenticate.jwtToken;
            console.log('User login successfully!');
            console.log("jwt", jwt);
            
        } catch (error) {
            console.log('Error login user:', error);
            
        }
    }

    useEffect(() => {
        if (login) {
          console.log('loginSuccessfully');
          navigate('/');
        }
      }, [login, navigate]);
    return (
        <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundImage: 'url("https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_7_i.jpg")', backgroundSize: 'cover' }}
        >
            <section className="max-w-4xl p-6 rounded-md shadow-md bg-emerald-800 bg-opacity-60">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-white capitalize dark:text-white">
                        Sign in to your account
                    </h1>
                        <form className="space-y-4 md:space-y-6" action="#"  onSubmit={handleLogin}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                                <input type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your email" value={inputLogin.email} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                                <input type="password" name="password"  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputLogin.password} onChange={handleInputChange} />
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-pink-700 hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"  onClick={() => navigate('/register')}>Sign up</a>
                            </p>
                        </form>
                    </div>
            </section>

        </div>
    )
}

export default LogIn 



