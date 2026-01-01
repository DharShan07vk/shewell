export interface Session {
    id: number;
    title: string;
    description: string;
    language: string;
    isOnline: boolean;
    hasRecording: boolean;
    sessionDate: string;
    sessionTime: string;
    price: number;
}