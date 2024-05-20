// import { FC, useEffect, useState } from 'react';
// import { deleteEmployee, listEmployees } from '../service/EmployeeService';
// import { Employee } from '../types/EmployeeType';
// import { useNavigate } from 'react-router-dom';

// const ListEmployeeComponent: FC = () => {
//     const [employees, setEmployees] = useState<Employee[]>([]);

//     const navigator = useNavigate();

//     useEffect(() => {
//         getAllEmployees();
//     }, []);

//     const getAllEmployees = () => {
//         listEmployees()
//             .then((response) => {
//                 setEmployees(response);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     const addNewEmployee = () => {
//         navigator('/add-employee');
//     };

//     const updateEmployeeHandler = (id: number | undefined) => {
//         navigator(`/update-employee/${id}`);
//     };

//     const deleteEmployeeHandler = (id: number | undefined) => {
//         deleteEmployee(Number(id))
//             .then((response) => {
//                 getAllEmployees();
//                 console.log(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     const returnElt = (
//         <div className='container'>
//             <h2 className='text-center'>List of Employees</h2>

//             <button type='button' className='btn btn-info mb-2' onClick={addNewEmployee}>
//                 Add Employee
//             </button>

//             <table className='table table-info table-striped table-hover table-bordered'>
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th> Email </th>
//                         <th> Department </th>
//                         <th> Actions </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employees.map((employee) => (
//                         <tr key={employee.id}>
//                             <td>{employee.id}</td>
//                             <td>{employee.firstName}</td>
//                             <td>{employee.lastName}</td>
//                             <td>{employee.email}</td>
//                             <td>{employee.departmentId}</td>
//                             <td>
//                                 <button
//                                     className='btn btn-info'
//                                     onClick={() => updateEmployeeHandler(employee.id)}
//                                 >
//                                     {' '}
//                                     Update{' '}
//                                 </button>
//                                 <button
//                                     className='btn btn-danger ml-10'
//                                     onClick={() => deleteEmployeeHandler(employee.id)}
//                                 >
//                                     {' '}
//                                     Delete{' '}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );

//     return returnElt;
// };

// export default ListEmployeeComponent;




// /----------------------------------------------------

// import { ChangeEvent, useEffect, useState } from 'react';
// import { Employee } from '../types/EmployeeType';
// import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getAllDepartments } from '../service/DepartmentService';
// import { Department } from '../types/DepartmentType';

// const EmployeeComponent = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [departmentId, setDepartmentId] = useState('');
//     const [departments, setDepartments] = useState<Department[]>([]);

//     useEffect(() => {
//         getAllDepartments().then((response) => {
//             setDepartments(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//     }, []);

//     const { id } = useParams();

//     const [errors, setError] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         departmentId: ''
//     });

//     const navigator = useNavigate();

//     useEffect(() => {
//         if (id) {
//             const employeeId = Number(id);
//             if (!isNaN(employeeId)) {
//                 getEmployee(employeeId)
//                     .then((response) => {
//                         setFirstName(response.data.firstName);
//                         setLastName(response.data.lastName);
//                         setEmail(response.data.email);
//                         setDepartmentId(response.data.departmentId);
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             } else {
//                 console.error('Invalid employee ID:', id);
//             }
//         }
//     }, [id]);

//     // useEffect(() => {
//     //     if (id) {
//     //         const employeeId = Number(id);
//     //         if (!isNaN(employeeId)) {
//     //             getEmployee(employeeId)
//     //                 .then((response) => {
//     //                     setFirstName(response.data.firstName);
//     //                     setLastName(response.data.lastName);
//     //                     setEmail(response.data.email);
//     //                     setDepartmentId(response.data.departmentId?.toString() || '');
//     //                 })
//     //                 .catch((error) => {
//     //                     console.error(error);
//     //                 });
//     //         } else {
//     //             console.error('Invalid employee ID:', id);
//     //         }
//     //     }
//     // }, [id]);

//     const formValidator = () => {
//         let valid = true;

//         const errorsCopy = { ...errors };

//         if (!firstName.trim()) {
//             errorsCopy.firstName = 'First Name is required';
//             valid = false;
//         }

//         if (!lastName.trim()) {
//             errorsCopy.lastName = 'Last Name is required';
//             valid = false;
//         }

//         if (!email.trim()) {
//             errorsCopy.email = 'Email is required';
//             valid = false;
//         }

//         if (!departmentId){
//             errorsCopy.departmentId = 'Department is required';
//             valid = false;
//         }

//         setError(errorsCopy);

//         return valid;
//     };

//     const handleFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
//         setFirstName(event.target.value);
//     };

//     const handleLastName = (event: ChangeEvent<HTMLInputElement>): void => {
//         setLastName(event.target.value);
//     };

//     const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
//         setEmail(event.target.value);
//     };

//     const handleDepartmentChange = (event: ChangeEvent<HTMLSelectElement>): void => {
//         setDepartmentId(event.target.value);
//     };

//     const saveOrUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>): void => {
//         event.preventDefault();

//         if (!formValidator()) {
//             return;
//         }

//         const employee: Employee = { firstName, lastName, email, isDeleted: false, departmentId: Number(departmentId) };
//         console.log(employee);

//         if (id) {
//             updateEmployee(Number(id), employee)
//                 .then((response) => {
//                     console.log(response.data);
//                     navigator('/employees');
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         } else {
//             createEmployee(employee)
//                 .then((response) => {
//                     console.log(response.data);
//                     navigator('/employees');
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         }
//     };

//     function pageTitle() {
//         if (id) {
//             return <h2 className='text-center'>Update Employee</h2>;
//         } else {
//             return <h2 className='text-center'>Add Employee</h2>;
//         }
//     }

//     const departmentHandler = () => {
//         return departments.map((department) => (
//             <option key={department.id} value={department.id}>
//                 {department.departmentName}
//             </option>
//         ));
//     };

//     const returnElt: JSX.Element = (
//         <div className='container'>
//             <br />
//             <div className='row'>
//                 <div className='card col-md-6 offset-md-3 offset-md-3'>
//                     {pageTitle()}
//                     <div className='card-body'>
//                         <form>
//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>First Name:</label>
//                                 <input
//                                     type='text'
//                                     placeholder='First Name'
//                                     name='firstName'
//                                     value={firstName}
//                                     className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                                     onChange={handleFirstName}
//                                 />
//                                 {errors.firstName && (
//                                     <div className='invalid-feedback'>{errors.firstName}</div>
//                                 )}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Last Name:</label>
//                                 <input
//                                     type='text'
//                                     placeholder='Last Name'
//                                     name='lastName'
//                                     value={lastName}
//                                     className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                                     onChange={handleLastName}
//                                 />
//                                 {errors.lastName && (
//                                     <div className='invalid-feedback'>{errors.lastName}</div>
//                                 )}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Email:</label>
//                                 <input
//                                     type='email'
//                                     placeholder='Email'
//                                     name='email'
//                                     value={email}
//                                     className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                                     onChange={handleEmail}
//                                 />
//                                 {errors.email && (
//                                     <div className='invalid-feedback'>{errors.email}</div>
//                                 )}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'> Select Department</label>
//                                 <select 
//                                     className={`form-control ${errors.departmentId ? 'is-invalid': ''}`}
//                                     name="" 
//                                     id=""
//                                     value={departmentId}
//                                     onChange={ handleDepartmentChange }
//                                 >
//                                     <option value="Select Department"> Select a department </option>
//                                     { departmentHandler() }
//                                 </select>

//                                 {errors.email && (
//                                     <div className='invalid-feedback'>{errors.email}</div>
//                                 )}
//                             </div>

//                             {errors.departmentId && (
//                                     <div className='invalid-feedback'>{errors.departmentId}</div>
//                             )}

//                             <br />
//                             <button
//                                 type='submit'
//                                 className='btn btn-success'
//                                 onClick={saveOrUpdateEmployee}
//                             >
//                                 Submit
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     return returnElt;
// };

// export default EmployeeComponent;
