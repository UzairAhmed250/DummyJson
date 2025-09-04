import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'g1',
        label: <p className='text-[24px] font-semibold'> Dummy Data</p>,
        type: 'group',
        children: [
            { key: '1', label: 'Products' },
            { key: '2', label: 'Recipes' },
        ], 
    }
];



const Sider: React.FC = () => {
   const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key){
    case "1":
        navigate("/products");
        break;
    case "2":
        navigate("/recipes")
        break;
    default: break;
    // navigate("/e")
    console.log('click ', e);}
  };

  return (
    <Menu
      onClick={onClick}
      className='h-[100vh]'
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['g1']}
      mode="inline"
      items={items}
    />
  );
};

export default Sider;