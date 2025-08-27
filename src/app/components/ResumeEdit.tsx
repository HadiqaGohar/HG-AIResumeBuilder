'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface ResumeData {
  name: string;
  email: string;
  skills: string[];
  experience: string[];
  summary: string;
}

export default function ResumeEdit() {
  const [formData, setFormData] = useState<ResumeData>({ name: '', email: '', skills: [], experience: [], summary: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setEditedData(null);

    if (!formData.name.trim()) {
      setError('Name is required');
      setIsSubmitting(false);
      toast.error('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      setIsSubmitting(false);
      toast.error('Email is required');
      return;
    }
    if (formData.skills.length === 0 || formData.skills.every(s => !s.trim())) {
      setError('At least one skill is required');
      setIsSubmitting(false);
      toast.error('At least one skill is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/resume/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          skills: formData.skills.filter(s => s.trim()),
          experience: formData.experience.filter(e => e.trim()),
          summary: formData.summary || null,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail.errors?.join(', ') || 'Failed to edit resume');
      }
      const data = await response.json();
      setEditedData(data);
      toast.success('Resume edited successfully!');
      setFormData({ name: '', email: '', skills: [], experience: [], summary: '' });
    } catch (error) {
      setError(error.message || 'Failed to edit resume. Please try again!');
      toast.error(error.message || 'Failed to edit resume. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-purple-800">Edit Resume Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-purple-800 font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-purple-800 font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="skills" className="block text-purple-800 font-medium">Skills (comma-separated)</label>
          <input
            id="skills"
            type="text"
            value={formData.skills.join(', ')}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            required
            className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Python, JavaScript"
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-purple-800 font-medium">Experience (one per line)</label>
          <textarea
            id="experience"
            value={formData.experience.join('\n')}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value.split('\n').map(s => s.trim()).filter(s => s) })}
            className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Developed web apps at XYZ Corp"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-purple-800 font-medium">Summary (Optional)</label>
          <textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Experienced developer with..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Editing...' : 'Edit Resume'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {editedData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-purple-800">Edited Resume Data:</h3>
          <pre className="text-gray-700 bg-gray-100 p-4 rounded">{JSON.stringify(editedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}