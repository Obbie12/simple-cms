import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMenuGroups, setMenuGroups, addMenuGroup, removeMenuGroup, addMenu, removeMenu, MenuGroup, Menu } from '../features/menuSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SettingsPage: React.FC = () => {
  const menuGroups = useSelector(selectMenuGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedMenuGroups = localStorage.getItem('menuGroups');
    if (savedMenuGroups) {
      dispatch(setMenuGroups(JSON.parse(savedMenuGroups)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('menuGroups', JSON.stringify(menuGroups));
  }, [menuGroups]);

  const menuGroupFormik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addMenuGroup({ id: Date.now().toString(), name: values.name, menus: [] }));
      resetForm();
    },
  });

  const menuFormik = useFormik({
    initialValues: {
      groupId: '',
      name: '',
    },
    validationSchema: Yup.object({
      groupId: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addMenu({ groupId: values.groupId, menu: { id: Date.now().toString(), name: values.name } }));
      resetForm();
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-medium text-gray-900 mb-4">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">Menu Groups</h2>
          <form onSubmit={menuGroupFormik.handleSubmit} className="mb-4">
            <div className="flex space-x-2">
              <input
                id="name"
                type="text"
                {...menuGroupFormik.getFieldProps('name')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Add
              </button>
            </div>
            {menuGroupFormik.touched.name && menuGroupFormik.errors.name ? (
              <p className="mt-1 text-xs text-red-600">{menuGroupFormik.errors.name}</p>
            ) : null}
          </form>

          <div className="space-y-2">
            {menuGroups.map((group: MenuGroup) => (
              <div key={group.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span className="text-sm text-gray-900">{group.name}</span>
                <button
                  onClick={() => dispatch(removeMenuGroup(group.id))}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">Menu Items</h2>
          
          <form onSubmit={menuFormik.handleSubmit} className="space-y-3 mb-4">
            <div>
              <select
                id="groupId"
                {...menuFormik.getFieldProps('groupId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="">Select group</option>
                {menuGroups.map((group: MenuGroup) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              {menuFormik.touched.groupId && menuFormik.errors.groupId ? (
                <p className="mt-1 text-xs text-red-600">{menuFormik.errors.groupId}</p>
              ) : null}
            </div>
            
            <div>
              <input
                id="name"
                type="text"
                placeholder="Menu name"
                {...menuFormik.getFieldProps('name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
              {menuFormik.touched.name && menuFormik.errors.name ? (
                <p className="mt-1 text-xs text-red-600">{menuFormik.errors.name}</p>
              ) : null}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
            >
              Add Menu
            </button>
          </form>

          <div className="space-y-2">
            {menuGroups.map((group: MenuGroup) => (
              <div key={group.id} className="border border-gray-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{group.name}</h3>
                <div className="space-y-1">
                  {group.menus.map((menu: Menu) => (
                    <div key={menu.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{menu.name}</span>
                      <button
                        onClick={() => dispatch(removeMenu({ groupId: group.id, menuId: menu.id }))}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {group.menus.length === 0 && (
                    <p className="text-sm text-gray-500">No menus</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
