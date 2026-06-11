import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Modules from "./pages/Modules";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import TaskList from "./pages/dashboard/TaskList";
import TodoList from "./pages/dashboard/TodoList";
import Projects from "./pages/dashboard/Projects";
import Timesheet from "./pages/dashboard/Timesheet";
import RFP from "./pages/dashboard/Rfp";
import Qa from "./pages/dashboard/Qa";
import FinalSourceList from "./pages/dashboard/FinalSourceList";
import AddFinalSource from "./pages/dashboard/AddFinalSource";
import AddTodo from "./pages/dashboard/AddTodo";
import TodoCalendar from "./pages/dashboard/TodoCalendar";
import TaskCalendar from "./pages/dashboard/TaskCalendar";
import TimesheetEditRequest from "./pages/dashboard/TimesheetEditRequest";
import ClientTimesheet from "./pages/dashboard/ClientTimesheet";
import TimesheetApproval from "./pages/dashboard/TimesheetApproval";
import ProjectDetails from "./pages/dashboard/ProjectDetails";
import Settings from "./pages/dashboard/Settings";
import EmployeeBasicDetails from "./pages/dashboard/EmployeeBasicDetails";
import QualificationDetails from "./pages/dashboard/Qualification";
import Qualification from "./pages/dashboard/Qualification";
import Personal from "./pages/dashboard/Personal";
import AddressCommDetails from "./pages/dashboard/Address";
import AccountSettings from "./pages/dashboard/AccountSettings";
import FixedPrice from "./pages/dashboard/FixedPrice";
import TimeMaterial from "./pages/dashboard/TimeMaterial";
import Retainer from "./pages/dashboard/Retainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
       <Route path="tasks" element={<TaskList />} />
<Route path="tasks/calendar" element={<TaskCalendar />} />
        <Route path="todo" element={<TodoList />} />
<Route path="todo/calendar" element={<TodoCalendar />} />
<Route path="todo/add" element={<AddTodo />} />
        <Route path="projects" element={<Projects />} />
       <Route
  path="projects/:id"
  element={<ProjectDetails />}
/>
       <Route path="timesheet" element={<Timesheet />} />
<Route path="timesheet/timesheetapproval" element={<TimesheetApproval />} />
<Route path="timesheet/edit-request" element={<TimesheetEditRequest />} />
<Route path="timesheet/clienttimesheet" element={<ClientTimesheet />} />
        <Route path="rfp" element={<RFP/>} />
        <Route path="qa" element={<Qa/>} />
         <Route path="final-resource" element={<FinalSourceList />} />
  <Route path="final-resource/add" element={<AddFinalSource />} />
  {/* <Route path="employee-basic-details" element={<EmployeeBasicDetails />} /> */}
  <Route path="settings" element={<Settings />} />
  <Route path="qualification" element={<Qualification />} />
  <Route path="personal" element={<Personal />} />
  <Route path="address" element={<AddressCommDetails />} />
  <Route path="account-settings" element={<AccountSettings />} />
  <Route path="/dashboard/fixed-price" element={<FixedPrice />} />
  <Route path="/dashboard/time-material" element={<TimeMaterial />} />
  <Route path="/dashboard/retainer" element={<Retainer />} />
      </Route>
    </Routes>
  );
}

export default App;