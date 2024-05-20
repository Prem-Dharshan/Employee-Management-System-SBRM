import './App.css';
import DepartmentComponent from './components/DepartmentComponent';
import EmployeeComponent from './components/EmployeeComponent';
import { FooterComponent } from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListDepartment from './components/ListDepartmentComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/'></Route>

                    <Route path='/employees' element={<ListEmployeeComponent />}></Route>

                    <Route path='/add-employee' element={<EmployeeComponent />}></Route>

                    <Route path='/update-employee/:id' element={<EmployeeComponent />}></Route>

                    <Route path='/departments' element={<ListDepartment />}></Route>

                    <Route path='/add-department' element={ <DepartmentComponent /> }></Route>

                    <Route path='/update-department/:id' element={ <DepartmentComponent/>}></Route>
                </Routes>
                <FooterComponent />
            </BrowserRouter>
        </>
    );
}

export default App;
