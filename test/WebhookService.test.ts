import axios from 'axios';
import { WebhookService } from '../utils/WebhookService';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('WebhookService', () => {
	const baseUrl = 'https://api.example.com';
	const apiKey = 'test-api-key';
	const instanceName = 'MyInstance';
	const webhookUrl = 'https://n8n.example.com/webhook/abc123';
	const events = ['messages.upsert'];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('registerWebhook', () => {
		it('should call POST /webhook/set/{instanceName} with correct payload', async () => {
			mockedAxios.mockResolvedValue({ data: { success: true } } as any);

			await WebhookService.registerWebhook(baseUrl, apiKey, instanceName, webhookUrl, events);

			expect(mockedAxios).toHaveBeenCalledWith({
				baseURL: baseUrl,
				url: `/webhook/set/${instanceName}`,
				method: 'POST',
				headers: {
					apikey: apiKey,
					'Content-Type': 'application/json',
				},
				data: {
					url: webhookUrl,
					webhook_by_events: false,
					webhook_base64: false,
					events,
				},
			});
		});

		it('should propagate axios errors', async () => {
			mockedAxios.mockRejectedValue(new Error('Network error'));

			await expect(
				WebhookService.registerWebhook(baseUrl, apiKey, instanceName, webhookUrl, events),
			).rejects.toThrow('Network error');
		});
	});

	describe('findWebhook', () => {
		it('should call GET /webhook/find/{instanceName} and return data', async () => {
			const mockResponse = {
				data: {
					enabled: true,
					url: webhookUrl,
					webhookByEvents: false,
					webhookBase64: false,
					events: ['messages.upsert'],
				},
			};
			mockedAxios.mockResolvedValue(mockResponse as any);

			const result = await WebhookService.findWebhook(baseUrl, apiKey, instanceName);

			expect(mockedAxios).toHaveBeenCalledWith({
				baseURL: baseUrl,
				url: `/webhook/find/${instanceName}`,
				method: 'GET',
				headers: {
					apikey: apiKey,
				},
			});
			expect(result).toEqual(mockResponse.data);
		});

		it('should return null on error', async () => {
			mockedAxios.mockRejectedValue(new Error('Not found'));

			const result = await WebhookService.findWebhook(baseUrl, apiKey, instanceName);
			expect(result).toBeNull();
		});
	});

	describe('removeWebhook', () => {
		it('should call DELETE /webhook/{instanceName}', async () => {
			mockedAxios.mockResolvedValue({ data: {} } as any);

			await WebhookService.removeWebhook(baseUrl, apiKey, instanceName);

			expect(mockedAxios).toHaveBeenCalledWith({
				baseURL: baseUrl,
				url: `/webhook/${instanceName}`,
				method: 'DELETE',
				headers: {
					apikey: apiKey,
				},
			});
		});

		it('should not throw on error (silent cleanup)', async () => {
			mockedAxios.mockRejectedValue(new Error('Server error'));

			await expect(
				WebhookService.removeWebhook(baseUrl, apiKey, instanceName),
			).resolves.toBeUndefined();
		});
	});
});
