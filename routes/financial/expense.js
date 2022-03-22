const express = require('express');
const expenseData = require('../../mock-data/expense-data');
const auth = require('../../middlewares/passportAuth');

const router = express.Router();
router.use(auth);


router.get('/', (req, res) => {
  res.json(expenseData);
});


router.get('/:id', (req, res) => {
  const foundExpenseData = expenseData.filter(item => item.id==req.params.id);

  if (foundExpenseData.length)
  {
    res.json(foundExpenseData);
  } else {
    res.send(`There is no Expense Record with this ID: ${req.params.id}`);
  }
});

router.post('/', (req, res) => {
  if (req.body.id && req.body.category&&req.body.amount) {
    let checkID = expenseData.filter(item => item.id==req.body.id);
    if (!checkID.length)
    {
      res.send(`New Expense Record has been added. Record: ${req.body.category} - $${req.body.amount}`);
      expenseData.push(req.body);
    } else {
      res.send(`Expense Record with this ID - ${req.body.id} is already exist please change it`);
    }
  } else {
    res.send('Not appropriate Data!');
  }
});

router.delete('/:id', (req, res) => {
  const foundExpenseData = expenseData.filter(item => item.id==req.params.id);

  if (foundExpenseData.length)
  {
    res.send(`Expense Record of ${foundExpenseData[0].category} - $${foundExpenseData[0].amount} record has been deleted`);
    const arrIndex = expenseData.indexOf(foundExpenseData[0]);
    expenseData.splice(arrIndex,1);
  } else {
    res.send(`There is no Expense Record with this ID - ${req.params.id}`);
  }
});

router.put('/', (req, res) => {
  const foundExpenseData = expenseData.filter(item => item.id==req.body.id);
  if (foundExpenseData.length)
  {
    const arrIndex = expenseData.indexOf(foundExpenseData[0]);
    expenseData[arrIndex] = req.body;
    res.send(`${foundExpenseData[0].category} - $${foundExpenseData[0].amount} expense record has been updated to ${expenseData[arrIndex].category} - $${expenseData[arrIndex].amount}`);
  } else {
    res.send(`No Expense Record found with this ID: ${req.body.id}`);
  }
});

module.exports = router;
