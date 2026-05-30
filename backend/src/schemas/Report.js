import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: {
      type: String,
      required: [true, 'Please provide a URL to report'],
    },
    reportType: {
      type: String,
      enum: ['phishing', 'malware', 'scam', 'fake_site', 'spam', 'other'],
      required: [true, 'Please specify the report type'],
    },
    threatLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    evidence: {
      type: String,
      default: '',
    },
    discoveryMethod: {
      type: String,
      enum: ['email', 'social_media', 'search_engine', 'direct_link', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'confirmed', 'rejected'],
      default: 'pending',
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    reportedBy: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ url: 1 });
reportSchema.index({ reportType: 1, threatLevel: 1 });

export default mongoose.model('Report', reportSchema);
