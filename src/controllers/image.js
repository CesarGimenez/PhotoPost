const path = require('path')
const {randomName} = require('../helpers/libs')
const fs = require('fs-extra');
const Image = require('../models/image');
const Comment = require('../models/comment')
const md5 = require('md5')
const sidebar = require('./../helpers/sidebar')

const ctrl = {}

ctrl.images = async (req,res) => {
    const img = await Image.findOne({filename: req.params.image_id}).lean();
    if(img){
        await Image.findOneAndUpdate({filename: req.params.image_id},{$set: {views: img.views + 1 }});
        const comments = await Comment.find({image_id: img._id}).lean();
        const commentscount = await Comment.find({image_id: img._id}).count();
        let viewModel = {images: []}
        viewModel = await sidebar(viewModel)
        const sidebar1 = viewModel.sidebar;
        res.render('image', {img, comments, commentscount, sidebar1})
    } else {
        res.redirect('/')
    }
    
}

ctrl.create = async (req,res) => {
    const imgUrl = randomName();
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/uploads/${imgUrl}${ext}`)

    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
     await fs.rename(imageTempPath, targetPath)
     const newImage = new Image({
         title: req.body.title,
         filename: imgUrl + ext,
         description: req.body.description
     })
     const imageSaved = await newImage.save();
     console.log(newImage)
     res.redirect('/images/' + imgUrl + ext);
    } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({error: 'Solo se permiten imagenes'});
    }
}

ctrl.likes = async (req,res) => {
    const img = await Image.findOne({filename: req.params.image_id}).lean();
    await Image.findOneAndUpdate({filename: req.params.image_id},{$set: {likes: img.likes + 1}})
    res.json(img.likes)
}

ctrl.comments = async (req,res) => {
    const img = await Image.findOne({filename: req.params.image_id}).lean();
    if(img){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = img._id;
        await newComment.save();
        res.redirect('/images/' + img.filename )
    }
}

ctrl.delete = async (req,res) => {
    const img = await Image.findOneAndDelete({filename: req.params.image_id});
    if(img){
        await fs.unlink(path.resolve('./src/public/uploads/' + img.filename));
        await Comment.deleteMany({image_id: img._id});
        res.redirect('/')
    }
}

module.exports = ctrl;