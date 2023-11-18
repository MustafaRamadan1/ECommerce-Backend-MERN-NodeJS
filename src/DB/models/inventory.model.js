import { Schema,model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const inventorySchema = new Schema({
    _id: {
        type: String,
        default: uuidv4(),
    },
    productId: {
        type: String,
        ref: 'Product',
        required: true,
    },
    stock_quantity: {
        type: Number,
        required: true,
        min: 0
    },
},{
    timestamps: true
});

const Inventory = model('Inventory', inventorySchema);

export default Inventory;