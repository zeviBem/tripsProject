import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../Graphiql/QueryAndMutation/mutaion';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [createUserMutation] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserMutation({
        variables: {
          input: {
            usersTable: newUser,
          },
        },
      });
      console.log('User created successfully!');
      setTimeout(() => {
        navigate('/login'); // Replace with the actual path
      }, 3000);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_7_i.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <section className="max-w-4xl p-6 rounded-md shadow-md bg-emerald-800 bg-opacity-60">
        <div className="bg-pink-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 m-5">
          <h1 className="text-3xl font-bold text-white capitalize dark:text-white">
            Create Your'e Account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your name"
                value={newUser.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="write your email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={newUser.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-pink-800 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create Account
            </button>
            <p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
              already have an account?{' '}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
