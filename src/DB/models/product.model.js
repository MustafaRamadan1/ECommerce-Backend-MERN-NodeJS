import { Schema, Types, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


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

}, {
    timestamps: true
});

productSchema.methods.toJSON = function (){
    const product  = this;
    const productObject  = product.toObject();
    delete productObject.__v;
    return productObject;
};

const Product = model("Product", productSchema);

export default Product;
