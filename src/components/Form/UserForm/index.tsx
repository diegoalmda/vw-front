import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import {
  userFormCreateSchema,
  type UserFormSchema,
} from "../../../validations/user-form-create-schema.validation";
import { useInvalidateQuery } from "../../../hooks/use-invalidate-query";
import "./index.css";
import { useCreateUser } from "../../../hooks/users/use-create-user";
import { GET_USERS_QUERY_KEY } from "../../../constants/query-keys";

interface UserFormProps {
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormCreateSchema),
  });

  const invalidate = useInvalidateQuery();

  const { mutate: createUser } = useCreateUser({
    onError: (error) => {
      toast.error(error.response?.data.message ?? "Erro ao criar usuário.");
    },
    onSuccess: async () => {
      toast.success("Usuário criado com sucesso!");
      await invalidate([GET_USERS_QUERY_KEY]);
      onClose();
    },
  });

  const onSubmit = async (data: UserFormSchema) => {
    await createUser({
      name: data.name,
      password: data.password,
      isRoot: false,
    });
    reset();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Criar Novo Usuário</h2>

      <div className="form-group">
        <label htmlFor="name">Nome de Usuário</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Digite o nome de usuário"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="Digite a senha"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <button type="submit" className="submit-button">
        Criar Usuário
      </button>
    </form>
  );
};

export default UserForm;
