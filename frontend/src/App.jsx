import { Routes, Route, } from "react-router-dom"

import PostsList from "./pages/PostsList"
import ProfilePage from "./pages/ProfilePage"
import MainLayout from "./components/MainLayout"
import PostPage from "./pages/PostPage"
import RegistationPage from "./pages/RegistrationPage"
import LoginPage from "./pages/LoginPage"
import ChangeUserInfoPage from "./pages/ChangeUserInfoPage"
import CreatePostPage from "./pages/CreatePostPage"
import UpdatePostPage from "./pages/UpdatePostPage"
import UsersPostsPage from "./pages/UsersPostsPage"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="posts" element={<PostsList />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="auth/register" element={<RegistationPage />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="profile/change_my_info" element={<ChangeUserInfoPage />} />
          <Route path="posts/create_post" element={<CreatePostPage />} />
          <Route path="posts/update_post/:id" element={<UpdatePostPage />} />
          <Route path="posts/my_posts" element={<UsersPostsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
