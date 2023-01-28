const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
  console.log(result);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result
    }
  });
};

module.exports = add;
