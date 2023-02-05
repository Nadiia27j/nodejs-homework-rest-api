const {Contact} = require("../../models");
const createError = require("http-errors");

const updateStatus = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

    if(!req.body){
        res.status(400).json({"message": "missing field favorite"});
    }

    if(!result){
        throw createError(404, `Contact with id=${id} not found`)
    }

    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};


module.exports = updateStatus;