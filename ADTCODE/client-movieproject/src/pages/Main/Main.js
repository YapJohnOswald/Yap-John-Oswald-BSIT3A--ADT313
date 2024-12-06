import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/'); // Navigate to the home page or login page after logout
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      handleLogout(); // Call logout if no access token is found
    }
  }, []);

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
              <a onClick={() => navigate('/home')}>Movies</a>
            </li>
            {localStorage.getItem('accessToken') ? (
              <li className='logout'>
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className='login'>
                <a onClick={() => alert('Go to Login page')}>Login</a>
              </li>
            )}
          </ul>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;