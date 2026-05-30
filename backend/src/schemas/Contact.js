import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    contactType: {
      type: String,
      enum: ['technical_support', 'security_concerns', 'partnerships', 'feedback', 'other'],
      default: 'general',
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    attachments: [{
      filename: String,
      mimeType: String,
      size: Number,
      url: String,
    }],
    status: {
      type: String,
      enum: ['new', 'assigned', 'in_progress', 'resolved', 'closed'],
      default: 'new',
    },
    ticketId: {
      type: String,
      unique: true,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Generate ticket ID before saving
contactSchema.pre('save', async function (next) {
  if (!this.ticketId) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    this.ticketId = `CHM-${timestamp}${random}`;
  }
  next();
});

contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ ticketId: 1 });

export default mongoose.model('Contact', contactSchema);
