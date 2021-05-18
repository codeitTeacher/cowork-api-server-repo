const express = require('express');
const db = require('./models');

const { Member } = db;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('URL should contain /api/..');
});

app.get('/api/members', async (req, res) => {
  const { team } = req.query;
  if (team) {
    const membersInTheTeam = await Member.findAll({
      where: { team },
    });
    res.send(membersInTheTeam);
  } else {
    const members = await Member.findAll({});
    res.send(members);
  }
});

app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no member with the id!' });
  }
});

app.post('/api/members', async (req, res) => {
  const newMember = req.body;
  const modelInstance = Member.build(newMember);
  await modelInstance.save();
  res.send(modelInstance);
});

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const arr = await Member.update(newInfo, { where: { id } });
  if (arr[0]) {
    res.send({ message: `${arr[0]} row(s) affected` });
  } else {
    res.send({ message: 'There is no member with the id!' });
  }
});

// app.put('/api/members/:id', async (req, res) => {
//   const { id } = req.params;
//   const newInfo = req.body;
//   const member = await Member.findOne({ where: { id } });
//   if (member) {
//     Object.keys(newInfo).forEach((prop) => {
//       member[prop] = newInfo[prop];
//     });
//     await member.save();
//     res.send(member);
//   } else {
//     res.send({ message: 'There is no member with the id!' });
//   }
// });

app.delete('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Member.destroy({ where: { id } });
  if (deletedCount) {
    res.send({ message: `${deletedCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: 'There is no member with the id!' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening...');
});
