const comments = require('./../models/comment')
const images = require('./../models/image')

module.exports = {
    async newest() {
        const newestComents = await comments.find().limit(5).sort({timestamp: -1}).lean()
        for(let comment of newestComents){
            const image = await images.findOne({_id: comment.image_id}).lean();
            comment.image = image
        }
        return newestComents
    }
}