import React, { useState } from "react";
import "./index.css";
import UserForm from "../../components/Form/UserForm";
import Modal from "../../components/Modal";
import { useGetUsers } from "../../hooks/users/use-get-users";

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { users } = useGetUsers();

  return (
    <>
      <div>
        <h3 className="dashboard-title">Gerenciamento de Usuários</h3>
        <div className="dashboard-header">
          <div className="search-and-new-user" onClick={handleOpenModal}>
            <button className="new-user-button">+ Novo Usuário</button>
          </div>
        </div>
        <div className="users-grid">
          {users?.map((user) => (
            <div key={user.uuid} className="user-card">
              <div className="user-info">
                <h4 className="user-name">{user.name}</h4>
                <span
                  className={`user-role ${
                    user.isRoot ? "role-admin" : "role-common"
                  }`}
                >
                  {user.isRoot ? "Admin" : "Comum"}
                </span>
              </div>
              <button className="edit-button">Editar</button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UserForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UsersPage;
