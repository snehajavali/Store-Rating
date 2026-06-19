const bcrypt = require("bcryptjs");
const { sequelize, User, Store, Rating } = require("./models");

async function seed() {
  try {
    await sequelize.authenticate();

    console.log("Connected to Database");

    await Rating.destroy({ where: {}, force: true });
    await Store.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });

    console.log("Old data deleted");

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const ownerPassword = await bcrypt.hash("Owner@123", 10);
    const userPassword = await bcrypt.hash("User@123", 10);

    // ADMIN
    const admin = await User.create({
      name: "System Administrator Account",
      email: "admin@storerating.com",
      password: adminPassword,
      address: "Electronic City Phase 1, Bengaluru",
      role: "ADMIN",
    });

    // OWNERS
    const owner1 = await User.create({
      name: "Rahul Sharma Store Owner",
      email: "owner1@storerating.com",
      password: ownerPassword,
      address: "Koramangala, Bengaluru",
      role: "OWNER",
    });

    const owner2 = await User.create({
      name: "Priya Nair Store Owner",
      email: "owner2@storerating.com",
      password: ownerPassword,
      address: "Indiranagar, Bengaluru",
      role: "OWNER",
    });

    const owner3 = await User.create({
      name: "Arjun Patel Store Owner",
      email: "owner3@storerating.com",
      password: ownerPassword,
      address: "Whitefield, Bengaluru",
      role: "OWNER",
    });

    // USERS
    const users = await User.bulkCreate([
      {
        name: "Aisha Khan Registered User",
        email: "aisha@gmail.com",
        password: userPassword,
        address: "HSR Layout, Bengaluru",
        role: "USER",
      },
      {
        name: "Rohan Verma Registered User",
        email: "rohan@gmail.com",
        password: userPassword,
        address: "BTM Layout, Bengaluru",
        role: "USER",
      },
      {
        name: "Sneha Gupta Registered User",
        email: "sneha@gmail.com",
        password: userPassword,
        address: "Jayanagar, Bengaluru",
        role: "USER",
      },
      {
        name: "Vikram Reddy Registered User",
        email: "vikram@gmail.com",
        password: userPassword,
        address: "Marathahalli, Bengaluru",
        role: "USER",
      },
      {
        name: "Neha Joshi Registered User",
        email: "neha@gmail.com",
        password: userPassword,
        address: "Rajajinagar, Bengaluru",
        role: "USER",
      },
      {
        name: "Karan Mehta Registered User",
        email: "karan@gmail.com",
        password: userPassword,
        address: "Malleshwaram, Bengaluru",
        role: "USER",
      },
      {
        name: "Pooja Singh Registered User",
        email: "pooja@gmail.com",
        password: userPassword,
        address: "Yelahanka, Bengaluru",
        role: "USER",
      },
      {
        name: "Ananya Rao Registered User",
        email: "ananya@gmail.com",
        password: userPassword,
        address: "Hebbal, Bengaluru",
        role: "USER",
      },
      {
        name: "Rakesh Kumar Registered User",
        email: "rakesh@gmail.com",
        password: userPassword,
        address: "Banashankari, Bengaluru",
        role: "USER",
      },
      {
        name: "Divya Patel Registered User",
        email: "divya@gmail.com",
        password: userPassword,
        address: "JP Nagar, Bengaluru",
        role: "USER",
      },
    ]);

    // STORES
    const stores = await Store.bulkCreate([
      {
        name: "Reliance Fresh",
        email: "reliance@store.com",
        address: "Koramangala, Bengaluru",
        ownerId: owner1.id,
      },
      {
        name: "DMart",
        email: "dmart@store.com",
        address: "Indiranagar, Bengaluru",
        ownerId: owner2.id,
      },
      {
        name: "Nature Basket",
        email: "nature@store.com",
        address: "Whitefield, Bengaluru",
        ownerId: owner3.id,
      },
      {
        name: "More Supermarket",
        email: "more@store.com",
        address: "HSR Layout, Bengaluru",
        ownerId: owner1.id,
      },
      {
        name: "SPAR Hypermarket",
        email: "spar@store.com",
        address: "Marathahalli, Bengaluru",
        ownerId: owner2.id,
      },
      {
        name: "Star Bazaar",
        email: "star@store.com",
        address: "Jayanagar, Bengaluru",
        ownerId: owner3.id,
      },
      {
        name: "Big Bazaar",
        email: "bigbazaar@store.com",
        address: "Malleshwaram, Bengaluru",
        ownerId: owner1.id,
      },
      {
        name: "Fresh Mart",
        email: "freshmart@store.com",
        address: "BTM Layout, Bengaluru",
        ownerId: owner2.id,
      },
    ]);

    // RATINGS
    const ratings = [];

    for (const store of stores) {
      for (let i = 0; i < 5; i++) {
        ratings.push({
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
          userId: users[i].id,
          storeId: store.id,
        });
      }
    }

    await Rating.bulkCreate(ratings);

    console.log("=================================");
    console.log("Database Seeded Successfully");
    console.log("=================================");

    console.log("ADMIN");
    console.log("admin@storerating.com");
    console.log("Admin@123");

    console.log("");

    console.log("OWNER");
    console.log("owner1@storerating.com");
    console.log("Owner@123");

    console.log("");

    console.log("USER");
    console.log("aisha@gmail.com");
    console.log("User@123");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();