const cron = require("node-cron");
const Event = require("../model/event");

const job = cron.schedule("0 0 * * *", async () => {
  const events = await Event.find({
    start_date: { $lt: new Date() },
    active: true,
  });

  for (const event of events) {
    event.active = false;
    await event.save();
  }
});

module.exports = job;
