const { Rating } = require("../models");

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId,
      },
    });

    if (existingRating) {
      return res.status(400).json({
        message: "You already rated this store",
      });
    }

    const newRating = await Rating.create({
      userId: req.user.id,
      storeId,
      rating,
    });

    res.status(201).json({
      message: "Rating submitted",
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { rating } = req.body;

    const existingRating = await Rating.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!existingRating) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    existingRating.rating = rating;
    await existingRating.save();

    res.json({
      message: "Rating updated successfully",
      rating: existingRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};