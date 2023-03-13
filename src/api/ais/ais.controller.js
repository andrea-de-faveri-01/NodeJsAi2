const { deleteFile } = require("../../middlewares/delete");
const Ai = require("./ais.model");

const getAllAis = async (req, res, next) => {
  try {
    const ais = await Ai.find();
    return res.json(ais);
  } catch (error) {
    return res.json("Error collecting the ais", error);
  }
};

const getAiById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ai = await Ai.findById(id);

    if (!ai) {
      return res.json(
        "I couldn't find the AI, that id doesn't exist in this database"
      );
    }
    return res.json(ai);
  } catch (error) {
    return res.json({ message: "Error picking up AIS", Error: Error });
  }
};

const getAiByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const ai = await Ai.findOne({ name: name });

    if (!ai) {
      return res.json("I couldn't find the AI, that Ai doesn't exist in this database");
    }

    return res.json(libro);
  } catch (error) {
    return next(error)
  }
};

const getAiByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const ai = await Ai.findOne({ category: category });

    if (!ai) {
      return res.json(
        "I couldn't find the AI, that category doesn't exist in this database"
      );
    }
    return res.json(ai);
  } catch (error) {
    return res.json({ message: "Error picking up AIS", Error: Error });
  }
};

const getAiBeforeYear = async (req, res) => {
  try {
    const { year } = req.params;
    const ai = await Ai.find({ year: { $lt: year } });

    if (!ai) {
      return res.json("I couldn't find AIs before that year in this database");
    }
    return res.json(ai);
  } catch (error) {
    return res.json({ message: "Error picking up AIS", Error: Error });
  }
};

const postAi = async (req, res, next) => {

  try {

    const newAi = new Ai(req.body);

    if (req.file) {
      newAi.logo = req.file.path;
    }

    await newAi.save();

    return res.json(newAi);

  } catch (error) {
    return next(error)
  }

}

const deleteAi = async (req, res, next) => {

  try {
    
    const { idAi } = req.params;

    const aiDeleted = await Ai.findByIdAndDelete(idAi);

    return res.status(200).json(aiDeleted);


  } catch (error) {
    return next(error)
  }

}

const deleteAiByName = async (req, res, next) => {

  try {
    
    const { name } = req.params;

    const aiDeleted = await Ai.findOneAndDelete({name: name});

    return res.status(200).json(aiDeleted);


  } catch (error) {
    return next(error)
  }

}

const updateAi = async (req, res, next) => {

  try {
    

    const { id } = req.params;


    if (req.file) {
      const oldAi = await Ai.findById(id);
      if (oldAi.logo) {
        deleteFile(oldAi.logo);
      }
      req.body.logo = req.file.path;
    }
    
    const aiUpdated = await Libro.findByIdAndUpdate(id, req.body, {new: true});

    return res.status(200).json(aiUpdated);

  } catch (error) {
    return next(error)
  }

}

module.exports = {
  getAllAis,
  getAiById,
  getAiByName,
  getAiByCategory,
  getAiBeforeYear,
  postAi,
  deleteAi,
  deleteAiByName,
  updateAi
};
