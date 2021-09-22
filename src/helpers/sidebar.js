const stats = require('./stats')
const images = require('./images')
const comments = require('./comments')

module.exports = async (viewModel)=>{
    
    const results = await Promise.all([
        images.popular(),
        images.mostVisited(),
        comments.newest(),
    ])
    viewModel.sidebar = {
        popular: results[0],
        visited: results[1],
        comments: results[2],
    }
    return viewModel
}