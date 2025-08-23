import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddStore from './components/admin/AddStore';
import StoreList from './components/admin/StoreList';
import UserList from './components/admin/UserList';
import UserStoreList from './components/users/StoreList'
import Navbar from './components/Navbar';
import AdminLayout from './components/admin/AdminLayout';
import DashboardStats from './components/admin/DashboardStats';
import AdminAddOwner from './components/admin/AdminAddOwner';
import OwnerDashboard from './components/storeowner/OwnerDashboard';
import Home from './pages/Home';
import About from './pages/About';
import { useState } from 'react';
import ChangePassword from './components/ChangePassword';
function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  return (
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path='/change-password' element={<ChangePassword/>}/>

        {/* Role-based dashboards (coming soon) */}
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} /> {/* /admin redirects to /admin/dashboard */}
          <Route path="dashboard" element={<DashboardStats />} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="stores" element={<StoreList />} />
          <Route path="users" element={<UserList />} />
          <Route path="add-owner" element={<AdminAddOwner />} />
        </Route>


        <Route path="/user/stores" element={<UserStoreList/>} />


           <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
