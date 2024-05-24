import mongoose from "mongoose";
import Company from "../model/Company.model.js";
import nodemailer from 'nodemailer'
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

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        var results = []
        results = await Company.findById(id);
        console.log(results);
        res.status(200).json({
            success: true,
            results
        });
    } catch (err) {
        console.log(results);
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving company",
            error: err.message
        });
    }


}

export const sendEnquiry = async (req, res) => {
    try {
        const { enquiry } = req.body;

        const htmlBody = `<div>
                            <p>${enquiry}</p>
                        </div>`

        let mailTransporter = nodemailer.createTransport({
            auth: {
                pass: "zgreopguooncrivc",
                user: "amit.potdukhe07@gmail.com"
            },
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
        });

        const mailOptions = {
            from: "amit.potdukhe07@gmail.com",
            html: `${htmlBody}`,
            subject: `Enquiry`,
            to: `potdukheamit@gmail.com`,
        };

        const res1 = await mailTransporter.sendMail(mailOptions);
        console.log(res1);
        res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving company",
            error: error.message
        });
    }
}

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