import Inventory from "../DB/models/inventory.model";
import Product from "../DB/models/product.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppFeature from '../utils/appFeature';

const createInventory = catchAsync(async ( req, res, next ) =>{
    const { 
        body:{ stock_quantity, productId }
    } = req;
    const productExisted = await Product.findOne({ _id: productId })
    if(!productExisted) throw new AppError(`Product ${productId} does not exist`, 404)
    const inventoryExisted = await Inventory.findOne({ productId })
    if(inventoryExisted) throw new AppError(`${productExisted.name} has been already stored in inventory.`, 400)

    const newInventory = await Inventory.create({ stock_quantity, productId })
    if(!newInventory) throw new AppError('Error in creating inventory', 400)
    res.status(201).json({
        status: 'success',
        message: `Inventory is created successfully`,
        data: newInventory
    })
})

const getInventoryDetails = catchAsync(async ( req, res, next ) =>{
    const { id } = req.params;

    const inventory = await Inventory.findOne({ _id: id });
    if(!inventory) throw new AppError('Inventory not found', 404)

    res.status(200).json({
        status: 'success',
        data: inventory
    })
})
const getAllInventory = catchAsync(async ( req, res, next ) =>{

    const appFeature = new AppFeature( Inventory.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination(2);
    const Inventories = await appFeature.query;

    if (!Inventories) throw new AppError(`There's No Inventories`, 404);

    res.status(200).json({
        status: "success",
        totalDocs: Inventories.length, 
        data: Inventories
    }) 
})
const deleteInventory = catchAsync(async ( req, res, next ) =>{
    const { id } = req.params;

    const inventory = await Inventory.findOne({ _id: id })
    if(!inventory) throw new AppError('inventory not found', 404)

    const deletedInventory = await Inventory.findOneAndDelete({ _id: id })
    if(!deletedInventory) throw new AppError('Error in deleting Inventory', 400)

    res.status(200).json({
        status: 'success',
        message: `Inventory with ${inventory._id} is deleted successfully`,
    })
})

const updateInventoryStockQuantity = catchAsync(async ( req, res, next ) =>{
    const { 
        params: { id },
        body: { stock_quantity }
    } = req;

    const updatedInventory = await Inventory.findOneAndUpdate({ _id: id },{ stock_quantity }, { new: true, runValidators: true })
    if(!updatedInventory) throw new AppError('Error in updating stock quantity', 400)

    res.status(200).json({
        status: 'success',
        message: `Inventory with ${updatedInventory._id}, stock quantity is updated successfully`,
        data: updatedInventory
    })
})


export default {
    getAllInventory,
    createInventory,
    getInventoryDetails,
    deleteInventory,
    updateInventoryStockQuantity
};
