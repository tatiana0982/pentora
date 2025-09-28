import React from 'react';
import { notFound } from 'next/navigation';
import { jobDepartments, Job } from '../data'; // Import data from the new shared file
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Helper function to find a job by its slug from our mock data
const findJobBySlug = (slug: string): Job | null => {
  for (const department of jobDepartments) {
    const foundJob = department.jobs.find(job => job.slug === slug);
    if (foundJob) return foundJob;
  }
  return null;
};

// DYNAMIC METADATA (App Router way to set the <head> tag)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = findJobBySlug(params.slug);
  if (!job) {
    return { title: 'Job Not Found' };
  }
  return {
    title: `${job.title} - Careers`,
  };
}

// THE PAGE COMPONENT (Now a Server Component)
const JobDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params; // Get slug from component props, not a hook
  const job = findJobBySlug(slug);

  // If no job is found, render the not-found page
  if (!job) {
    notFound();
  }

  return (
    <>  <Navbar />
    <main className="bg-gray-950 text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* --- Job Header --- */}
        <div>
          <p className="text-base font-semibold text-sky-400">{job.department}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">{job.title}</h1>
          <p className="mt-6 text-xl text-gray-400">{job.location}</p>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-12 space-y-12">
          {/* --- Description, Responsibilities, Qualifications --- */}
          <section>
            <h2 className="text-2xl font-bold text-white">About the Role</h2>
            <p className="mt-4 text-gray-300 leading-7">{job.description}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white">Responsibilities</h2>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300">
              {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white">Qualifications</h2>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300">
              {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>
        </div>
        
        {/* --- Application Form --- */}
        <div className="mt-16 pt-12"> {/* Adjusted margin-top and padding-top */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-xl"> {/* New form container */}
                <h2 className="text-3xl font-bold text-white mb-8">Apply for this position</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="full-name" className="block text-sm font-medium text-white">Full Name</label>
                        <input 
                            type="text" 
                            name="full-name" 
                            id="full-name" 
                            required 
                            className="mt-2 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm placeholder-gray-500
                                       focus:border-white focus:ring-white focus:ring-1"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            required 
                            className="mt-2 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm placeholder-gray-500
                                       focus:border-white focus:ring-white focus:ring-1"
                            placeholder="john.doe@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-white">Resume/CV</label>
                        <div className="mt-2 flex justify-center rounded-md border border-dashed border-gray-700 px-6 py-8">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                    <label 
                                        htmlFor="file-upload" 
                                        className="relative cursor-pointer rounded-md font-semibold text-white 
                                                   focus-within:outline-none focus-within:ring-2 focus-within:ring-white 
                                                   focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-gray-200"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" required />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cover-letter" className="block text-sm font-medium text-white">Cover Letter (Optional)</label>
                        <textarea 
                            name="cover-letter" 
                            id="cover-letter" 
                            rows={4} 
                            className="mt-2 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm placeholder-gray-500
                                       focus:border-white focus:ring-white focus:ring-1"
                            placeholder="Tell us why you're a great fit for this role..."
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className="w-full justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-black shadow-lg 
                                       hover:bg-gray-200 transform transition-all duration-200"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
          <Footer/>
    </main>
    </>
  );
};

export default JobDetailPage;