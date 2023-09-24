import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  Login,
  EmailLogin,
  SignUp,
  AdminDashboard,
  AddTool,
  DeleteTool,
  EditTool,
  CategorySearch,
  Search,
  AllTools,
  TagsSearch,
  NotFound,
} from "../pages";

const AppNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<EmailLogin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tools/:category" element={<CategorySearch />} />
      <Route path="/search/:input" element={<Search />} />
      <Route path="/alltools" element={<AllTools />} />
      <Route path="/edittool/:id" element={<EditTool />} />
      <Route path="/tags/:input" element={<TagsSearch />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin Routes */}
      <Route path="/dashboard" element={<AdminDashboard />}>
        <Route path="addtool" element={<AddTool />} />
        <Route path="modifytool" element={<DeleteTool />} />
      </Route>
      {/* Admin Routes */}
    </Routes>
  );
};

export default AppNavigation;
