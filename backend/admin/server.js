import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send({
    developer: 'iradukunda happy',
    message: 'server running well',
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

// Insert tools into bdc_stock
app.post('/api/insert-new-bdc-stock', async (req, res) => {
  const { toolname, availableinstock } = req.body;

  if (!toolname || !availableinstock) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = `INSERT INTO bdc_stock (toolname, availableinstock) VALUES (?, ?)`;
    const [result] = await db.execute(query, [toolname, availableinstock]);

    res.json({
      message: 'Tool inserted successfully',
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error occurred',
      error: err.message,
    });
  }
});

// Insert tools into pbw_stock
app.post('/api/insert-new-pbw-stock', async (req, res) => {
  const { toolname, availabletools } = req.body;

  if (!toolname || !availabletools) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  try {
    const query = `INSERT INTO pbw_stock (toolname, availableinstock) VALUES (?, ?)`;
    const [result] = await db.execute(query, [toolname, availabletools]);

    res.json({
      message: 'Tool inserted successfully',
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error occurred',
      error: err.message,
    });
  }
});

app.post('/api/insert-new-sod-stock', async (req,res)=>{
  const { toolname , availabletools } = req.body;
  if( !toolname || !availabletools){
    return res.status(400).json({message:"All fields must be filled"});
  }
  try{
  const query = `INSERT INTO  sod_stock (toolname , availableinstock) VALUES (?, ?)`;
  const [result] = await db.execute(query, [toolname , availabletools]);

  res.json({
    message:'Tool inserted successfully',
    result,
  });
}
catch(err){
  res.status(500).json({
    message:'Error occurred',
    error: err.message,
  });
}
});

app.post('/api/insert-new-csa-stock', async (req,res) =>{
  const {toolname , availabletools} = req.body ;
  if( !toolname || !availabletools){
    return res.status(401).json({message:"All field must be filled"});
  }
  try{
   const query = `INSERT INTO csa_stock (toolname, availableinstock) VALUES (?, ?)`;
   const [result] = await db.execute(query,[toolname, availabletools]);

   res.json({
    message:"Tool inserted successfully",
    result,
   });
  }
  catch(err){
    res.status(500).json({
      message:"Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/totalstock', async (req, res) =>{
  try{
     const [sodResult] = await db.execute(`SELECT COUNT(*) as count FROM sod_stock`);
     const [bdcResult] = await db.execute(`SELECT COUNT(*) as count FROM bdc_stock`);
     const [csaResult] = await db.execute(`SELECT COUNT(*) as count FROM csa_stock`);
     const [pbwResult] = await db.execute(`SELECT COUNT(*) as count FROM pbw_stock`);

     const total = sodResult[0].count + bdcResult[0].count + csaResult[0].count + pbwResult[0].count;

     res.json({
      message:"All Tools in Stock are Selected successfully",
      total,
     });
  }
  catch(err){
       res.status(500).json({
        message:"Error occurred",
        error: err.message,
       });
  }
});

// API to track low stock items
app.get('/api/lowstock', async (req, res) => {
  const threshold = 5; // Define your low stock threshold here
  try {
    const [sodResult] = await db.execute(`SELECT * FROM sod_stock WHERE availableinstock < ?`, [threshold]);
    const [bdcResult] = await db.execute(`SELECT * FROM bdc_stock WHERE availableinstock < ?`, [threshold]);
    const [csaResult] = await db.execute(`SELECT * FROM csa_stock WHERE availableinstock < ?`, [threshold]);
    const [pbwResult] = await db.execute(`SELECT * FROM pbw_stock WHERE availableinstock < ?`, [threshold]);

    const lowStockItems = [
      ...sodResult,
      ...bdcResult,
      ...csaResult,
      ...pbwResult,
    ];

    res.json({
      message: "Low stock items retrieved successfully",
      lowStockItems,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.post('/api/insert-new-user', async (req,res) =>{
  const {teachernames, teachertrade , teacheremail , teacherpassword} = req.body;
  
  if(!teachernames || !teachertrade || !teacheremail || !teacherpassword){
    return res.status(400).json({message:"All fields must be filled"});
  }

  try{
      const query = `INSERT INTO users (teacher_names , teacher_trade , teacher_email , teacher_password) VALUES (?,?,?,?)`;
      const [result] = await db.execute(query,[teachernames, teachertrade ,teacheremail ,teacherpassword]);
      res.json({
        message:"User inserted successfully",
        result,
      });
  }
  catch(err){
     res.status(500).json({
      message:"Error occurred while inserting user",
      error: err.message,
     });
  }
});

app.get('/api/select-all-users', async(req,res) =>{
  try{
    const query =`SELECT * FROM users`;
    const [result] = await db.execute(query);
    res.json({
      message: "All users selected successfully",
      result,
    });
  }
  catch(err){
    res.status(500).json({
      message:"Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/bdc-stock' , async(req ,res) =>{
  try{
    const query = ` SELECT * FROM bdc_stock `;
    const [result] = await db.execute(query);
    res.json({
      message: " All Tools in BDC stock selected successfully",
      result,
    });
  }
  catch(err){
     res.status(500).json({
      message: "Error occurred",
      error: err.message,
     });
  }
});

app.get('/api/sod-stock' , async(req ,res) =>{
  try{
 const query = `SELECT * FROM sod_stock`;
 const [result] = await db.execute(query);
 res.json({
  message : " All Tools in SOD stock selected successfully",
  result,
 });

}
catch(err){
   res.status(500).json({
    message: "Error occurred",
    error: err.message,
   });
}
});

app.get('/api/csa-stock' , async(req ,res) => {
  try{
const query = `SELECT * FROM csa_stock`;
const [result] = await db.execute(query);
res.json({
  message: "All Tools in CSA stock selected successfully",
  result,
});
  }
  catch(err){
   res.status(500).json({
    message: "Error occurred",
    error: err.message,
   });
  }
});

app.get('/api/pbw-stock' , async(req,res) =>{
  try{
   const query = `SELECT * FROM pbw_stock`;
   const [result] = await db.execute(query);
   res.json({
    message:"All Tools in PBW stock selected successfully",
    result,
   });
  }
  catch(err){
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// New API endpoint to fetch stock data for the chart
app.get('/api/stock-data', async (req, res) => {
  try {
    const [sodResult] = await db.execute(`SELECT toolname, availableinstock FROM sod_stock`);
    const [bdcResult] = await db.execute(`SELECT toolname, availableinstock FROM bdc_stock`);
    const [csaResult] = await db.execute(`SELECT toolname, availableinstock FROM csa_stock`);
    const [pbwResult] = await db.execute(`SELECT toolname, availableinstock FROM pbw_stock`);

    const labels = [];
    const data = [];

    const allResults = [...sodResult, ...bdcResult, ...csaResult, ...pbwResult];

    allResults.forEach(item => {
      labels.push(item.toolname);
      data.push(item.availableinstock);
    });

    res.json({
      message: "Stock data retrieved successfully",
      labels,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});
app.get('/api/stock-comparison', async (req, res) => {
  try {
    const [sodResult] = await db.execute(`SELECT SUM(availableinstock) as total FROM sod_stock`);
    const [bdcResult] = await db.execute(`SELECT SUM(availableinstock) as total FROM bdc_stock`);
    const [csaResult] = await db.execute(`SELECT SUM(availableinstock) as total FROM csa_stock`);
    const [pbwResult] = await db.execute(`SELECT SUM(availableinstock) as total FROM pbw_stock`);

    const data = {
      labels: ['SOD', 'BDC', 'CSA', 'PBW'],
      datasets: [
        {
          label: 'Stock Comparison',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          data: [
            sodResult[0].total,
            bdcResult[0].total,
            csaResult[0].total,
            pbwResult[0].total
          ]
        }
      ]
    };

    res.json({
      message: "Stock comparison data retrieved successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});


app.delete('/api/delete-bdc-stock', async (req, res) => {
  const { toolname } = req.body;
  try {
    const query = `DELETE FROM bdc_stock WHERE toolname = ?`;
    const [result] = await db.execute(query, [toolname]);
    res.json({
      message: "Tool deleted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.delete('/api/delete-pbw-stock', async (req, res) => {
  const { toolname } = req.body;
  try {
    const query = `DELETE FROM pbw_stock WHERE toolname = ?`;
    const [result] = await db.execute(query, [toolname]);
    res.json({
      message: "Tool deleted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.delete('/api/delete-sod-stock', async (req, res) => {
  const { toolname } = req.body;
  try {
    const query = `DELETE FROM sod_stock WHERE toolname = ?`;
    const [result] = await db.execute(query, [toolname]);
    res.json({
      message: "Tool deleted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.delete('/api/delete-csa-stock', async (req, res) => {
  const { toolname } = req.body;
  try {
    const query = `DELETE FROM csa_stock WHERE toolname = ?`;
    const [result] = await db.execute(query, [toolname]);
    res.json({
      message: "Tool deleted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.post('/api/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const query = "SELECT * FROM admin WHERE adminemail = ? AND adminpassword = ?";
    const [result] = await db.execute(query, [email, password]);
    if (result.length > 0) {
      res.json({
        message: "Admin found successfully",
        result,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});