const router = require('express').Router();


module.exports = router;


//GET '/students'
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

//GET '/students/:id'
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    // const student = await Student.findOne({
    //   where: { id },
    // });
    const student = await Student.findByPk(id);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send('Student does not exist');
    }
  } catch (error) {
    next(error);
  }
});

//POST '/students'
router.post('/', async (req, res, next) => {
  try {
    //let { firstName, lastName, email } = req.body;
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    next(error);
  }
});

//PUT '/students/:id'
router.put('/:id', async (req, res, next) => {
  try {
    //let { firstName, lastName, email } = req.body;
    const id = req.params.id;
    const updatedStudent = await Student.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true,
    });
    res.send(updatedStudent([1]));
  } catch (error) {
    next(error);
  }
});

//DELETE '/students/:id'
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Student.destroy({ where: { id: id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
