const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint

// route to find all tags and include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product}
      ]
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id` and include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    // conditional to check for an invalid id entry
    if (!tagData) {
      res.status(404).json({message: 'No product found with this id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create one new tag
router.post('/', async (req, res) => {
  try {
    await Tag.create(req.body);
    res.status(200).json({message: "Tag added successfully!"});
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // conditional to check for an invalid id entry
    if (!tagData) {
      res.status(404).json({message: 'No product found with this id!'})
      return;
    }
    res.status(200).json({message:'Tag updated successfully!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    // conditional to check for an invalid id entry
    if (!tagData) {
      res.status(404).json({message: 'No product found with this id!'})
      return;
    }
    res.status(200).json({message: 'Tag deleted successfully'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
