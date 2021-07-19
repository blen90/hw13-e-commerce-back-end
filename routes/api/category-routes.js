const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await.Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = await Category.create(req.body);

  return res.json(categoryData);

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  );
  return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

  return res.json(categoryData);
});


module.exports = router;
