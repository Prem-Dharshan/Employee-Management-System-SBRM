import { NavLink } from "react-router-dom";

function HeaderComponent(): JSX.Element {
    const navbarStyle = {
        backgroundColor: '#e3f2fd',
    };

    const returnElt: JSX.Element = (
        <>
            <header>
                <nav className='navbar navbar-expand-lg navbar-light' style={navbarStyle}>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='#'>
                            {' '}
                            Employee Management System{' '}
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active"to={'/employees'}> Employees </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active"to={'/departments'}> Departments </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );

    return returnElt;
}

export default HeaderComponent;
