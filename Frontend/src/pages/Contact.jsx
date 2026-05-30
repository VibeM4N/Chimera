import { useState } from 'react';
import FormInput from '../components/common/FormInput';
import FormSelect from '../components/common/FormSelect';
import FormTextarea from '../components/common/FormTextarea';
import { contactService } from '../services/api';
import useForm from '../hooks/useForm';

const validateContact = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid email format';
  if (!values.subject.trim()) errors.subject = 'Subject is required';
  if (!values.message.trim()) errors.message = 'Message is required';
  if (!values.contactType) errors.contactType = 'Contact type is required';
  return errors;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    {
      name: '',
      email: '',
      subject: '',
      message: '',
      contactType: 'feedback',
      priority: 'medium',
    },
    async (formValues) => {
      try {
        const response = await contactService.submitContact(formValues);
        setTicketId(response.data.ticketId);
        setSubmitted(true);
        resetForm();
      } catch (err) {
        setSubmitError(err.response?.data?.message || 'Failed to submit form');
      }
    },
    validateContact
  );

  const contactTypeOptions = [
    { label: 'Technical Support', value: 'technical_support' },
    { label: 'Security Concern', value: 'security_concerns' },
    { label: 'Partnership Inquiry', value: 'partnerships' },
    { label: 'General Feedback', value: 'feedback' },
  ];

  const priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Have a question or security concern? We're here to help.
          </p>

          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-200 mb-2">Message Received!</h2>
              <p className="text-green-800 dark:text-green-300 mb-6">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Ticket ID</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{ticketId}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Please save this ticket ID for your reference. You can use it to check the status of your request.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  resetForm();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your name"
                  disabled={isSubmitting}
                  required
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Contact Type"
                  name="contactType"
                  value={values.contactType}
                  onChange={handleChange}
                  options={contactTypeOptions}
                  error={errors.contactType}
                  disabled={isSubmitting}
                  required
                />
                <FormSelect
                  label="Priority"
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  options={priorityOptions}
                  disabled={isSubmitting}
                />
              </div>

              <FormInput
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="What is this about?"
                disabled={isSubmitting}
                required
              />

              <FormTextarea
                label="Message"
                name="message"
                value={values.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Please provide details about your inquiry..."
                disabled={isSubmitting}
                maxLength={5000}
                rows={6}
                required
              />

              {submitError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 p-4 rounded-lg">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Security Issues</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Found a security vulnerability? Please email our security team.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Technical Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Experiencing technical issues? Our support team is ready to help.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Partnerships</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Interested in working with us? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
