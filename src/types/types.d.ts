import { Timestamp } from "firebase/firestore";

export type FileTree = {
  name: string;
  path: string;
  url: string;
}


export type NestedFileNode =
  | { name: string; type: "folder"; children: NestedFileNode[] }
  | { name: string; type: "file"; path: string; url: string };



//models 

export type RepositoryDoc = {
  docId: string;
  repoName: string;
  title: string;
  description: string;
  keywords: string;
  fileTree: FileTree[];
  createdAt: Timestamp;
}

export type QuoteRequestDoc = {
  name: string;
  email: string;
  phone: string;
  company: string;
  employees: string;
  message: string;
  services: string[];
  createdAt: Timestamp;
};


export type ContactRequestDoc = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
  createdAt: Timestamp;
};


export type AnalyzedDomainsDoc = {
  domain: string;
  passed: number;
  failed: number;
  createdAt: Timestamp;
};

export type AnalyzedContactsDoc = {
  domain: string;
  name: string;
  email: string;
  company: string;
  contact: string;
  createdAt: Timestamp;
};
