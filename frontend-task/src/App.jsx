import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Layout>
              <VerifyEmail />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
/*
 npm i axios
  npm i react-router-dom
   npm install tailwindcss @tailwindcss/vite
*/