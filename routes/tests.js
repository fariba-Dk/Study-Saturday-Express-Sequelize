const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

module.exports = router;

//GET '/tests'
router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (error) {
    next(error);
  }
});

//GET '/students/:id'
router.get('/:id', async (req, res, next) => {
  try {
    //const id = req.params.id;
    const test = await Test.findByPk(req.params.id);
    if (test) {
      res.send(test);
    } else {
      res.status(404).send('Test does not exist');
    }
  } catch (error) {
    next(error);
  }
});

//POST '/API/tests/student/studentId
router.post('/student/:studentId', async (req, res, next) => {
  try {
    const test = await Test.create(req.body);
    const student = await Student.findByPk(req.params.studentId);
    await test.setStudent(student);
    res.status(201).send(test);
  } catch (error) {
    next(error);
  }
});

//DELETE '/students/:id'
router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
