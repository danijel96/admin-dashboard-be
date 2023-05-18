//const createProduct = require("../controlers/employee");
const Employee = require("../models/Employee");

const router = require("express").Router();

//CREATE

// router.post("/", middleware, middlewarePhoto, validator, createProduct);

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json("Employee has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const {
            //sortBy,
            //sortOrder,
            page = 1,
            limit = 10,
        } = req.query;
        const filters = {};
        //const sort = {};

        // Set sort based on query parameters
        //if (sortBy) {
        //    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
        //}

        // Calculate skip and limit based on page and limit
        const skip = (page - 1) * limit;

        // Query the database with filters, sorters and pagination
        const employee = await Employee.find(filters)
            //.sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const count = await Employee.countDocuments(filters);

        res.json({
            employee: employee,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalResults: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
