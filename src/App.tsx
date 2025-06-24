
import { Route,Routes } from 'react-router-dom'
import CourseForm from './components/Courses/AddNewCourse'
import AddSubmoduleForm from './components/Courses/submodules/AddNewSubmodule'
import AddVideoForm from './components/Courses/videos/AddNewVideo'
import AddModuleForm from './components/Courses/modules/AddNewModule'
const App = () => {
  return (
    <>
     <Routes>
      <Route path='/' element={<div>Hello World </div>}/>
      <Route path="/addcourse" element={<CourseForm/>}/>
      <Route path="/addmodule" element={<AddModuleForm/>}/>
      <Route path="/addsubmodule" element={<AddSubmoduleForm/>}/>
      <Route path="/addvideo" element={<AddVideoForm/>}/>
     </Routes>
    </>
  )
}

export default App
