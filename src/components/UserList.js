import React from 'react';
import { useAppContext } from '../AppState'; 
import '../css/Pag_Inicial.css';

const UserList = () => {
  const { users } = useAppContext(); 

  return (
    <div className='pag_ini'>
      <h2>Página de Listagem de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th></th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td> - </td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
