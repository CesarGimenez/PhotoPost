const image = require('./../models/image')

module.exports = {
    async popular(){
        const popularimg = await image.find().lean().limit(5).sort({likes: -1});
        return popularimg
    },
    async mostVisited(){
        const imgVisited = await image.find().lean().limit(5).sort({views: -1});
        return imgVisited
    }
}