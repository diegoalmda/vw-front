import { Link } from "react-router-dom";
import "./index.css";
import { useGetVehicles } from "../../hooks/vehicles/use-get-vehicles";

const DashboardPage: React.FC = () => {
  const { data } = useGetVehicles(
    { page: 1, per_page: 10 },
    {
      onSuccess: (data) => {
        console.log("Veículos carregados:", data.data.length);
      },
      onError: (error) => {
        console.error("Erro:", error.response?.data.message);
      },
      enabled: true,
      staleTime: 30000,
    }
  );

  console.log(data);
  return (
    <div className="dashboard-container">
      <h2>Painel de Controle</h2>
      <div className="dashboard-options">
        <Link to="/vehicles" className="dashboard-card">
          <h3>Gerenciar Veículos</h3>
          <p>Adicione, liste e gerencie veículos.</p>
        </Link>
        <Link to="/users" className="dashboard-card">
          <h3>Gerenciar Usuários</h3>
          <p>Crie e edite usuários (Apenas para usuários Root).</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
