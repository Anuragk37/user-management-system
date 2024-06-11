import React, { useState } from 'react';
import AdminHeader from '../../Components/Admin/AdminHeader';

const AdminHome = () => {
  // Example state for the number of users
  const [usersCount, setUsersCount] = useState(0)

  // Simulate fetching the number of users
  React.useEffect(() => {
    // Replace this with your actual logic to fetch the number of users
    // const fetchUsersCount = async () => {
    //   // Example: Fetching users count from an API
    //   const response = await fetch('/api/users/count');
    //   const data = await response.json();
    //   setUsersCount(data.count);
    // };

    // fetchUsersCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader />
      <div className="flex-grow flex justify-center items-center">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Manage your site's content, settings, and more.
          </p>
          <div className="text-center mt-4">
            <span className="text-2xl font-semibold text-gray-700">
              Users Online: {usersCount}
            </span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AdminHome;

