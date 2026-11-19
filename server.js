const express = require("express"); 
const sqlite3 = require("sqlite3").verbose(); 
const app = express(); 
const port = 3000; 

// Middleware 
app.use(express.json());

// Connect to database 
const db = new sqlite3.Database('./database/university.db');
db.all('SELECT * FROM courses', (err, rows) => {
    console.log(rows); // Array of all products
});
app.get('/api/courses', (req, res) => { 
    
    db.all('SELECT * FROM courses', (err, rows) => { 
        res.json(rows); 
    }); 
});
// GET single product
app.get('/api/courses/:id', (req, res) => { 
    const id = req.params.id; 
    db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) =>   {{ if(!row)
    return res.status(404).json("Course Not Found")}
        res.json(row); 
    }); 
});
app.post('/api/courses', (req, res) => { 
    const {courseCode , title, credits, description, semester } = req.body;
    
    db.run(` 
        INSERT INTO courses (courseCode, title, credits, description, semester) 
        VALUES (?, ?, ?, ?, ?) 
        `, [courseCode, title, credits, description, semester], 
        function(err) { if(err)
            return res.status(500).json("Database Error")
            res.json({ id: this.lastID }); 
        }
    ); 
});
// Update product price
app.put('/api/courses/:id', (req, res) => { 
    const id = req.params.id; 
    const { courseCode, title, credits, description, semester } = req.body; 
    db.run(` UPDATE courses SET courseCode = ?, title = ?, credits = ?, description = ?, semester = ? WHERE id = ? 
        `, [courseCode, title, credits, description, semester, id], 
        function(err) { 
            res.json({ message: 'course updated'
        }); 
        }
    ); 
});
app.delete('/api/courses/:id', (req, res) => { 
    const id = req.params.id; 
    db.run('DELETE FROM courses WHERE id   = ?'
        , [id], 
        function(err) { if (err) console.error(err)
            res.json({ message: 'course deleted' }); 
        }
    ); 
});
app.listen(3000)
