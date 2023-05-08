const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {

    // find all tags and include its associated Product data
    const tagData = await Tag.findAll({
      include: [
        {model: Product}, 
        {model: ProductTag}
      ]
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {

    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      
      // be sure to include its associated Product data
      include: [{model: Product}]
    });

    if (!tagData) {
      res.status(404).json({message: 'No product found with this id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
