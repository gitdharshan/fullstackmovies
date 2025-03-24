import React, { useEffect, useState } from 'react';
import UserList from '../UserList';
import ErrorModal from '../../UIELEMENTS/ErrorModal';
import LoadingSpinner from '../../UIELEMENTS/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]); // Initialized as an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {
        // Error is handled by useHttpClient
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers.length > 0 && <UserList items={loadedUsers} />}
      {!isLoading && loadedUsers.length === 0 && !error && (
        <p style={{ textAlign: 'center' }}>No users found.</p>
      )}
    </React.Fragment>
  );
};

export default Users;
