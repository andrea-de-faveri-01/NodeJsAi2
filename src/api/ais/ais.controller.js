const Ai = require("./ais.model");

const getAllAis = async (req, res) => {
  try {
    const ais = await Ai.find();
    return res.json(ais);
  } catch (error) {
    return res.json("Error collecting the ais", error);
  }
};

const getAiById = async (req, res) => {
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

const getAiByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ai = await Ai.findOne({ category });

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

module.exports = {
  getAllAis,
  getAiById,
  getAiByCategory,
  getAiBeforeYear,
};
