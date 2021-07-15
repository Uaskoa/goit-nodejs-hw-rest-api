const { Contact } = require('../service/schemas/contact');
const service = require('../service');

// const { updateContactsJson, contactScheme } = require('./helpers');

const listContacts = async (req, res, next) => {
  try {
    const result = await service.get();

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.getById(contactId);
    if (!result) {
      return await res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    await res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.remove(contactId);
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Such id: ${contactId} was not found`,
      });
    }
    await res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.add(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next();
  }
};

// const addContact = async (req, res) => {
//   const { error } = contactScheme.validate(req.body);
//   if (error) {
//     await res.status(400).json({
//       status: 'error',
//       code: 400,
//       message: error.message,
//     });
//   }
//   const newContact = { ...req.body };
//   contacts.push(newContact);

//   await res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result: newContact,
//     },
//   });
//   updateContactsJson(contacts);
// };

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
 
  try {
    const result = await service.update(contactId, { ...req.body });
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      });
    }

    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    await res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  
  const { favorite = false } = req.body;
  

  try {
    const result = await service.updateStatus(contactId, { favorite });

    if (Object.keys(req.body).length === 0) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'missing field favorite',
        data: 'Not Found',
      });
    }
    await res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
