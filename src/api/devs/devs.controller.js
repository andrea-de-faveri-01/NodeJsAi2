const Dev = require("./devs.model");

const postDev = async (req, res, next) => {
  try {
    const newDev = await new Dev(req.body);

    if (req.file) {
      newDev.logo = req.file.path;
    }

    await newDev.save();

    return res.status(201).json(newDev);
  } catch (error) {
    return next(error);
  }
};

const getAllDevs = async (req, res, next) => {
  try {
    const devs = await Dev.find().populate("ais");

    return res.json(devs);
  } catch (error) {
    return next(error);
  }
};

const getDevById = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log('id:', id);
      const dev = await Dev.findById(id).populate("ais");
      console.log('dev:', dev);
  
      if (!dev) {
        return res.status(404).json({ message: "Developer not found" });
      }
  
      return res.json(dev);
    } catch (error) {
      console.log('error:', error);
      return next(error);
    }
  };

module.exports = { postDev, getAllDevs, getDevById };
