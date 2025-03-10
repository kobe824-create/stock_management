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

app.post('/api/insert-new-sod-stock', async (req, res) => {
  const { toolname, availabletools } = req.body;
  if (!toolname || !availabletools) {
    return res.status(400).json({ message: "All fields must be filled" });
  }
  try {
    const query = `INSERT INTO sod_stock (toolname, availableinstock) VALUES (?, ?)`;
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

app.post('/api/insert-new-csa-stock', async (req, res) => {
  const { toolname, availabletools } = req.body;
  if (!toolname || !availabletools) {
    return res.status(401).json({ message: "All field must be filled" });
  }
  try {
    const query = `INSERT INTO csa_stock (toolname, availableinstock) VALUES (?, ?)`;
    const [result] = await db.execute(query, [toolname, availabletools]);

    res.json({
      message: "Tool inserted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/totalstock', async (req, res) => {
  try {
    const [sodResult] = await db.execute(`SELECT COUNT(*) as count FROM sod_stock`);
    const [bdcResult] = await db.execute(`SELECT COUNT(*) as count FROM bdc_stock`);
    const [csaResult] = await db.execute(`SELECT COUNT(*) as count FROM csa_stock`);
    const [pbwResult] = await db.execute(`SELECT COUNT(*) as count FROM pbw_stock`);

    const total = sodResult[0].count + bdcResult[0].count + csaResult[0].count + pbwResult[0].count;

    res.json({
      message: "All Tools in Stock are Selected successfully",
      total,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch low stock items
app.get('/api/low-stock-items', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS lowStockItems FROM items WHERE stock < 10`; // Adjust the threshold as needed
    const [result] = await db.execute(query);
    res.json({
      lowStockItems: result[0].lowStockItems,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch out of stock items
app.get('/api/out-of-stock-items', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS outOfStockItems FROM items WHERE stock = 0`;
    const [result] = await db.execute(query);
    res.json({
      outOfStockItems: result[0].outOfStockItems,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch stock value
app.get('/api/stock-value', async (req, res) => {
  try {
    const query = `SELECT SUM(stock * price) AS stockValue FROM items`;
    const [result] = await db.execute(query);
    res.json({
      stockValue: result[0].stockValue,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch average daily usage
app.get('/api/avg-daily-usage', async (req, res) => {
  try {
    const query = `SELECT AVG(daily_usage) AS avgDailyUsage FROM usage`;
    const [result] = await db.execute(query);
    res.json({
      avgDailyUsage: result[0].avgDailyUsage,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch most used department
app.get('/api/most-used-dept', async (req, res) => {
  try {
    const query = `SELECT department, SUM(usage_count) AS total FROM usage GROUP BY department ORDER BY total DESC LIMIT 1`;
    const [result] = await db.execute(query);
    res.json({
      mostUsedDept: result[0].department,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch fastest moving item
app.get('/api/fastest-moving', async (req, res) => {
  try {
    const query = `SELECT item_name FROM usage ORDER BY usage_count DESC LIMIT 1`;
    const [result] = await db.execute(query);
    res.json({
      fastestMoving: result[0].item_name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch total requests
app.get('/api/total-requests', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS totalRequests FROM requests`;
    const [result] = await db.execute(query);
    res.json({
      totalRequests: result[0].totalRequests,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch approved requests
app.get('/api/approved-requests', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS approvedRequests FROM requests WHERE status = 'Approved'`;
    const [result] = await db.execute(query);
    res.json({
      approvedRequests: result[0].approvedRequests,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch pending requests
app.get('/api/pending-requests', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS pendingRequests FROM requests WHERE status = 'Pending'`;
    const [result] = await db.execute(query);
    res.json({
      pendingRequests: result[0].pendingRequests,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch rejected requests
app.get('/api/rejected-requests', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS rejectedRequests FROM requests WHERE status = 'Rejected'`;
    const [result] = await db.execute(query);
    res.json({
      rejectedRequests: result[0].rejectedRequests,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch total items
app.get('/api/total-items', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS totalItems FROM items`;
    const [result] = await db.execute(query);
    res.json({
      totalItems: result[0].totalItems,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
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

app.post('/api/insert-new-user', async (req, res) => {
  const { teachernames, teachertrade, teacheremail, teacherpassword , userrole , welcomeemail } = req.body;

  if (!teachernames || !teachertrade || !teacheremail || !teacherpassword || !userrole || !welcomeemail) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  try {
    const query = `INSERT INTO users (teacher_names, teacher_trade, teacher_email, teacher_password , userrole , welcomeemail) VALUES (?,?,?,?,?)`;
    const [result] = await db.execute(query, [teachernames, teachertrade, teacheremail, teacherpassword , userrole , welcomeemail ]);
    res.json({
      message: "User inserted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while inserting user",
      error: err.message,
    });
  }
});

app.get('/api/select-all-users', async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const [result] = await db.execute(query);
    res.json({
      message: "All users selected successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/bdc-stock', async (req, res) => {
  try {
    const query = ` SELECT * FROM bdc_stock `;
    const [result] = await db.execute(query);
    res.json({
      message: " All Tools in BDC stock selected successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/sod-stock', async (req, res) => {
  try {
    const query = `SELECT * FROM sod_stock`;
    const [result] = await db.execute(query);
    res.json({
      message: " All Tools in SOD stock selected successfully",
      result,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/csa-stock', async (req, res) => {
  try {
    const query = `SELECT * FROM csa_stock`;
    const [result] = await db.execute(query);
    res.json({
      message: "All Tools in CSA stock selected successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

app.get('/api/pbw-stock', async (req, res) => {
  try {
    const query = `SELECT * FROM pbw_stock`;
    const [result] = await db.execute(query);
    res.json({
      message: "All Tools in PBW stock selected successfully",
      result,
    });
  } catch (err) {
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

// API to fetch summary data
app.get('/api/summary', async (req, res) => {
  try {
    const summaryData = {
      totalItems: 0,
      totalUsage: 0,
      lowStockItems: 0,
      outOfStockItems: 0,
      stockValue: 0,
      avgDailyUsage: 0,
      mostUsedDept: '',
      fastestMoving: '',
      totalRequests: 0,
      approvedRequests: 0,
      pendingRequests: 0,
      rejectedRequests: 0
    };

    // Fetch data for each summary field
    const [totalItemsResult] = await db.execute(`SELECT COUNT(*) as count FROM items`);
    summaryData.totalItems = totalItemsResult[0].count;

    const [totalUsageResult] = await db.execute(`SELECT SUM(usage_count) as total FROM usage`);
    summaryData.totalUsage = totalUsageResult[0].total;

    const [lowStockItemsResult] = await db.execute(`SELECT COUNT(*) as count FROM items WHERE stock < 5`);
    summaryData.lowStockItems = lowStockItemsResult[0].count;

    const [outOfStockItemsResult] = await db.execute(`SELECT COUNT(*) as count FROM items WHERE stock = 0`);
    summaryData.outOfStockItems = outOfStockItemsResult[0].count;

    const [stockValueResult] = await db.execute(`SELECT SUM(stock * price) as total FROM items`);
    summaryData.stockValue = stockValueResult[0].total;

    const [avgDailyUsageResult] = await db.execute(`SELECT AVG(daily_usage) as avg FROM usage`);
    summaryData.avgDailyUsage = avgDailyUsageResult[0].avg;

    const [mostUsedDeptResult] = await db.execute(`SELECT department, SUM(usage_count) as total FROM usage GROUP BY department ORDER BY total DESC LIMIT 1`);
    summaryData.mostUsedDept = mostUsedDeptResult[0].department;

    const [fastestMovingResult] = await db.execute(`SELECT item_name FROM usage ORDER BY usage_count DESC LIMIT 1`);
    summaryData.fastestMoving = fastestMovingResult[0].item_name;

    const [totalRequestsResult] = await db.execute(`SELECT COUNT(*) as count FROM requests`);
    summaryData.totalRequests = totalRequestsResult[0].count;

    const [approvedRequestsResult] = await db.execute(`SELECT COUNT(*) as count FROM requests WHERE status = 'Approved'`);
    summaryData.approvedRequests = approvedRequestsResult[0].count;

    const [pendingRequestsResult] = await db.execute(`SELECT COUNT(*) as count FROM requests WHERE status = 'Pending'`);
    summaryData.pendingRequests = pendingRequestsResult[0].count;

    const [rejectedRequestsResult] = await db.execute(`SELECT COUNT(*) as count FROM requests WHERE status = 'Rejected'`);
    summaryData.rejectedRequests = rejectedRequestsResult[0].count;

    res.json(summaryData);
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch request data
app.get('/api/requests', async (req, res) => {
  try {
    const query = `SELECT * FROM requests`;
    const [result] = await db.execute(query);
    res.json({
      message: "Request data retrieved successfully",
      requests: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch usage data (example)
app.get('/api/usage', async (req, res) => {
  try {
    const query = `SELECT * FROM usage`;
    const [result] = await db.execute(query);
    res.json({
      message: "Usage data retrieved successfully",
      usage: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// API to fetch department data
app.get('/api/departments', async (req, res) => {
  try {
    const query = `SELECT * FROM departments`;
    const [result] = await db.execute(query);
    res.json({
      message: "Department data retrieved successfully",
      departments: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});
// API to fetch department-specific data
app.get('/api/department/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        d.department_name,
        COUNT(i.item_id) AS totalItems,
        SUM(i.usage_count) AS totalUsage
      FROM departments d
      LEFT JOIN items i ON d.department_id = i.department_id
      WHERE d.department_id = ?
      GROUP BY d.department_id
    `;
    const [result] = await db.execute(query, [id]);
    res.json({
      message: "Department data retrieved successfully",
      departmentData: result[0],
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