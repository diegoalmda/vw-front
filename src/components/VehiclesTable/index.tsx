import React from "react";
import "./index.css";
import { useGetVehicles } from "../../hooks/vehicles/use-get-vehicles";
import { convertIsoToBrl } from "../../utils/convert-iso-brl";
import { useDeleteVehicle } from "../../hooks/vehicles/use-delete-vehicle";
import type { Vehicle } from "../../interfaces/vehicles.interface";
import toast from "react-hot-toast";
import { useInvalidateQuery } from "../../hooks/use-invalidate-query";
import { GET_VEHICLES_QUERY_KEY } from "../../constants/query-keys";

type VehiclesTableProps = {
  onOpen: (vehicle: Vehicle | null) => void;
};

const VehiclesTable: React.FC<VehiclesTableProps> = ({ onOpen }) => {
  const invalidate = useInvalidateQuery();

  const { data: vehicles } = useGetVehicles(
    {},
    {
      onError: (error) => {
        toast.error(
          error.response?.data.message ?? "Houve um erro ao recuperar items"
        );
      },
      enabled: true,
      staleTime: 30000,
    }
  );

  const { mutate: deleteVehicle } = useDeleteVehicle({
    onSuccess: async () => {
      await invalidate([GET_VEHICLES_QUERY_KEY]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message ?? "Houve um erro ao deletar item"
      );
    },
  });

  const handleDeleteVehicle = async (id: Vehicle["uuid"]) => {
    await deleteVehicle(id);
  };

  return (
    <div className="table-container">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Ano</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.data.map((vehicle) => (
            <tr key={vehicle.uuid}>
              <td className="vehicle-photo">
                <img src={vehicle.imagePath} alt={vehicle.model.name} />
              </td>
              <td>{vehicle.model.name}</td>
              <td>{vehicle.color.name}</td>
              <td>{vehicle.year}</td>
              <td>{convertIsoToBrl(vehicle.creationDate)}</td>
              <td className="actions">
                <button
                  className="edit-button"
                  onClick={() => onOpen(vehicle.uuid)}
                >
                  ✏️
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteVehicle(vehicle.uuid)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>Itens por página: 10</span>
        <div className="page-controls">
          <span>Página 1 de 1</span>
          <button className="page-nav-button">{"<"}</button>
          <button className="page-nav-button">{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default VehiclesTable;
