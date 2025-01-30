import './App.css';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu'
import 'bootstrap/dist/css/bootstrap.min.css';
import Reservation from './Pages/Reservation';
import Contact from './Pages/Contact';
import AdminHome from './Admin/Pages/AdminHome.jsx';
import Admenuitemslist from './Admin/Pages/Admenuitemslist.jsx';
function App() {
  return (
    <Router>
      <Routes>
       <Route path='/' element={<Home/>}/>{/* Home page */}
        <Route path='/home' element={<Home/>}/>{/* Home page */}
        <Route path='/menu' element={<Menu/>}/>{/* Menu page */}
        <Route path='/make-a-reservation' element={<Reservation/>}/>{/* Reservation page */}
        <Route path='/contact-us' element={<Contact/>}/>{/* Contact page */}

        {/* Admin Routes */}
        <Route path='/Admin' element={<AdminHome/>}/>{/* Contact page */}
        <Route path='/menulist/:id' element={<Admenuitemslist/>}/>{/* Contact page */}
      </Routes>
    </Router>
  );
}

export default App;
