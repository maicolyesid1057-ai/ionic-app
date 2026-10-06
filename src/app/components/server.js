const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});