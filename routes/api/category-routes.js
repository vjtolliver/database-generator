const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
  });
    //console.log(categories);
    //const readCat = categories.map((category) => category.get({ plain: true }));
    //console.log("category", readCat);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
  });

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category1 = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
});
if (!category1) {
  res.status(404).json({ message: 'Category Not Found' });
  return;
}
res.status(200).json(category1);
  } catch (err) {
    res.status(400).json(err);
  }
  });

 // create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(
      {
      category_name: req.body.category_name
    },
      {
      where: {
        id: req.params.id
      }
    }
    );
    if (!updateCat) {
      res.status(404).json({ message: 'Category Not Found' });
      return;
    }
    res.status(200).json(updateCat);
      } catch (err) {
        res.status(400).json(err);
      }
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCat) {
      res.status(404).json({ message: 'Category Not Found' });
      return;
    }
    res.status(200).json(deletedCat);
      } catch (err) {
        res.status(400).json(err);
      }
});

module.exports = router;
