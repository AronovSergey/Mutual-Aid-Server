const mongoose = require('mongoose');
const User = require('./mongoose/models/User');

async function main() {
    const connection = await mongoose.connect('mongodb+srv://sergey:1234@mutual-aid.n2n9z.mongodb.net/test_DB?retryWrites=true&w=majority',
     { useNewUrlParser: true, useUnifiedTopology: true });

    const c1 = new User({ email: 'ynon@gmail.com', password: 'secret', first_name: 'Sergey', last_name: 'Aronov' });
    const c2 = new User({ email: 'jj@gmail.com', password: '1234', first_name: 'Sergey', last_name: 'Aronov' });

    await c1.save();
    await c2.save();

    const ynon = await User.findOne({ email: 'ynon@gmail.com' });
    const password1Ok = await ynon.checkPassword('secret');
    const password2Ok = await ynon.checkPassword('1234');

    console.log('check password 1 = ', password1Ok);
    console.log('check password 2 = ', password2Ok);

    mongoose.disconnect();
}

main();