const express = require('express');
const incomeData = require('../../mock-data/income-data');
const auth = require('../../middlewares/passportAuth');

const router = express.Router();
router.use(auth);


router.get('/', (req, res) => {
  res.json(incomeData);
});

router.get('/:id', (req, res) => {
  const foundIncomeData = incomeData.filter(item => item.id == req.params.id);

  if (foundIncomeData.length)
  {
    res.json(foundIncomeData);
  } else {
    res.send(`There is no Income Record with this ID: ${req.params.id}`);
  }
});

router.post('/', (req, res) => {
  if (req.body.id && req.body.category && req.body.amount)
  {
    const checkID = incomeData.filter(item => item.id == req.body.id);
    if (!checkID.length)
    {
      res.send(`New Income Record has been added. Record: ${req.body.category} - $${req.body.amount}`);
      incomeData.push(req.body);
    } else {
      res.send(`Income Record with this ID - ${req.body.id} is already exist please change it`);
    }
  } else {
    res.send('Not appropriate Data!');
  }
});

router.delete('/:id', (req, res) => {
  const foundIncomeData = incomeData.filter(item => item.id==req.params.id);

  if (foundIncomeData.length)
  {
    res.send(`Income Record of ${foundIncomeData[0].category} - $${foundIncomeData[0].amount} record has been deleted`);
    const arrIndex = incomeData.indexOf(foundIncomeData[0]);
    incomeData.splice(arrIndex, 1);
  } else {
    res.send(`There is no Income Record with this ID - ${req.params.id}`);
  }
});

router.put('/', (req, res) => {
  const foundIncomeData = incomeData.filter(item => item.id==req.body.id);
  if (foundIncomeData.length)
  {
    const arrIndex = incomeData.indexOf(foundIncomeData[0]);
    incomeData[arrIndex] = req.body;
    res.send(`${foundIncomeData[0].category} - $${foundIncomeData[0].amount} income record has been updated to ${incomeData[arrIndex].category} - $${incomeData[arrIndex].amount}`);
  } else {
    res.send(`No Income Record found with this ID: ${req.body.id}`);
  }
});

module.exports = router;
