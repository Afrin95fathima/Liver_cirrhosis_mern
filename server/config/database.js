import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Atlas connection - remove deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Only use supported options for newer MongoDB driver
    });

    console.log(`🌐 MongoDB Atlas Connected Successfully!`);
    console.log(`📄 Host: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    console.log(`✅ Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Set up connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose Atlas connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose disconnected from Atlas');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('💤 Atlas connection closed due to app termination');
      process.exit(0);
    });

    return conn;

  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error.message);
    console.error('🔧 Check your Atlas credentials and network access');
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('💡 Atlas Connection Troubleshooting:');
      console.log('   1. Verify your Atlas username and password');
      console.log('   2. Check IP whitelist in Atlas Network Access');
      console.log('   3. Ensure cluster is active and not paused');
    }
    
    process.exit(1);
  }
};

export default connectDB;