
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import { checkAuthSession } from './store/authstore';

function App() {
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuthSession()); // Check session on app load
}, [dispatch]);


  return (
    <div className=''>
    {/* <header className="fixed top-0 right-0 w-full bg-transparent z-10">
        <Header/>
      </header> */}

      {/* Main Content */}
      <main className="  ">
        <Outlet />
      </main>

      <footer>
        <Footer/>
      </footer>
   
    </div>
  )
}

export default App
