const { Store, Rating, User } = require("../models");

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();

    res.json(stores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.ownerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const ratings = await Rating.findAll({
      where: {
        storeId: store.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) /
          ratings.length
        : 0;

    res.json({
      store: store.name,
      averageRating,
      totalRatings: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};