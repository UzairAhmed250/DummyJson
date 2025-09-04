import React, { useState } from 'react'
import { useAuth } from '../../../context/use-context'
import { LoadingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, type MenuProps } from 'antd';
import {signOut, auth} from '../../../config'



export default function Header() {
    const [loading, setLoading] =useState(false)
    const {loader, user} = useAuth();


    const signOutuser = async() => {
        try {
            setLoading(true)
            await signOut(auth)
            console.log("Sign out successfully!")
        } catch (error) {
            console.error("Error while SignOut: " ,error)
        } finally {
            setLoading(false)
        }
    }

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" className='flex justify-center items-center gap-2'>
                    <UserOutlined />
                    <p>
                        Profile
                    </p>
                </a>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div 
                className='flex gap-2 items-center justify-center'
                onClick={signOutuser}
            >
                <div className='text-red-500'>
                    <LogoutOutlined  /> 
                </div>
                <div>
                    Logout
                </div>
            </div>
          ),
        },
      ];

      if(loading) return <div className='flex justify-center items-center h-full text-blue-400'> <LoadingOutlined /> </div>

  return (
    <div className='flex justify-end items-center w-[100%] bg-white text-black mb-[20px] h-[60px] pr-[40px] '>
        <Dropdown menu={{ items }} placement="bottomRight">
        <Button>{loader ? <LoadingOutlined /> : user?.displayName}</Button>
      </Dropdown>
    </div>
  )
}
