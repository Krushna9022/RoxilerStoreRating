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
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
