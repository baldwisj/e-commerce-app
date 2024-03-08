const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const CategoryData2 = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData2) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(CategoryData2);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData3 = await Category.create(req.body);
    res.status(200).json(categoryData3);
   } catch (err) {
    console.error(err);
    res.status(400).json(err);
   }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData4 = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (categoryData4[0] === 0) {
      res.status(404).json({ message: 'No catagory with this id'});
      return;
    }
    res.status(200).json(categoryData4);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData5= await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData5) {
    res.status(404).json({ message: 'No category found with this id'});
    return;
  }
  res.status(200).json(categoryData5);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
