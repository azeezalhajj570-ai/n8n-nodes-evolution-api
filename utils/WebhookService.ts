import axios, { AxiosRequestConfig } from 'axios';

export interface WebhookRegistration {
	enabled: boolean;
	url: string;
	webhookByEvents: boolean;
	webhookBase64: boolean;
	events: string[];
}

function normalizeBaseUrl(url: string): string {
	return url.replace(/\/+$/, '');
}

function buildHeaders(apiKey: string, instanceToken?: string): Record<string, string> {
	const headers: Record<string, string> = {
		apikey: apiKey,
		'Content-Type': 'application/json',
	};
	if (instanceToken) {
		headers.token = instanceToken;
	}
	return headers;
}

export class WebhookService {
	static async registerWebhook(
		baseUrl: string,
		apiKey: string,
		instanceName: string,
		webhookUrl: string,
		events: string[],
		instanceToken?: string,
	): Promise<void> {
		const config: AxiosRequestConfig = {
			baseURL: normalizeBaseUrl(baseUrl),
			url: `/webhook/set/${instanceName}`,
			method: 'POST',
			headers: buildHeaders(apiKey, instanceToken),
			data: {
				url: webhookUrl,
				webhook_by_events: false,
				webhook_base64: false,
				events,
			},
		};

		await axios(config);
	}

	static async findWebhook(
		baseUrl: string,
		apiKey: string,
		instanceName: string,
		instanceToken?: string,
	): Promise<WebhookRegistration | null> {
		try {
			const config: AxiosRequestConfig = {
				baseURL: normalizeBaseUrl(baseUrl),
				url: `/webhook/find/${instanceName}`,
				method: 'GET',
				headers: buildHeaders(apiKey, instanceToken),
			};

			const response = await axios(config);
			return response.data as WebhookRegistration;
		} catch {
			return null;
		}
	}

	static async removeWebhook(
		baseUrl: string,
		apiKey: string,
		instanceName: string,
		instanceToken?: string,
	): Promise<void> {
		try {
			const config: AxiosRequestConfig = {
				baseURL: normalizeBaseUrl(baseUrl),
				url: `/webhook/${instanceName}`,
				method: 'DELETE',
				headers: buildHeaders(apiKey, instanceToken),
			};

			await axios(config);
		} catch {
			// Silently fail on deactivation cleanup
		}
	}
}
