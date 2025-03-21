
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
// const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(checkAuthSession()); // Check session on app load
// }, [dispatch]);


  return (
    <>
    <header className="fixed top-0 right-0 w-full bg-transparent z-10">
        <Header/>
      </header>

      {/* Main Content */}
      <main className="  ">
        <Outlet />
      </main>
   
    </>
  )
}

export default App
