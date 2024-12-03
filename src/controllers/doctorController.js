const { ObjectId } = require("mongodb");

const createDoctor = async (req, res, doctorCollection) => {
    try {
        let reqBody = req.body;
        let product = await doctorCollection.insertOne(reqBody);
        return res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        })
    }
};

const allDoctor = async (req, res, doctorCollection) => {
    try {
        // Fetch all products from the collection
        let products = await doctorCollection.find().toArray();

        // Return successful response with products data
        return res.status(200).json({
            status: "success",
            message: "All products fetched successfully",
            data: products
        });
    } catch (error) {
        // Catch any errors and return an error response
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};

const singleDoctor = async (req, res, doctorCollection) => {
    try {
        const doctorId = req.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                status: "error",
                msg: "Invalid product ID"
            });
        }

        // Fetch product by ID from the collection
        let product = await doctorCollection.findOne({ _id: new ObjectId(doctorId) });

        if (!product) {
            return res.status(404).json({
                status: "error",
                msg: "Product not found"
            });
        }

        // Return product data on success
        res.status(200).json({
            status: "success",
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        console.error('Error fetching product:', error); // Log the error for debugging purposes
        return res.status(500).json({
            status: "error",
            msg: "Internal server error"
        });
    }
};

const updateDoctor = async (req, res, doctorCollection) => {
    try {
        let reqBody = req.body;
        let doctorId = req.params.id;
        let updateResult = await doctorCollection.updateOne({ _id: new ObjectId(doctorId) }, { $set: reqBody });
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Product not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    } // <-- Closing brace for the catch block
};

const deleteDoctor = async (req, res, doctorCollection) => {
    try {
        let doctorId = req.params.id;
        let deleteResult = await doctorCollection.deleteOne({ _id: new ObjectId(doctorId) });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Product not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    } // <-- Closing brace for the catch block
};



module.exports = { createDoctor, allDoctor, singleDoctor,updateDoctor,deleteDoctor };