const ctrl = {}
const Image = require('../models/image')
const sidebar = require('./../helpers/sidebar')

ctrl.index = async (req,res) => {
    const images = await Image.find().lean().sort({timestamp: -1})
    let viewModel = { images: []}
    viewModel.images = images
    viewModel = await sidebar(viewModel);
    const sidebar1 = viewModel.sidebar;
    res.render('index', {images, sidebar1});
}

module.exports = ctrl;