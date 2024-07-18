import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user'
});
con.connect((err) => {
    if (err) {
        console.log('Error connecting to Db', err);
        
    }
    console.log('Connection established');
});


export default con;


