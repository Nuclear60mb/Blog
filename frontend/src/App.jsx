import {Routes, Route} from "react-router-dom"

import PostsList from "./pages/PostsList"
// import Header from "./components/Header old" old
import HomePage from "./pages/HomePage"
import MainLayout from "./components/MainLayout"
import PostPage from "./pages/PostPage"


function App() {
  return (
    <div>
      {/* <Header /> old */}
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="/posts" element={<PostsList />} />
          <Route path="/home" element={<HomePage />}/>
          <Route path="/posts/:id" element={<PostPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
