import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ROLE from '../common/role';
import loginIcons from "../assest/signin.gif";


const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  

  return (
    <Fragment>
       <div className="container container-fluid">
          <h2 className="text-3xl font-bold mt-5 ml-5">My Profile</h2>
          <div className="flex flex-wrap justify-around mt-5 user-info">
              <div className="w-full md:w-1/4">
                  <figure className='avatar avatar-profile'>
                      {user?.profileImg ? (
                        <img
                          src={user?.profileImg}
                          className="rounded-full w-full h-auto"
                          alt={user?.name}
                        />
                      
                      ) : (
                        <img src={loginIcons} className='rounded-full w-full h-auto' alt="login icons" />
                      )}
                  </figure>
                  <Link to="/profile/update" id="edit_profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-5">
                      Edit Profile
                  </Link>
              </div>
      
              <div className="w-full md:w-5/12">
                  <h4 className='text-lg font-semibold mt-3'>Full Name</h4>
                  <p>{user?.name }</p>
      
                  <h4 className='text-lg font-semibold mt-3'>Email Address</h4>
                  <p>{user?.email}</p>
            
                  <h4 className='text-lg font-semibold mt-3'>Joined On</h4>
                  <p>{String(user?.createdAt).substring(0, 10) }</p>
                  
                  {user?.role === ROLE.GENERAL && (
                    <Link to={"/profile/orders"} className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-5">
                      My Orders
                    </Link>
                  )}
                  

                  <Link to="/profile/change-password" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3">
                      Change Password
                  </Link>
              </div>
          </div>
      </div>
    </Fragment>
  )
}

export default Profile