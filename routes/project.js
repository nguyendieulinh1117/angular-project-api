const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const projectController = require('../controllers/project');
const taskController = require('../controllers/task');


router.get('/project', projectController.getAll);


router.get('/project/:idProject', projectController.getProjectByID);


router.post('/project', projectController.createProject);


router.patch('/project/update/:idProject', projectController.updateProject);

//delete catalog
router.delete('/project/delete/:idProject', projectController.deleteProject);

// get all product
router.get('/task', taskController.getAll);

//get product by catalog
router.get('/task/:idProject', taskController.getTaskByProject);

router.get('/task/user/:idUser', taskController.getTaskByUser);

//get product by id
router.get('/task/detail/:idTask', taskController.getTaskByID);

// create new product
router.post('/task', taskController.createTask);

//delete product
router.delete('/task/delete/:idTask', taskController.deleteTask);

//update product
router.patch('/task/update/:idTask', taskController.updateTask);

// //get featured
// router.get('/featured', productController.getProductLimit4);

// //get latest product
// router.get('/latest', productController.getProductLimit8);

// //get related product
// router.get('/related/:idProduct', productController.related);

module.exports = router;