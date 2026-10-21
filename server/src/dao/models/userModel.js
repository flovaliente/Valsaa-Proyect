import mongoose from "mongoose";
import { createHash } from "../../utils/functionsUtils.js";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type : String },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 18 },
    address: { type: String },
    // Datos que se guardan al comprar, para completar el checkout la próxima vez
    phone: { type: String },
    shippingAddress: {
        street: { type: String },
        apartment: { type: String },
        city: { type: String },
        department: { type: String },
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User", "Premium"], default: "User" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    documents: [ { name: { type: String }, reference: { type: String } } ],
    last_connection: {type: Date},
}, { timestamps: true });

userSchema.pre('save', function() {
    this.password = createHash(this.password)
});


export default mongoose.model(userCollection, userSchema);