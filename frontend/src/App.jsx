import { Routes, Route, } from "react-router-dom"

import PostsList from "./pages/PostsList"
// import Header from "./components/Header old" old
import ProfilePage from "./pages/ProfilePage"
import MainLayout from "./components/MainLayout"
import PostPage from "./pages/PostPage"
import RegistationPage from "./pages/RegistrationPage"
import LoginPage from "./pages/LoginPage"
import ChangeUserInfoPage from "./pages/ChangeUserInfoPage"


function App() {
  return (
    <div>
      {/* <Header /> old */}
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="/posts" element={<PostsList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/auth/register" element={<RegistationPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/changeinfo" element={<ChangeUserInfoPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
