import { useState } from "react";
import VehiclesTable from "../../components/VehiclesTable";
import Modal from "../../components/Modal";
import VehicleForm from "../../components/Form/VehicleForm";

const VehiclesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleOpenModal = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const handleSaveVehicle = (vehicleData: any) => {
    if (editingVehicle) {
      console.log("Atualizar veículo:", vehicleData);
    } else {
      console.log("Criar novo veículo:", vehicleData);
    }
    handleCloseModal();
  };

  return (
    <>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VehicleForm
          initialData={editingVehicle}
          onSave={handleSaveVehicle}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default VehiclesPage;
