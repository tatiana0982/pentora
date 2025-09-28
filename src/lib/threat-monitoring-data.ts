import { ShieldAlert, AlertTriangle, ShieldCheck, Server, LucideProps } from 'lucide-react';

// Defines the shape of our Key Performance Indicator data
export interface KpiData {
    title: string;
    value: string;
    trend: string;
    trendType: 'up' | 'down' | 'neutral';
    Icon: React.ElementType<LucideProps>;
}

// Defines the structure for alerts categorized by their severity level
export interface AlertSeverityData {
    name: 'Critical' | 'High' | 'Medium' | 'Low';
    value: number;
    fill: string;
}

// Defines the structure for security events over a period of time
export interface TimeSeriesEventData {
    date: string;
    Critical: number;
    High: number;
    Medium: number;
}

// Defines the structure for a single entry in the security events log
export interface SecurityEventLog {
    id: string;
    timestamp: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    sourceIp: string;
    status: 'Blocked' | 'Investigating' | 'Contained' | 'Resolved';
}

// Defines the structure for displaying attack origins on the threat map
export interface ThreatOrigin {
    id: string;
    country: string;
    coords: [number, number]; // [latitude, longitude]
    attacks: number;
}

// --- MOCK DATA EXPORTS ---

export const kpiData: KpiData[] = [
    {
        title: "Total Alerts (24h)",
        value: "1,873",
        trend: "+5.2%",
        trendType: 'up', // More alerts is bad, so 'up' will be red
        Icon: AlertTriangle,
    },
    {
        title: "High-Severity Incidents",
        value: "42",
        trend: "+12.5%",
        trendType: 'up',
        Icon: ShieldAlert,
    },
    {
        title: "Assets Monitored",
        value: "2,540",
        trend: "Stable",
        trendType: 'neutral',
        Icon: Server,
    },
    {
        title: "Mean Time to Resolution",
        value: "38m",
        trend: "-3.1%",
        trendType: 'down', // Lower time is good, so 'down' will be green
        Icon: ShieldCheck,
    }
];

export const alertsBySeverityData: AlertSeverityData[] = [
    { name: 'Critical', value: 15, fill: '#ef4444' }, // Red
    { name: 'High', value: 125, fill: '#f97316' }, // Orange
    { name: 'Medium', value: 650, fill: '#f59e0b' }, // Amber
    { name: 'Low', value: 1083, fill: '#3b82f6' },  // Blue
];

// Generate realistic-looking time series data for the last 30 days
export const eventsOverTimeData: TimeSeriesEventData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        // Simulate a spike in recent days
        Critical: Math.floor(Math.random() * 5) + (i > 25 ? Math.floor(Math.random() * 10) : 0),
        High: Math.floor(Math.random() * 20) + 10 + (i > 25 ? Math.floor(Math.random() * 20) : 0),
        Medium: Math.floor(Math.random() * 100) + 50,
    };
});

export const securityEventsLogData: SecurityEventLog[] = [
    { id: 'evt-1', timestamp: '2025-09-11 23:30:15', severity: 'Critical', description: 'Ransomware signature detected on `fileserv-01`', sourceIp: '198.51.100.23', status: 'Blocked' },
    { id: 'evt-2', timestamp: '2025-09-11 23:28:49', severity: 'High', description: 'Multiple failed login attempts for user `admin`', sourceIp: '203.0.113.12', status: 'Investigating' },
    { id: 'evt-3', timestamp: '2025-09-11 23:25:02', severity: 'Medium', description: 'Anomalous data egress from `db-prod-3`', sourceIp: '172.16.254.1', status: 'Contained' },
    { id: 'evt-4', timestamp: '2025-09-11 23:22:18', severity: 'Low', description: 'Port scan detected from external IP', sourceIp: '192.0.2.88', status: 'Resolved' },
    { id: 'evt-5', timestamp: '2025-09-11 23:19:55', severity: 'High', description: 'Potential SQL injection attempt on web-app-05', sourceIp: '198.51.100.5', status: 'Blocked' },
    { id: 'evt-6', timestamp: '2025-09-11 23:15:31', severity: 'Medium', description: 'New administrative user `temp_admin` created', sourceIp: '10.0.0.5', status: 'Investigating' },
];

export const threatMapOrigins: ThreatOrigin[] = [
    { id: "cn", country: "China", coords: [35, 105], attacks: 85 },
    { id: "ru", country: "Russia", coords: [61, 97], attacks: 72 },
    { id: "us", country: "USA", coords: [38, -97], attacks: 58 },
    { id: "de", country: "Germany", coords: [51, 9], attacks: 45 },
    { id: "br", country: "Brazil", coords: [-14, -51], attacks: 33 },
    { id: "in", country: "India", coords: [20, 77], attacks: 24 },
    { id: "ng", country: "Nigeria", coords: [9, 8], attacks: 18 },
];

