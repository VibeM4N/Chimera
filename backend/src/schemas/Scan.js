import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['url', 'email'],
      required: true,
    },
    target: {
      type: String,
      required: [true, 'Please provide a target (URL or email)'],
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ['safe', 'suspicious', 'critical'],
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    flagged: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
scanSchema.index({ userId: 1, createdAt: -1 });
scanSchema.index({ type: 1, riskLevel: 1 });

export default mongoose.model('Scan', scanSchema);
