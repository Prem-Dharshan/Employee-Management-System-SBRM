import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Employee } from '../types/EmployeeType';
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { getAllDepartments } from '../service/DepartmentService';
import { Department } from '../types/DepartmentType';

interface EmployeeComponentProps {
    employeeId?: number;
    isEdit: boolean;
    onClose: () => void;
    onSave: () => void;
}

const EmployeeComponent: FC<EmployeeComponentProps> = ({ employeeId, isEdit, onClose, onSave }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.log(error);
        });

        if (employeeId) {
            getEmployee(employeeId)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setDepartmentId(response.data.departmentId?.toString() || '');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [employeeId]);

    const [errors, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        departmentId: ''
    });

    const formValidator = () => {
        let valid = true;

        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (!departmentId){
            errorsCopy.departmentId = 'Department is required';
            valid = false;
        }

        setError(errorsCopy);

        return valid;
    };

    const handleFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event: ChangeEvent<HTMLInputElement>): void => {
        setLastName(event.target.value);
    };

    const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleDepartmentChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setDepartmentId(event.target.value);
    };

    const saveOrUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (!formValidator()) {
            return;
        }

        const employee: Employee = {
            firstName, lastName, email, isDeleted: false, departmentId: Number(departmentId),
            id: 0
        };
        console.log(employee);

        if (isEdit && employeeId) {
            updateEmployee(employeeId, employee)
                .then((response) => {
                    console.log(response.data);
                    onSave();
                    onClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    onSave();
                    onClose();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const pageTitle = () => {
        if (isEdit) {
            return <h2 className='text-center'>Update Employee</h2>;
        } else {
            return <h2 className='text-center'>Add Employee</h2>;
        }
    };

    const departmentOptions = () => {
        return departments.map((department) => (
            <option key={department.id} value={department.id}>
                {department.departmentName}
            </option>
        ));
    };

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstName}
                                />
                                {errors.firstName && (
                                    <div className='invalid-feedback'>{errors.firstName}</div>
                                )}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}
                                />
                                {errors.lastName && (
                                    <div className='invalid-feedback'>{errors.lastName}</div>
                                )}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleEmail}
                                />
                                {errors.email && (
                                    <div className='invalid-feedback'>{errors.email}</div>
                                )}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'> Select Department</label>
                                <select 
                                    className={`form-control ${errors.departmentId ? 'is-invalid': ''}`}
                                    name="departmentId"
                                    value={departmentId}
                                    onChange={ handleDepartmentChange }
                                >
                                    <option value=""> Select a department </option>
                                    { departmentOptions() }
                                </select>

                                {errors.departmentId && (
                                    <div className='invalid-feedback'>{errors.departmentId}</div>
                                )}
                            </div>

                            <br />
                            <button
                                type='submit'
                                className='btn btn-success'
                                onClick={saveOrUpdateEmployee}
                            >
                                Submit
                            </button>
                            <button
                                type='button'
                                className='btn btn-secondary ml-2'
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
