import { FC, useEffect, useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { deleteEmployee, listEmployees } from '../service/EmployeeService';
import { Employee } from '../types/EmployeeType';
// import { useNavigate } from 'react-router-dom';
import EmployeeComponent from './EmployeeComponent'; // Adjust the path if necessary

const ListEmployeeComponent: FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    // const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        listEmployees()
            .then((response) => {
                setEmployees(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addNewEmployee = () => {
        setSelectedEmployeeId(null);
        setIsEdit(false);
        setIsPaneOpen(true);
    };

    const updateEmployeeHandler = (id: number) => {
        setSelectedEmployeeId(id || null);
        setIsEdit(true);
        setIsPaneOpen(true);
    };

    const deleteEmployeeHandler = (id: number) => {
        deleteEmployee(Number(id))
            .then((response) => {
                getAllEmployees();
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>

            <button type='button' className='btn btn-info mb-2' onClick={addNewEmployee}>
                Add Employee
            </button>

            <table className='table table-info table-striped table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th> Email </th>
                        <th> Department </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.departmentId}</td>
                            <td>
                                <button
                                    className='btn btn-info'
                                    onClick={() => updateEmployeeHandler(employee.id)}
                                >
                                    Update
                                </button>
                                <button
                                    className='btn btn-danger ml-10'
                                    onClick={() => deleteEmployeeHandler(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <SlidingPane
                isOpen={isPaneOpen}
                title={isEdit ? 'Update Employee' : 'Add Employee'}
                onRequestClose={() => setIsPaneOpen(false)}
            >
                <EmployeeComponent
                    employeeId={selectedEmployeeId}
                    isEdit={isEdit}
                    onClose={() => setIsPaneOpen(false)}
                    onSave={getAllEmployees}
                />
            </SlidingPane>
        </div>
    );
};

export default ListEmployeeComponent;
