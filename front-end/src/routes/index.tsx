// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import Diary from '../pages/Diary';
import Home from '../pages/home';
import CreateDiary from '../pages/CreateDiary';
import EditDiary from '../pages/EditDiary';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/diary/create" element={<CreateDiary />} />
      <Route path="/diary/edit/:id" element={<EditDiary />} />      
      {/* <Route path="/diary/:id" element={<DiaryDetail />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
