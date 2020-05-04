const { Schema, model } = require("mongoose");

const AdsSchema = new Schema(
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
    garantiaVendedor: {
      type: Number
    },
    localizacao: {
      type: String
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

module.exports = model("Ads", AdsSchema);
