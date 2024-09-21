'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/AuthenticationReducer';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch=useDispatch();
  useEffect(() => {
      const loginStatus = localStorage.getItem('isloggedin') || false;
      console.log(loginStatus);
      if(loginStatus=='true'){
        setIsLoggedIn(true);
      }
  }, []);

  // Handle logout
  const handleLogout = async() => {
    const resp=await dispatch(logout());
    console.log(resp);
    if(resp.payload.data.success){
      setIsLoggedIn(false);
      router.push('/signin');
      console.log(resp.payload.data.sucess);
    }
    // Redirect to sign-in page
  };

  return (
    <nav className="bg-black text-black px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">
        <a href="/">My Task App</a>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => router.push('/AddTask')}
            >
              Add Task
            </button>
            <button
              className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => router.push('/ListTask')}
            >
              List Tasks
            </button>
            <button
              className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => router.push('/KadaneBoard')}
            >
              Kanban Board
            </button>
            
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => {
                console.log("pushme");
                router.push('/signin')
                
              }}
            >
              Sign In
            </button>
            <button
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;