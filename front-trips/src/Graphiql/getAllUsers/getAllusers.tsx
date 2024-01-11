import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from "../QueryAndMutation/queryes";

const GetAllUsers: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.allUsersTables.nodes;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
