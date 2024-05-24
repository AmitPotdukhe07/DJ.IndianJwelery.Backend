import Company from "../model/Company.model.js";

export const createCompanyData = async (req, res) => {
    try {
        const companyDataArray = req.body;
        if (!Array.isArray(companyDataArray)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid data format. Expected an array."
            });
        }
        const companies = await Company.insertMany(companyDataArray);
        res.status(201).json({
            success: true,
            msg: "Companies added successfully",
            data: companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

export const search = async (req, res) => {
    try {
        const { query } = req.query;
        console.log(query);
        var results = []

        if (query == "all") {
            results = await Company.find({})

            res.status(200).json({
                success: true,
                results
            });
            return
        }

        results = await Company.find({ $text: { $search: query } });

        if (results.length == 0) {
            const regex = new RegExp(query, 'i');

            results = await Company.find({
                $or: [
                    { name: { $regex: regex } },
                    { description: { $regex: regex } },
                    { products: { $regex: regex } },
                ]
            });
        }
        res.status(200).json({
            success: true,
            results
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};