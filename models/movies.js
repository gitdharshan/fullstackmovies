const mongoose=  require('mongoose');

const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    movie_name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    year:{type:Number,required: true},
    rating:{type:Number,required:true},
    creator:{type:mongoose.Types.ObjectId, required: true,ref:"User"}
})

module.exports = mongoose.model("movies",MoviesSchema);