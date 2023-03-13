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
        return next(error)
    }

}

const getDevs = async (req, res, next) => {

    try {

        
        const devs = await Dev.find().populate("ais");


        return res.json(devs);
        
    } catch (error) {
        return next(error);
    }

}

module.exports = { postDev, getDevs };