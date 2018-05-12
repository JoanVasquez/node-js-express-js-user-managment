const app = require('./config/server');

require('./app/routes/user')(app);

app.listen(app.get('port'), () => {
	console.log('Listening on PORT : ', app.get('port'));
});