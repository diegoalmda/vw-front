import { useEffect } from "react";
import "./index.css";
import { useGetVehiclesModels } from "../../../hooks/vehicles/use-get-vehicles-models";
import { useGetVehiclesColors } from "../../../hooks/vehicles/use-get-vehicles-colors";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { vehicleUpdateSchema } from "../../../validations/vehicle-form-update-schema.validation";
import { vehicleFormCreateSchema } from "../../../validations/vehicle-form-create-schema.validation";
import { useCreateVehicle } from "../../../hooks/vehicles/use-create-vehicle";
import toast from "react-hot-toast";
import { useInvalidateQuery } from "../../../hooks/use-invalidate-query";
import { GET_VEHICLES_QUERY_KEY } from "../../../constants/query-keys";

type FormSchema = z.infer<typeof vehicleUpdateSchema>;

const VehicleForm = ({ initialData, onClose }) => {
  const isEditing = !!initialData;

  const { models } = useGetVehiclesModels();
  const { colors } = useGetVehiclesColors();

  const resolver = zodResolver(
    isEditing ? vehicleUpdateSchema : vehicleFormCreateSchema
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<FormSchema>({
    resolver,
    defaultValues: {
      model: initialData?.model ?? "",
      color: initialData?.color ?? "",
      year: initialData?.year ?? undefined,
      image: initialData?.image ?? null,
    },
  });

  const imagePreview = watch("image");

  const invalidate = useInvalidateQuery();

  useEffect(() => {
    reset({
      model: initialData?.model ?? "",
      color: initialData?.color ?? "",
      year: initialData?.year ?? undefined,
      image: initialData?.image ?? null,
    });
  }, [initialData, reset]);

  const { mutate: createVehicle } = useCreateVehicle({
    onError: (error) => {
      toast.error(`${error.response?.data.message}`);
    },
    onSuccess: async () => {
      await invalidate([GET_VEHICLES_QUERY_KEY]);
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (data) {
      await createVehicle({
        model: data.model,
        color: data.color,
        year: Number(data.year),
        image: data.image,
      });
      reset();
      onClose();
    }
  };

  const renderImagePreview = () => {
    if (imagePreview instanceof File) {
      return URL.createObjectURL(imagePreview);
    } else if (typeof imagePreview === "string") {
      return imagePreview;
    }
    return null;
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>{isEditing ? "Editar Veículo" : "Criar Novo Veículo"}</h2>

      <div className="form-group">
        <label htmlFor="model">Modelo</label>
        <select id="model" {...register("model")}>
          <option value="" disabled>
            Selecione um modelo
          </option>
          {models?.map((model) => (
            <option value={model.uuid} key={model.uuid}>
              {model.name}
            </option>
          ))}
        </select>
        {errors.model && <p className="error">{errors.model.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="color">Cor</label>
        <select id="color" {...register("color")}>
          <option value="" disabled hidden>
            Selecione uma cor
          </option>
          {colors?.map((color) => (
            <option value={color.uuid} key={color.uuid}>
              {color.name}
            </option>
          ))}
        </select>
        {errors.color && <p className="error">{errors.color.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="year">Ano</label>
        <input
          type="number"
          id="year"
          {...register("year", { valueAsNumber: true })}
          min="2000"
          max={new Date().getFullYear() + 1}
        />
        {errors.year && (
          <p className="error">
            {errors.year.message
              ? "Ano precisa ser maior que '2000' e menor que o próximo"
              : ""}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="photo">Foto</label>

        <Controller
          name="image"
          control={control}
          render={({ field: { ref, name, onBlur, onChange } }) => {
            return (
              <input
                type="file"
                ref={ref}
                accept="image/*"
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file ? file : "");
                }}
              />
            );
          }}
        />
        {errors.year && (
          <p className="error">
            {errors.image?.message?.toString() ? "Imagem é obrigatória" : ""}
          </p>
        )}

        {renderImagePreview() && (
          <div className="image-preview-container">
            <img
              src={renderImagePreview()}
              alt="Pré-visualização da imagem"
              className="image-preview"
            />
          </div>
        )}
      </div>

      <button type="submit" className="submit-button">
        {isEditing ? "Salvar Alterações" : "Criar Veículo"}
      </button>
    </form>
  );
};

export default VehicleForm;
