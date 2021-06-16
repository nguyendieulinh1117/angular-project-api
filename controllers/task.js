const Projects = require('../models/Projects');
const Tasks = require('../models/Task');
const Users = require('../models/Users')
    // get data from product tbl
exports.getAll = async(req, res) => {
    try {
        const tasks = await Tasks.find();
        if (!tasks) throw Error('No items')
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//get product sort by catalog
exports.getTaskByProject = async(req, res) => {
    const idProject = req.params.idProject;
    try {
        const project = await Projects.findById(idProject);
        if (!project) {
            throw Error('The task is not exist');
        } else {
            const tasks = await Tasks.find({ id_project: idProject });
            if (!tasks) throw Error('No items');
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

exports.getTaskByUser = async(req, res) => {
    const idUser = req.params.idUser;
    try {
        const user = await Users.findById(idUser);
        if (!user) {
            throw Error('The task is not exist');
        } else {
            const tasks = await Tasks.find({ assignedTo: idUser });
            if (!tasks) throw Error('No items');
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//get product by id
exports.getTaskByID = async(req, res) => {
    const idTask = req.params.idTask;
    try {
        const task = await Tasks.findById(idTask);
        if (!task) throw Error('This task is not exist');
        const project = await Projects.findById(task.id_project);
        const projects = await Projects.find();
        const user = await Users.findById(task.assignedTo);
        res.status(200).json({ task: task, project: project, projects: projects, auth: user });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// create product
exports.createTask = async(req, res) => {
    const { taskName, description, id_project, priority, status, assignedTo } = req.body;

    const newTask = new Tasks({
        taskName,
        description,
        id_project,
        priority,
        status,
        assignedTo
    });

    try {
        const task = await newTask.save();
        if (!task) throw Error('Something were wrong with saving task');
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error })
    }

}

//delete product
exports.deleteTask = async(req, res) => {
    const idTask = req.params.idTask;
    try {
        const task = await Tasks.findByIdAndDelete(idTask);
        if (!task) throw Error('This task is not exist');
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//update product
exports.updateTask = async(req, res) => {
    const idTask = req.params.idTask;
    const { taskName, description, id_project, priority, status, assignedTo } = req.body;

    try {
        const task = await Tasks.findByIdAndUpdate(idTask, { taskName, description, id_project, priority, status, assignedTo });
        if (!task) throw Error('Something were wrong with updating the product');
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ message: error });
    }


}

// //get product limit 4
// exports.getProductLimit4 = async (req, res) => {
//     try {
//         const products = await Products.find({}, null, { limit: 4 });
//         if (!products) throw Error('No items')
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(400).json({ message: error });
//     }
// }

// //get product limit 8
// exports.getProductLimit8 = async (req, res) => {
//     try {
//         const products = await Products.find().sort({ _id: -1 }).limit(8);
//         if (!products) throw Error('No items')
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(400).json({ message: error });
//     }
// }

// exports.related = async (req, res) => {
//     const idProduct = req.params.idProduct;
//     try {
//         const product = await Products.findById(idProduct);
//         if (!product) {
//             throw Error('This product is not exist');
//         } else {
//             const products = await Products.find({ id_category: product.id_category, _id: { $ne: idProduct } }).limit(4);
//             if (!products) throw Error('No items');
//             res.status(200).json(products);
//         }
//     } catch (error) {
//         res.status(400).json({ message: error })
//     }
// }