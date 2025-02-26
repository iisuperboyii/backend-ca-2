import express from 'express';

const app = express();
const port = 6000;
app.use(express.json())
//app.use(express.static('static'));

const users = [
  {email: "alice@example.com", password: "alice123"},
  {email: 'bob@example.com', password: "bob123"},
  {email: 'charlie@example.com', password: 'charlie123'}
]

app.put('/reset', (req, res) => {
    const {email, password} = req.body;
    try {
      const userIndex = users.findIndex(user => user.email === email);
      if(userIndex !== -1) {
        users[userIndex].password = password;
        res.send('Password Updated');
      } else {
        res.send('User not found');
      }
    } catch (error) {
      console.error(error); 
      res.status(500).send('Internal Server Error');
    }
});


app.delete('/remove', (req, res) => {
  const {email, password} = req.body;
  try {
    const userIndex = users.findIndex(user => user.email === email);
      if(userIndex !== -1) {
        users[userIndex].password = password;
        users.splice(userIndex,1)
        res.send('User deleted');
      } else {
        res.send('User not found');
      }
  } catch (error) {
    console.error(error); 
    res.status(500).send('Internal Server Error');
  }
  
});


app.listen(port, () => {
  console.log(`Server running successfully at http://localhost:${port}`);
});