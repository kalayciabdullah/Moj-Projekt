const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    clientName: { type: String, require: true },
    clientNIP: { type: String},
    clientAdres: { type: String},
    clientPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cartItems: { type: Array, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("invoices", InvoiceSchema);
module.exports = Invoice;