import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StoreList from "./pages/StoreList";
import OwnerDashboard from "./pages/OwnerDashboard";
import CreateUser from "./pages/CreateUser";
import CreateStore from "./pages/CreateStore";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import UsersList from "./pages/UsersList";
import StoresList from "./pages/StoresList";
import UserDetails from "./pages/UserDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <StoreList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-store"
          element={
            <ProtectedRoute>
              <CreateStore />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/users"
  element={
    <ProtectedRoute>
      <UsersList />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <ProtectedRoute>
      <StoresList />
    </ProtectedRoute>
  }
/>

<Route
  path="/users/:id"
  element={
    <ProtectedRoute>
      <UserDetails />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;