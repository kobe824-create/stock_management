import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send({
        developer:"Iradukunda happy",
        message:"Server is running well",
    });
});
// Connect to database
const connectDB = async () => {
  try {
    const db = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'stock_management',
    });
    console.log('Database connected successfully');
    return db;
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1); 
  }
};

let db; 

connectDB().then((connection) => {
  db = connection;
});

// api to login as user
app.get('/api/login' , async (req,res) =>{
    const {teachersname , teacherspassword} = req.body;
    if(!teachersname || !teacherspassword){
       res.status(400).json({message:"All fields are required"});
    }
try{
    const select = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const [result] = await db.execute(select ,[teachersname,teacherspassword]);
    res.json({
        message:"User found",
        result,
    });
}
catch(err){
    res.status(500).json({
        message:"Error occured",
        error: err.message,
    });
}
});

app.listen(port , () =>{
  console.log(`server is running on : http://localhost:${port}`);
});