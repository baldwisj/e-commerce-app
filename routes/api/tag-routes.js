const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData2 = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!tagData2) {
      res.status(404).json({ message: 'No tag found with that id'});
      return;
    }
    res.status(200).json(tagData2);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData3 = await Tag.create(req.body);
    res.status(200).json(tagData3);
   } catch (err) {
    console.error(err);
    res.status(400).json(err);
   }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData4 = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (tagData4[0] === 0) {
      res.status(404).json({ message: 'There is not a tag with this id' });
      return;
    }
    res.status(200).json(tagData4);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData5 = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (tagData5[0] === 0) {
      req.status(404).json({ message: 'No tag found'});
      return;
    }
    res.status(200).json(tagData5);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
