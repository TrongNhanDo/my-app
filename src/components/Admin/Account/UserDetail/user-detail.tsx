import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as CommonTypes from '../common/types';
import * as Logics from '../../../Common/Logic/logics';
import Loader from '../../../Common/Loader/loader';
import { checkChangeValues, validationSchema } from './validations';
import {
  ActionReducerType,
  InitStateReducerType,
  StateReducerType,
} from './types';
import { ErrorMessages } from '../../../Common/ErrorMessage/error-message';

const UserDetail = React.memo(() => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>('');

  const reducer = (state: StateReducerType, action: ActionReducerType) => {
    const { type, payload } = action;
    switch (type) {
      case CommonTypes.ActionTypes.SELECTED_USER:
        return {
          user: payload?.user,
          roles: payload?.roles,
        };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, InitStateReducerType);

  const fetchApi = async () => {
    const url = `users/${userId}`;
    const response = await Logics.callApi(url, Logics.MethodProps.GET).catch(
      (err) => console.log({ err })
    );
    const fetchRole = await Logics.callApi(
      'roles',
      Logics.MethodProps.GET
    ).catch((err) => console.log({ err }));
    dispatch({
      type: CommonTypes.ActionTypes.SELECTED_USER,
      payload: {
        user: response.data || [],
        roles: fetchRole.data || [],
      },
    });
    setIsLoading(false);
  };

  const deleteUser = useCallback(
    async (userId: string) => {
      if (confirm('Are you sure you want to delete this account?')) {
        setIsLoading(true);
        const response = await Logics.callApi(
          'users',
          Logics.MethodProps.DELETE,
          {
            id: userId,
          }
        ).catch((err) => console.log({ err }));
        setIsLoading(false);
        if (response) {
          Logics.showToast(
            'Delete account success',
            Logics.ToastTypeOptions.Success
          );
          navigate(-1);
        } else {
          Logics.showToast(
            'Delete account fail',
            Logics.ToastTypeOptions.Error
          );
        }
      }
    },
    [navigate]
  );

  const onSubmit = async (formikValues: CommonTypes.FormikPropType) => {
    setMsg('');
    const isNotChange = checkChangeValues(
      formikValues,
      data.user as CommonTypes.UserType
    );
    if (isNotChange) {
      setMsg('There must be at least one data change');
    } else {
      setIsLoading(true);
      const requestPayload = {
        ...formikValues,
        id: userId,
      };
      const response = await Logics.callApi(
        'users',
        Logics.MethodProps.PATCH,
        requestPayload
      ).catch((err) => setMsg(err.response.data.message || ''));
      if (response) {
        setMsg('Update account success');
        fetchApi();
      }
      setIsLoading(false);
    }
    Logics.scrollTop();
  };

  const formikBag = useFormik({
    initialValues: {
      username: '',
      roleId: 1,
    },
    validationSchema,
    onSubmit: (value) => onSubmit(value),
  });

  const handleSubmit = useCallback(() => {
    try {
      formikBag.submitForm();
    } catch (error) {
      console.log({ error });
    }
  }, [formikBag]);

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.user) {
      formikBag.setFieldValue('username', data.user.username || '');
      formikBag.setFieldValue('role', data.user.role || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="div-contai mt-10">
        <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-10">
          ACCOUNT DETAIL
        </h2>
        {msg && ErrorMessages(msg)}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto">
          <form onSubmit={formikBag.handleSubmit}>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Properties
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Before Change
                  </th>
                  <th scope="col" className="px-6 py-3">
                    After change
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-100 text-black">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Username
                  </th>
                  <td className="px-6 py-4 text-base">
                    {data.user ? data.user.username : ''}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="email"
                      id="username"
                      name="username"
                      className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black ${
                        formikBag.errors.username && formikBag.touched.username
                          ? 'bg-yellow'
                          : ''
                      }`}
                      value={formikBag.values.username || ''}
                      onChange={formikBag.handleChange}
                    />
                    {formikBag.errors.username &&
                      formikBag.touched.username && (
                        <p className="text-orange-600">
                          {formikBag.errors.username}
                        </p>
                      )}
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100 text-black">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Roles
                  </th>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.role ? data.user.role.roleName : ''}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      id="roleId"
                      className={`bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black text-base ${
                        formikBag.errors.roleId && formikBag.touched.roleId
                          ? 'bg-yellow'
                          : ''
                      }`}
                      onChange={formikBag.handleChange}
                      value={formikBag.values.roleId}
                    >
                      {data.roles &&
                        data.roles.map(
                          (value: CommonTypes.RoleType, index: number) => (
                            <option key={index} value={value.roleId}>
                              {value.roleName}
                            </option>
                          )
                        )}
                    </select>
                    {formikBag.errors.roleId && formikBag.touched.roleId && (
                      <p className="text-orange-600">
                        {formikBag.errors.roleId}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100 text-black">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Active
                  </th>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.active ? 'Active' : 'Inactive'}
                  </td>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.active ? 'Active' : 'Inactive'}
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100 text-black">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Created Date
                  </th>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.createdAt
                      ? Logics.formatDate(data.user.createdAt)
                      : ''}
                  </td>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.createdAt
                      ? Logics.formatDate(data.user.createdAt)
                      : ''}
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100 text-black">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Updated At
                  </th>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.updatedAt
                      ? Logics.formatDate(data.user.updatedAt)
                      : ''}
                  </td>
                  <td className="px-6 py-4 text-base">
                    {data.user && data.user.updatedAt
                      ? Logics.formatDate(data.user.updatedAt)
                      : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="flex w-full mt-10 justify-center">
          <>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 px-20"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 ms-10 px-20"
              onClick={() => deleteUser(data.user ? data.user._id : '')}
            >
              Delete
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 focus:outline-none px-20 ms-10"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </>
        </div>
      </div>
    </div>
  );
});

export default UserDetail;
