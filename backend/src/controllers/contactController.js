import Contact from '../models/Contact.js';

export const submitContact = async (req, res) => {
  try {
    const { email, name, subject, message, contactType, priority } = req.body;

    if (!email || !name || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: email, name, subject, message',
      });
    }

    const contact = await Contact.create({
      email,
      name,
      subject,
      message,
      contactType: contactType || 'other',
      priority: priority || 'medium',
      status: 'new',
    });

    res.status(201).json({
      success: true,
      ticketId: contact.ticketId,
      message: 'Your message has been received. We will get back to you soon.',
      contact: {
        ticketId: contact.ticketId,
        email: contact.email,
        name: contact.name,
        status: contact.status,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getContactStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const contact = await Contact.findOne({ ticketId });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.status(200).json({
      success: true,
      contact: {
        ticketId: contact.ticketId,
        status: contact.status,
        email: contact.email,
        name: contact.name,
        subject: contact.subject,
        notes: contact.notes || 'No updates yet',
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
