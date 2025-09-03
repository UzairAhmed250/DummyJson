import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/use-context'
import { LoadingOutlined } from '@ant-design/icons';
import Sider from './sider';

export default function AuthLayout() {
    const { isAuthenticated, loader  } = useAuth();

    if (loader) {
        return <div className='flex justify-center items-center h-screen'>
            <div className='text-xl text-gray-600'><LoadingOutlined /></div>
        </div>
    }
    
    if (!isAuthenticated) return <Navigate to="/signup" replace />
    
    return (
        <div className='flex h-screen'>
            <Sider />
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <Outlet />
            </div>
        </div>
    )
}