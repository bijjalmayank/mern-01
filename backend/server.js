import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

// API routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Since we are in backend/, go one level up to reach frontend/dist
const frontendPath = path.resolve(__dirname, '../frontend/dist');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(frontendPath));

    app.use((req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`✅ Server running on port ${PORT}`);
});
