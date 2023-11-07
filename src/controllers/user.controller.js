// const User = require('../../models/user');
const { User, UrlSchema } = require('../../models');

const createUser = async ( req, res) => {
	const { name, email, password } = req.body;

	const user = await User.create({name, email, password});
	return res.status(201).send({user});
}

const fetchUser = async(req, res) => {
	const { id } = req.params;
	const user = await User.findOne({where: {id: parseInt(id)}});

	return res.status(200).json({user});
}

const fetchUsers = async(req, res) => {
	const users = await User.findAll({include: UrlSchema});

	return res.status(200).json({users});
}

const updateUser = async(req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;
	const user = await User.findOne({where: {id: parseInt(id)}});

	if (!user) {
		throw new NotFoundError('user not found');
	}

	const updatedUser = await user.update({name, email}) 
	res.status(200).json({updatedUser})
}

const deleteUser = async(req, res) => {
	const { id } = req.params;
	const user = await User.findOne({where: {id: parseInt(id)}});

	if (!user) {
		throw new NotFoundError('user not found');
	}

	await user.destroy({where: {id: parseInt(id)}}) 
	res.status(200).json({message: 'user deleted'})
}

module.exports = { createUser, fetchUsers, fetchUser, updateUser, deleteUser }