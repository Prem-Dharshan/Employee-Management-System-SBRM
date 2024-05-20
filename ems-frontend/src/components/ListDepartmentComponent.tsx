import { useEffect, useState } from "react";
import { deleteDepartment, getAllDepartments } from "../service/DepartmentService";
import { Department } from "../types/DepartmentType";
import { Link, useNavigate } from "react-router-dom";

const ListDepartment = () => {
    const [departments, setDepartment] = useState<Department[]>([]);
    const navigator = useNavigate();

    const listDepartments = () => {
        getAllDepartments().then((response) => {
            setDepartment(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        listDepartments();
    }, []);
    
    const updateDepartmentHandler = (id: number | undefined): void => {
        navigator(`/update-department/${id}`);
    };

    const deleteDepartmentHandler = (id: number | undefined): void => {
        deleteDepartment(Number(id)).then((response) => {
            console.log(response.data);
            listDepartments();
        }).catch((error) => {
            console.log(error);
        });
    };

    const returnElt = (
        <div className='container'>
            <h2 className='text-center'>List of Departments</h2>

            <Link to='/add-department' className="btn btn-primary mb-2">Add New Department</Link>

            <table className='table table-info table-striped table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Department Name</th>
                        <th>Department Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                                <button
                                    className='btn btn-info'
                                    onClick={() => updateDepartmentHandler(department.id)}
                                >
                                    Update
                                </button>
                                
                                <button
                                    className='btn btn-danger ml-10'
                                    onClick={() => deleteDepartmentHandler(department.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return returnElt;
}

export default ListDepartment;
