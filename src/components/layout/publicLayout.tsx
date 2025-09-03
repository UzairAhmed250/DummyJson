import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/use-context'
import { LoadingOutlined } from '@ant-design/icons';


export default function PublicLayout() {
    const {isAuthenticated ,loader} = useAuth();

    if (loader) {
        return <div className='flex justify-center items-center h-screen'>
            <div className='text-xl text-gray-600'><LoadingOutlined /></div>
        </div>
    }

    if (isAuthenticated) return <Navigate to="/products" replace />

    return (
        <div className=''>
            <Outlet />
        </div>
    )
}