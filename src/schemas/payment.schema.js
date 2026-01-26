import { z } from "zod";

export const createPreferenceSchema = z.object({
  title: z.string({
    required_error: "El título del producto es requerido",
  }),
  price: z
    .number({
      required_error: "El precio debe ser un número",
    })
    .positive("El precio debe ser mayor a 0"),
  quantity: z.number().int().default(1),
});
