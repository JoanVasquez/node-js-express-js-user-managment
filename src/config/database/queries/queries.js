
module.exports = {
	//USER PROCESS
	read_user : 'SELECT * FROM User',
	save_user : 'INSERT INTO User SET?',
	update_user : 'UPDATE User SET user_name = ?, user_pass = ? WHERE user_id = ?',
	delete_user : 'DELETE FROM User WHERE user_id = ?',
	sign_in_user : 'SELECT * FROM User WHERE user_email = ?',
	fine_user_by_id : 'SELECT * FROM User WHERE user_id = ?'

	//OTHERS IN CASE THERE ARE...
}
