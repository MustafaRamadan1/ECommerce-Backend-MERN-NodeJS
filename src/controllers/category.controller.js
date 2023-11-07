import * as jwt from "jsonwebtoken";
import Category from "../DB/models/category.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppFeature from '../utils/appFeature';

const createCategory = catchAsync(async ( req, res, next ) =>{
    const { 
        body: { name, description }
    } = req;

    const newCategory = await Category.create({ name, description })
    if(!newCategory) throw new AppError('Error in creating category', 400)
    
    res.status(201).json({
        status: 'success',
        message: `${newCategory.name} is created successfully`,
        data: newCategory
    })
})

const getCategoryDetails = catchAsync(async ( req, res, next ) =>{
    const { id } = req.params;

    const category = await Category.findOne({ _id: id })
    if(!category) throw new AppError('Category not found', 404)

    res.status(200).json({
        status: 'success',
        data: category
    })
})
const getAllCategories = catchAsync(async ( req, res, next ) =>{
    const appFeature = new AppFeature( Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination(2);
    
    const categories = await appFeature.query;

    if (!categories) throw new AppError(`There's No Categories`, 404);

    res.status(200).json({
        status: "success",
        totalDocs: categories.length, 
        data: categories
    }) 
}) 

const deleteCategory = catchAsync(async ( req, res, next ) =>{
    const { id } = req.params;

    const category = await Category.findOne({ _id: id })
    if(!category) throw new AppError('Category not found', 404)

    const deletedCategory = await Category.findOneAndDelete({ _id: id })
    if(!deletedCategory) throw new AppError('Error in deleting category', 400)

    res.status(200).json({
        status: 'success',
        message: `${category.name} is deleted successfully`,
    })
})

const updateCategory = catchAsync(async ( req, res, next ) =>{
    const { 
        params: { id },
        body: { name, description }
    } = req;

    const category = await Category.findOne({ _id: id })
    if(!category) throw new AppError('Category not found', 404)

    const updatedCategory = await Category.findOneAndUpdate({ _id: id }, { name, description }, { new: true, runValidators: true })
    if(!updatedCategory) throw new AppError('Error in deleting Category', 400)

    res.status(200).json({
        status: 'success',
        message: `${updatedCategory.name} is updated successfully`,
        data: updatedCategory
    })
})


export default {
    getAllCategories,
    createCategory,
    getCategoryDetails,
    deleteCategory,
    updateCategory
};
