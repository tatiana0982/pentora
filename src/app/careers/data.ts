// src/app/careers/data.ts

export interface Job {
  slug: string;
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
      // ... other jobs
    ],
  },
  // ... other departments
];