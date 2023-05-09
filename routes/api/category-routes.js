const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// route to find all categories and include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to find one category by its `id` value and include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    // conditional to check for an invalid id entry
    if (!categoryData) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json({message: "Category added successfully!"});

  } catch (err) {
    res.status(500).json(err);
  }
});


// route to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // conditional to check for an invalid id entry
    if (!categoryData) {
      res.status(404).json({message: 'No product found with this id!'})
      return;
    }
    res.status(200).json({message:'Category updated successfully!!'});

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    // conditional to check for an invalid id entry
    if (!categoryData) {
      res.status(404).json({message: 'No product found with this id!'})
      return;
    }
    res.status(200).json({message: 'Category deleted successfully!'});

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
