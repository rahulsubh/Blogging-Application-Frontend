import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Home from "./pages/Home";
import Services from "./pages/Services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserDashboard from "./pages/user-routs/UserDashboard";
import Privateroute from "./components/Privateroute";
import ProfileInfo from "./pages/user-routs/ProfileInfo";
import PostPage from "./pages/PostPage";
import Categories from "./pages/Categories";
import UserProvider from "./context/UserProvider";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateUser from "./pages/user-routs/UpdateUser";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/categories/:categoryId" element={<Categories />} />

          <Route path="/user" element={<Privateroute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile-info/:userId" element={<ProfileInfo />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
            <Route path="update-user/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
