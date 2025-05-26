import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authen/auth-routes.js';
import messageRoute from './routes/messageRoutes.js';
import profileRoute from './routes/admin/profileRoute.js';
import UserProfileRoutes from './routes/user/UserProfileRoutes.js';
import { app, server } from './config/socket.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
        credentials: true,
    })
);

// Routes
app.use('/api/authen', authRoutes);
app.use('/api/messages', messageRoute);
app.use('/api/admin/profile-admin', profileRoute);
app.use('/api/user/profile', UserProfileRoutes);
app.use('/api/user/service', UserProfileRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});