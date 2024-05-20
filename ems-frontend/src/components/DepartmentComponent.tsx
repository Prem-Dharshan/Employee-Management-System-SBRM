import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDepartment, getDepartmentById, updateDepartment } from "../service/DepartmentService";
import { Department } from "../types/DepartmentType";


const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');


    const { id } = useParams();

    const [errors, setError] = useState({
        departmentName: '',
        departmentDescription: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            const departmentId = Number(id);
            if (!isNaN(departmentId)) {
                getDepartmentById(departmentId)
                    .then((response) => {
                        setDepartmentName(response.data.departmentName);
                        setDepartmentDescription(response.data.departmentDescription);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error('Invalid department ID:', id);
            }
        }
    }, [id]);

    const formValidator = () => {
        let valid = true;

        const errorsCopy = { ...errors };

        if (!departmentName.trim()) {
            errorsCopy.departmentName = 'Department Name is required';
            valid = false;
        }

        if (!departmentDescription.trim()) {
            errorsCopy.departmentDescription = 'Department Description is required';
            valid = false;
        }

        setError(errorsCopy);

        return valid;
    };

    const handleDepartmentName = (event: ChangeEvent<HTMLInputElement>): void => {
        setDepartmentName(event.target.value);
    };

    const handleDepartmentDescription = (event: ChangeEvent<HTMLInputElement>): void => {
        setDepartmentDescription(event.target.value);
    };

    const saveOrUpdateDepartment = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (!formValidator()) {
            return;
        }

        const department: Department = { departmentName, departmentDescription};
        console.log(department);

        if (id) {
            updateDepartment(Number(id), department)
                .then((response) => {
                    console.log(response.data);
                    navigator('/departments');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            createDepartment(department)
                .then((response) => {
                    console.log(response.data);
                    navigator('/departments');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>;
        } else {
            return <h2 className='text-center'>Add Department</h2>;
        }
    }

    const returnElt: JSX.Element = (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br />
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Name:</label>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    name='departmentName'
                                    value={departmentName}
                                    className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                    onChange={handleDepartmentName}
                                />
                                {errors.departmentName && (
                                    <div className='invalid-feedback'>{errors.departmentName}</div>
                                )}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Description</label>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    name='departmentDescription'
                                    value={departmentDescription}
                                    className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                    onChange={handleDepartmentDescription}
                                />
                                {errors.departmentDescription && (
                                    <div className='invalid-feedback'>{errors.departmentDescription}</div>
                                )}
                            </div>

                            <br />
                            <button
                                type='submit'
                                className='btn btn-success'
                                onClick={saveOrUpdateDepartment}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    
    return returnElt;

}

export default DepartmentComponent