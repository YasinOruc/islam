import { PrayerTimes, Location, CalculationMethod } from './types';

interface AladhanResponse {
    code: number;
    status: string;
    data: {
        timings: PrayerTimes;
        date: {
            readable: string;
            timestamp: string;
        };
        meta: {
            latitude: number;
            longitude: number;
            timezone: string;
        };
    };
}

const API_URL = 'https://api.aladhan.com/v1/timings';
const TIMEOUT_MS = 5000;
const MAX_RETRIES = 3;

export class APIError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

export async function fetchPrayerTimes(
    location: Location, 
    calculationMethod: CalculationMethod,
    retryCount = 0
): Promise<PrayerTimes> {
    try {
        const params = new URLSearchParams({
            latitude: location.latitude.toString(),
            longitude: location.longitude.toString(),
            method: calculationMethod
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const response = await fetch(`${API_URL}?${params}`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new APIError(response.status, `API error: ${response.statusText}`);
        }

        const data: AladhanResponse = await response.json();
        return data.data.timings;
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            return fetchPrayerTimes(location, calculationMethod, retryCount + 1);
        }
        console.error('Error fetching prayer times:', error);
        throw error instanceof APIError ? error : new APIError(500, 'Internal error');
    }
}
