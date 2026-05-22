import { sequelize, User, Event } from "./db.js";

const seedDB = async () => {
  const force =
    process.env.SEED_FORCE === "true" ||
    process.env.SEED_FORCE === "1";

  await sequelize.sync({ force });

  if (!force) {
    const userCount = await User.count();

    if (userCount > 0) {
      console.log(
        "Database already seeded (users exist). Skipping. Use SEED_FORCE=true to reset and re-seed."
      );

      return false;
    }
  }

  const users = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "12345678",
    },

    {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "12345678",
    },

    {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "12345678",
    },
  ];

  const events = [
    {
      title: "Summer Tech Festival",
      description: "Big summer tech event",
      date: new Date("2026-06-21"),
      location: "Düsseldorf",
      latitude: 52.520008,
      longitude: 13.404954,
      organizerId: 1,
    },

    {
      title: "AI & Future Conference",
      description:
        "Explore artificial intelligence, startups, and future technologies.",
      date: new Date("2026-10-10"),
      location: "Munich",
      latitude: 48.135124,
      longitude: 11.581981,
      organizerId: 2,
    },

    {
      title: "Frontend Developer Meetup",
      description:
        "Networking event for React and JavaScript developers.",
      date: new Date("2026-11-05"),
      location: "Hamburg",
      latitude: 53.551086,
      longitude: 9.993682,
      organizerId: 3,
    },
    
    {
      title: "React Conference",
      description: "A modern frontend conference focused on React, TypeScript, AI tools and real-world projects.",
      date: new Date("2026-06-03"),
      location: "Düsseldorf, Germany",
      latitude: 51.2277,
      longitude: 6.7735,
      organizerId: 1
    }
  ];

  await User.bulkCreate(users, {
    individualHooks: true,
  });

  await Event.bulkCreate(events, {
    individualHooks: true,
  });

  return true;
};

try {
  const didSeed = await seedDB();

  if (didSeed) {
    console.log("Database seeded.");
  }
} catch (error) {
  console.error({ error });
} finally {
  sequelize.close();
  console.log("Database connection closed");
}