/* import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    // Array para almacenar múltiples productos en un solo pedido
    products: [
      {
        product: {
            //id del documento de MONGODB
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    paymentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    total: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: ["Pendiente", "Aprobado", "Rechazado", "Fallido"],
    },
  },
  { timestamps: true },
);

const order = mongoose.model("order", orderSchema);

export default order;
 */