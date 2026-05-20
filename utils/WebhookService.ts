import axios, { AxiosRequestConfig } from 'axios';

export interface WebhookRegistration {
	enabled: boolean;
	url: string;
	webhookByEvents: boolean;
	webhookBase64: boolean;
	events: string[];
}

export class WebhookService {
	static async registerWebhook(
		baseUrl: string,
		apiKey: string,
		instanceName: string,
		webhookUrl: string,
		events: string[],
	): Promise<void> {
		const config: AxiosRequestConfig = {
			baseURL: baseUrl,
			url: `/webhook/set/${instanceName}`,
			method: 'POST',
			headers: {
				apikey: apiKey,
				'Content-Type': 'application/json',
			},
			data: {
				webhook: {
					enabled: true,
					url: webhookUrl,
					webhookByEvents: false,
					webhookBase64: false,
					events,
				},
			},
		};

		await axios(config);
	}

	static async findWebhook(
		baseUrl: string,
		apiKey: string,
		instanceName: string,
	): Promise<WebhookRegistration | null> {
		try {
			const config: AxiosRequestConfig = {
				baseURL: baseUrl,
				url: `/webhook/find/${instanceName}`,
				method: 'GET',
				headers: {
					apikey: apiKey,
				},
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
	): Promise<void> {
		try {
			const config: AxiosRequestConfig = {
				baseURL: baseUrl,
				url: `/webhook/${instanceName}`,
				method: 'DELETE',
				headers: {
					apikey: apiKey,
				},
			};

			await axios(config);
		} catch {
			// Silently fail on deactivation cleanup
		}
	}
}
