import * as jwt from "jsonwebtoken";
import Product from "../DB/models/product.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppFeature from '../utils/appFeature';
import Category from "../DB/models/category.model";

const createProduct = catchAsync(async ( req, res, next ) =>{
    const { 
        body:{ name, price, description, categoryId }
    } = req;
    const categoryExisted = await Category.findOne({ _id: categoryId })
    if(!categoryExisted) throw new AppError(`Category ${categoryId} does not exist`, 404)

    const newProduct = await Product.create({ name, price, description, categoryId })
    if(!newProduct) throw new AppError('Error in creating product', 400)
    
    res.status(201).json({
        status: 'success',
        message: `${newProduct.name} is created successfully`,
        data: newProduct
    })
})

const getProductDetails = catchAsync(async ( req, res, next ) =>{
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    if(!product) throw new AppError('Product not found', 404)

    res.status(200).json({
        status: 'success',
        data: product
    })
})
const getAllProducts = catchAsync(async ( req, res, next ) =>{

    const appFeature = new AppFeature( Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination(2);
    const products = await appFeature.query;

    if (!products) throw new AppError(`There's No Products`, 404);

    res.status(200).json({
        status: "success",
        totalDocs: products.length, 
        data: products
    }) 
})
const deleteProduct = catchAsync(async ( req, res, next ) =>{
    const { id } = req.params;

    const product = await Product.findOne({ _id: id })
    if(!product) throw new AppError('Product not found', 404)

    const deletedProduct = await Product.findOneAndDelete({ _id: id })
    if(!deletedProduct) throw new AppError('Error in deleting product', 400)

    res.status(200).json({
        status: 'success',
        message: `${product.name} is deleted successfully`,
    })
})

const updateProduct = catchAsync(async ( req, res, next ) =>{
    const { 
        params: { id },
        body: { name, price, description, categoryId }
    } = req;
    let categoryExisted ;
    if(categoryId) categoryExisted = await Category.findOne({ _id: categoryId })

    if(categoryId && !categoryExisted) throw new AppError(`Category ${categoryId} does not exist`, 404)

    const product = await Product.findOne({ _id: id })
    if(!product) throw new AppError('Product not found', 404)

    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, { name, price, description, categoryId }, { new: true, runValidators: true })
    if(!updatedProduct) throw new AppError('Error in updating product', 400)

    res.status(200).json({
        status: 'success',
        message: `${updatedProduct.name} is updated successfully`,
        data: updatedProduct
    })
})


export default {
    getAllProducts,
    createProduct,
    getProductDetails,
    deleteProduct,
    updateProduct
};
