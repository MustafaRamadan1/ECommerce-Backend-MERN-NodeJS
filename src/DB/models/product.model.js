import { Schema, Types, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Inventory from './inventory.model';


const productSchema = new Schema({
    _id: {
        type:String,
        default: uuidv4()
    },
    name: {
        type:String,
        required:true,
        unique:true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: `${Schema.name} description` 
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    productImgs:[{
        type: String,
        default: []
    }],
    ratingAverage: {
        type: Number,
        min: 0,
        max: 5,
        set: value => Math.round(value *10) /10,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

productSchema.methods.toJSON = function (){
    const product  = this;
    const productObject  = product.toObject();
    delete productObject.__v;
    return productObject;
};

productSchema.post('findOneAndDelete', async function (doc){
    const inventory = await Inventory.findOneAndDelete({ productId: doc._id });
    if(!inventory) throw new AppError('Error in deleting inventory', 400)  
})



const Product = model("Product", productSchema);

export default Product;
