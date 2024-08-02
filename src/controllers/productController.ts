import { Request, Response } from "express";
import ProductModel from "../models/Product";

export const getProoducts = async (req: Request, res: Response) => {
	try {
		const products = await ProductModel.find();
		res.send({ products });
	} catch (error) {}
};

export const createProoduct = async (req: Request, res: Response) => {
	try {
		const {
			product_name,
			product_image,
			product_data: { prize, descrption, rating, is_new },
		} = req.body;
		if (
			!product_name ||
			!product_image ||
			!prize ||
			!descrption ||
			!rating ||
			!is_new
		) {
			return res.send({ success: false, message: "insufficient data" });
		}
		const product = new ProductModel({
			product_name,
			product_image,
			product_data: { prize, descrption, rating, is_new },
		});
		product.save();
		res.send({
			product,
			message: "Product Created successfully",
			success: true,
		});
	} catch (error) {
		res.send({ error: error.message });
	}
};

export const updateProoduct = async (req: Request, res: Response) => {
	try {
		const {
			product_id,
			product_name,
			product_image,
			product_data: { prize, descrption, rating, is_new },
		} = req.body;
		if (
			!product_name ||
			!product_image ||
			!prize ||
			!descrption ||
			!rating ||
			!is_new ||
			!product_id
		) {
			return res.send({ success: false, message: "insufficient data" });
		}
		const product = await ProductModel.findByIdAndUpdate(
			{ _id: product_id },
			{
				$set: {
					product_name,
					product_image,
					product_data: { prize, descrption, rating, is_new },
				},
			},
			{ new: true }
		);
		res.send({
			product,
			message: "Product Updated successfully",
			success: true,
		});
	} catch (error) {
		res.send({ error: error.message, message: "No product found to be update" });
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await ProductModel.findByIdAndRemove({ _id: id });
		res.send({
			message: "Product Deleted successfully",
			success: true,
		});
	} catch (error) {
		res.send({ error: error.message, message: false });
	}
};
