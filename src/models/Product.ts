import mongoose from "mongoose";

const ProducSchema = new mongoose.Schema(
	{
		product_name: {
			type: String,
		},
		product_image: {
			type: String,
		},
		product_data: {
			prize: {
				type: Number,
			},
			descrption: {
				type: String,
			},
			rating: {
				type: Number,
			},
			is_new: {
				type: Boolean,
				default: false,
			},
		},
	},
	{ timestamps: true }
);

const ProductModel = mongoose.model("product", ProducSchema);
export default ProductModel;
