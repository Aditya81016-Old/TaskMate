// ! BOILERPLATE START {----------------------------------
require('dotenv').config()
import express, { json, urlencoded} from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import User, { UserInterface, UserDocument } from './models/user';

const app = express();
const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

interface MyConnectOptions extends ConnectOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  }
  

mongoose
  .connect('mongodb://0.0.0.0:27017/TodoMate')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// ! --------------------------------} BOILERPLATE END 


// * / --route 
app.get('/', (req, res) => {
  res.send('LesGo')
});

// ! CRUD ON USER START {-------------------------------
// * /user --route
app.route('/user')
.post((req, res) => {
  const newUser: UserInterface = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  const user = new User(newUser);

  user.save()
  .then(user => {
    res.json({log: `New user ${user.name} has been added with id ${user._id}`, status: true});
  })
  .catch(error => {
    res.json({log: `Error adding new user: ${error.message}`, status: false});
  });
})
.get(async (req, res) => {
  const id: string = req.body.id;
  const email: string =  req.body.email;
  let user: UserDocument | null = null;

  if (id != undefined && mongoose.isValidObjectId(id)) {
    user = await User.findOne({ _id: id });
  } else if (email != undefined) {
    user = await User.findOne({ email: email });
  }

  if (!user) {
    res.json({ log: 'User not found', status: false });
  } else {
    res.json({data: user, log: `User with id: ${user?._id} and email: ${user?.email} found!`, status: true });
  }

});

// * /user/:id --route
app.route('/user/:id')
.patch(async (req, res) => {
  try {
    const id: string = req.params.id
    const user: UserDocument | null = await User.findOne({_id: id});
    if (!user) {
      return res.json({ log: 'User not found', status: false });
    }
    
    user.set(req.body);
    await user.save();

    return res.json({data: user, log: `User with id: ${id} found and updated`, status: true});
  } catch (error) {
    console.error(error);
    return res.json({ message: 'Server Error', status: false });
  }
})
.delete(async (req, res) => {
  const id: string = req.params.id;

  try {
    const result = await User.deleteOne({ name: req.body.name, email: req.body.email, password: req.body.password, _id: id });
    if (result.deletedCount === 1) {
      return res.json({ log: `User with ID ${id} deleted successfully.`, status: true});
    } else {
      return res.json({log: `User not found.`, status: false});
    }
  } catch (err) {
    return res.json({log: `There was an error`, status: false});
  }
})
// ! -------------------------------} CRUD ON USER END



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
