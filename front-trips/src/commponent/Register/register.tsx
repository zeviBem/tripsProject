
const styles = {
    banner: {
      background: 'url(\'https://s1.1zoom.me/b6058/448/Dogs_Svetlana_Shelemeteva_Hug_Little_girls_568770_1920x1080.jpg\')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  };

const Register = () => {

    return (
<div>
<div className='grid grid-cols-12'>
        <div className="col-span-4 text-white font-sans font-bold bg-emerald-900 min-h-screen pl-7">
            <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
                <div className="row-span-4 row-start-2 text-4xl">
                    Sign Up                    
                    <div className="pt-10 pr-20">                        
                        <label className="text-sm font-sans font-medium">
                            First Name
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Write your username" 
                            className="w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans rounded-full"/>                            
                    </div>
                    <div className="pt-2 pr-20">
                        <label className="text-sm font-sans font-medium">
                            Last Name
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Write your username" 
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
                    </div>
                    <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
                        <button 
                            type="button"   
                            className="text-center w-full py-4 bg-black hover:bg-gray-400  text-white rounded-full">
                                Create Account
                        </button>
                    </div>
                </div>
                <a href="" className="text-sm font-sans font-medium text-gray-400 underline">
                already have an account? Sign in
                </a>
            </div>         
        </div>

        <div className="banner col-span-8 text-white font-sans font-bold" style={styles.banner}>
          <p>Some content here</p>
        </div> 
</div>

</div>
    )
}

export default Register