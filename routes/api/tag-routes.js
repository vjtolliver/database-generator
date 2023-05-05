const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }],
  });
    //console.log(tags);
    //const readTag = tags.map((tag) => tag.get({ plain: true }));
    //console.log("category", readCat);
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

 // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tag1 = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }],
});
if (!tag1) {
  res.status(404).json({ message: 'Tag Not Found' });
  return;
}
res.status(200).json(tag1);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

 // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
      where: {
        id: req.params.id
      }
    });
    if (!updateTag) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }
    res.status(200).json(updateTag);
      } catch (err) {
        res.status(400).json(err);
      }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }
    res.status(200).json(deletedTag);
      } catch (err) {
        res.status(400).json(err);
      }
});

module.exports = router;
