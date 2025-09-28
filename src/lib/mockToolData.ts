// This file simulates fetching different file structures for your tools.

// Type definition for FileNode from your types.d.ts
type FileNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
};

// Helper to create a nested structure from a flat list of paths
const buildTree = (paths: string[]): FileNode[] => {
    const root: { [key: string]: any } = {};

    paths.forEach(fullPath => {
        const parts = fullPath.split('/');
        let currentLevel = root;
        parts.forEach((part, index) => {
            const isFile = index === parts.length - 1;
            if (!currentLevel[part]) {
                currentLevel[part] = {
                    name: part,
                    path: parts.slice(0, index + 1).join('/'),
                    type: isFile ? 'file' : 'folder',
                    ...(isFile ? {} : { children: {} })
                };
            }
            if (!isFile) {
                currentLevel = currentLevel[part].children;
            }
        });
    });

    const convertToList = (level: { [key: string]: any }): FileNode[] => {
        return Object.values(level).map(node => {
            if (node.children) {
                return { ...node, children: convertToList(node.children) };
            }
            return node;
        });
    };

    return convertToList(root);
};


// Mock file paths for each proprietary tool
const cerberusFiles = [
    'src/main.py',
    'src/core/engine.py',
    'src/core/correlation.py',
    'src/connectors/splunk_api.py',
    'src/connectors/crowdstrike_api.py',
    'config/rules.yml',
    'data/ioc_feed.csv',
    'README.md',
];

const spectreFiles = [
    'server/c2_server.go',
    'server/listeners/http_listener.go',
    'agent/implant.go',
    'agent/modules/keylogger.go',
    'agent/modules/screenshot.go',
    'builder/build.sh',
    'README.md',
];

const aegisFiles = [
    'terraform/main.tf',
    'terraform/variables.tf',
    'lambda/event_handler.js',
    'lambda/remediation_engine.js',
    'policies/iam_roles.json',
    'policies/scp.json',
    'docs/architecture.md',
];


export function generateFileTree(repoId: string): FileNode[] | null {
    switch (repoId) {
        case 'cerberus':
            return buildTree(cerberusFiles);
        case 'spectre-c2':
            return buildTree(spectreFiles);
        case 'aegis-shield':
            return buildTree(aegisFiles);
        default:
            // Return a simple structure for other tools or null
            return buildTree(['README.md', 'main.js']);
    }
}
