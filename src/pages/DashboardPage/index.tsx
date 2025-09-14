import "./index.css";
import { useState } from "react";
import Modal from "../../components/Modal";
import VehicleForm from "../../components/Form/VehicleForm";
import Sidebar from "../../components/Sidebar";
import VehiclesTable from "../../components/VehiclesTable";
const DashboardPage: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleOpenModal = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const handleSaveVehicle = (vehicleData) => {
    if (editingVehicle) {
      console.log("Atualizar veículo:", vehicleData);
    } else {
      console.log("Criar novo veículo:", vehicleData);
    }
    handleCloseModal();
  };

  return (
    <div
      className={`app-container ${
        !isSidebarExpanded ? "sidebar-collapsed" : ""
      } ${isSidebarExpanded ? "expanded-mobile-layout" : ""}`}
    >
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <div className="main-content">
        <header className="main-header">
          <div>
            <div className="user-name">
              <strong>Nome</strong>
            </div>
            <div className="user-info">
              <span>Logado como:</span>
              <strong>Admin</strong>
            </div>
          </div>
          <button className="logout-button">
            Sair
            <i className="logout-icon">🚪</i>
          </button>
        </header>

        <main className="dashboard-content">
          <h3 className="dashboard-title">Gerenciamento de Veículos</h3>
          <div className="dashboard-header">
            <div className="search-and-new-vehicle">
              <div className="search-form">
                <input type="text" placeholder="Buscar..." />
                <select>
                  <option>Modelo</option>
                </select>
                <select>
                  <option>Cor</option>
                </select>
                <select>
                  <option>Ordenar</option>
                </select>
              </div>
              <button
                className="new-vehicle-button"
                onClick={() => handleOpenModal()}
              >
                + Novo Veículo
              </button>
            </div>
          </div>
          <VehiclesTable onOpen={handleOpenModal} />
        </main>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VehicleForm
          initialData={editingVehicle}
          onSave={handleSaveVehicle}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
