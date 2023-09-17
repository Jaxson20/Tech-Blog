const seedUsers = require('./seed/userSeed');
const seedBlogPosts = require('./seed/blogPostSeed');
const seedComments = require('./seed/commentSeed');
const sequelize = require('./config/connection'); 

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); 

  await seedUsers(); 
  await seedBlogPosts(); 
  await seedComments(); 

  console.log('Database seeded successfully.');
  process.exit(0);
};

seedDatabase();
