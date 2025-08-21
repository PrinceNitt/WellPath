import mongoose from "mongoose";
import Center from "./CenterSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    center: {
      type: mongoose.Types.ObjectId,
      ref: "Center",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: "user",
    select: "name photo",
  })

  next();
})

reviewSchema.statics.calcAverageRatings = async function(centerId){

  //this points the current reviews
  const stats = await this.aggregate([{
    $match: {center: centerId}
    },
    {
      $group:{
        _id: '$center',
        numofRating: {$sum:1},
        avgRating:{$avg: '$rating'}
      }
    }
  ])

  console.log(stats);
  await Center.findByIdAndUpdate(centerId, {
    totalRating: stats[0].numofRating,
    averageRating: stats[0].avgRating,
  })
}

reviewSchema.post('save', function(){

  this.constructor.calcAverageRatings(this.center);
})

export default mongoose.model("Review", reviewSchema);
