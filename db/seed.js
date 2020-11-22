const Gallery = require('../models/gallery');
const GallerySeeds = require('./galleries.json');
const User = require('../models/User');

const getUser = async () => {
  try {
    if (!process.argv[2]) {
      throw new Error(
        'To seed the database provide an email address for an existing user'
      );
    }
    const user = await User.findOne({ email: process.argv[2] });
    if (!user) {
      throw new Error('No matching user found!');
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};

Gallery.deleteMany()
  .then(getUser)
  .then((user) => {
    const seedDataWithOwner = seedData.map((gallery) => {
      gallery.owner = user._id;
      return gallery;
    });
    return Gallery.insertMany(seedDataWithOwner);
  })
  .then(console.log)
  .then(console.error)
  .finally(() => {
    process.exit();
  });