const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
