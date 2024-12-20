import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { userSeeds } from './userSeeds.js';
import { thoughtSeeds } from './thoughtSeeds.js';

db.once('open', async () => {
  try {
    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, username } = await Thought.create(thoughtSeeds[i]);
      await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
