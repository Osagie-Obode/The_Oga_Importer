const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const ordersRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', ordersRoutes);

