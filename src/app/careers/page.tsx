import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// --- UPDATED TYPE DEFINITIONS ---
export interface Job {
  slug: string; // A URL-friendly identifier for the job
  title: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface JobDepartment {
  name: string;
  jobs: Job[];
}

// --- MOCK DATA (Now with more details for the new page) ---
export const jobDepartments: JobDepartment[] = [
  {
    name: 'Engineering',
    jobs: [
      { 
        slug: 'senior-backend-engineer',
        title: 'Senior Backend Engineer', 
        location: 'San Francisco, CA',
        department: 'Engineering',
        description: 'We are seeking an experienced Backend Engineer to design, build, and maintain the scalable, high-performance systems that power our platform.',
        responsibilities: [
          'Develop and maintain robust APIs and services.',
          'Optimize applications for maximum speed and scalability.',
          'Collaborate with front-end developers to integrate user-facing elements.',
          'Implement security and data protection best practices.'
        ],
        qualifications: [
          '5+ years of experience in backend development.',
          'Proficiency in Node.js, Python, or Go.',
          'Experience with database technologies like PostgreSQL and Redis.',
          'Strong understanding of microservices architecture.'
        ]
      },
      { 
        slug: 'frontend-engineer-product',
        title: 'Frontend Engineer, Product', 
        location: 'Remote',
        department: 'Engineering',
        description: 'Join our product team to build beautiful, intuitive, and highly functional user interfaces that our customers love.',
        responsibilities: [
          'Develop new user-facing features using React and TypeScript.',
          'Build reusable code and libraries for future use.',
          'Ensure the technical feasibility of UI/UX designs.',
          'Optimize application for maximum speed and scalability.'
        ],
        qualifications: [
          '3+ years of experience with modern JavaScript frameworks (React preferred).',
          'Strong proficiency in HTML, CSS, and TypeScript.',
          'Experience with state management libraries like Redux or Zustand.',
          'A keen eye for detail and a passion for user experience.'
        ]
      },
    ],
  },
  {
    name: 'Research & AI',
    jobs: [
       { 
        slug: 'research-scientist-nlp',
        title: 'Research Scientist, NLP', 
        location: 'London, UK',
        department: 'Research & AI',
        description: 'Push the boundaries of Natural Language Processing and contribute to cutting-edge AI models that will redefine human-computer interaction.',
        responsibilities: [
            'Design and conduct experiments on large-scale datasets.',
            'Publish research findings in top-tier academic conferences.',
            'Collaborate with engineers to deploy models into production.',
        ],
        qualifications: [
            'PhD in Computer Science, AI, or related field.',
            'Proven track record of publications in NLP (ACL, EMNLP, etc.).',
            'Expertise in deep learning frameworks like PyTorch or TensorFlow.'
        ]
      },
    ]
  }
];

// --- JOB OPENINGS COMPONENT (Links now point to the detail page) ---
const JobOpenings = () => {
  return (
    <>
    <Navbar />
    <section className="relative bg-gray-950 text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* ... (background and header styles remain the same) ... */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                Join Our Team
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                We're building the future and looking for passionate people to join us on our mission.
            </p>
        </div>
        <div className="space-y-16">
          {jobDepartments.map((department) => (
            <div key={department.name} className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-semibold text-white sticky top-24">{department.name}</h2>
              </div>
              <div className="md:col-span-3">
                <ul className="divide-y divide-gray-800">
                  {department.jobs.map((job) => (
                    <li key={job.slug}>
                      {/* THIS IS THE KEY CHANGE: href now points to a dynamic route */}
                      <Link href={`/careers/${job.slug}`} className="group block py-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-medium text-gray-100 group-hover:text-sky-400 transition-colors">
                              {job.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {job.location}
                            </p>
                          </div>
                          {/* ... arrow icon ... */}
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 transform transition-transform duration-300 group-hover:text-sky-400 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    <Footer />
    </section>
    </>
  );
};

export default JobOpenings;