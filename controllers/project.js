const Projects = require('../models/Projects');

// get all from catalog
exports.getAll = async(req, res) => {
    try {
        const projects = await Projects.find();
        if (!projects) throw Error('No items');
        res.status(200).json({ projects: projects });
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

//get catalog by id
exports.getProjectByID = async(req, res) => {
    const idProject = req.params.idProject;
    try {
        const project = await Projects.findById(idProject);
        if (!project) throw Error('This catalog is not exist');
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// create new catalog
exports.createProject = async(req, res) => {
    const { projectName, teamSize, dateStart } = req.body
    const newProject = new Projects({
        projectName,
        teamSize,
        dateStart
    });
    try {
        const project = await newProject.save();
        if (!project) throw Error('Something went wrong with saving the catalog');
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//update catalog
exports.updateProject = async(req, res) => {
    const idProject = req.params.idProject;
    const { projectName, teamSize, dateStart } = req.body
    try {
        const project = await Projects.findByIdAndUpdate(idProject, { projectName, teamSize, dateStart });
        if (!project) throw Error('Something were wrong with updating the product');
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//delete catalog
exports.deleteProject = async(req, res) => {
    try {
        const project = await Projects.findByIdAndDelete(req.params.idProject);
        if (!project) throw Error('This catalog is not exist');
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}