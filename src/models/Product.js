const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    nome: {
      type: String
    },
    descricao: {
      type: String
    },
    valor: {
      type: Number
    },
    key: {
        type: Number
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

module.exports = model("Product", ProductSchema);
