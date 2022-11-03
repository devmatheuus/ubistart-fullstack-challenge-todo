import Header from '../../components/Header';
import TaskContainer from '../../components/TaskContainer';

import { UseDash } from '../../Providers/dashboard';
import { UseAuth } from '../../Providers/auth';
import { Redirect } from 'react-router-dom';
import ModalCreate from '../../components/ModalCreate';
import ModalUpdate from '../../components/ModalUpdate/index';
import ModalFinishTask from '../../components/ModalFinishTask/index';
import { jwtPayload } from '../../interfaces/auth/index';
import jwt_decode from 'jwt-decode';

const Dashboard = () => {
    const { authenticated, token } = UseAuth();
    const { showModal, showModalUpdate, showModalFinishTask } = UseDash();

    const account: jwtPayload = jwt_decode(token);

    if (account.is_admin) return <Redirect to="/dashboard/admin" />;

    if (!authenticated) return <Redirect to="/" />;

    return (
        <>
            {showModalFinishTask && <ModalFinishTask />}
            {showModal && <ModalCreate />}
            {showModalUpdate && <ModalUpdate />}
            <Header />
            <TaskContainer />
        </>
    );
};

export default Dashboard;
