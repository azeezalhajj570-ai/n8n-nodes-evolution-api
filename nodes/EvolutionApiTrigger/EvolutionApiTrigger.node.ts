import {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	INodePropertyOptions,
	NodeConnectionType,
} from 'n8n-workflow';
import { WebhookService } from '../../utils/WebhookService';
import { normalizePayload } from '../../utils/PayloadNormalizer';

const eventOptions: INodePropertyOptions[] = [
	{
		name: 'New Message (messages.upsert)',
		value: 'messages.upsert',
		description: 'Triggers when a new message is received',
	},
	{
		name: 'Messages Set',
		value: 'MESSAGES_SET',
		description: 'Triggers on messages.set event',
	},
	{
		name: 'Messages Update',
		value: 'MESSAGES_UPDATE',
		description: 'Triggers on messages.update event',
	},
	{
		name: 'Messages Delete',
		value: 'MESSAGES_DELETE',
		description: 'Triggers on messages.delete event',
	},
	{
		name: 'Connection Update',
		value: 'CONNECTION_UPDATE',
		description: 'Triggers on connection.status event',
	},
	{
		name: 'QR Code Updated',
		value: 'QRCODE_UPDATED',
		description: 'Triggers on qrcode.updated event',
	},
	{
		name: 'Presence Update',
		value: 'PRESENCE_UPDATE',
		description: 'Triggers on presence.update event',
	},
	{
		name: 'Chats Upsert',
		value: 'CHATS_UPSERT',
		description: 'Triggers on chats.upsert event',
	},
	{
		name: 'Chats Update',
		value: 'CHATS_UPDATE',
		description: 'Triggers on chats.update event',
	},
	{
		name: 'Chats Delete',
		value: 'CHATS_DELETE',
		description: 'Triggers on chats.delete event',
	},
	{
		name: 'Groups Upsert',
		value: 'GROUPS_UPSERT',
		description: 'Triggers on groups.upsert event',
	},
	{
		name: 'Group Update',
		value: 'GROUP_UPDATE',
		description: 'Triggers on group.update event',
	},
	{
		name: 'Group Participants Update',
		value: 'GROUP_PARTICIPANTS_UPDATE',
		description: 'Triggers on group-participants.update event',
	},
	{
		name: 'Contacts Upsert',
		value: 'CONTACTS_UPSERT',
		description: 'Triggers on contacts.upsert event',
	},
	{
		name: 'Contacts Update',
		value: 'CONTACTS_UPDATE',
		description: 'Triggers on contacts.update event',
	},
	{
		name: 'Labels Edit',
		value: 'LABELS_EDIT',
		description: 'Triggers on labels.edit event',
	},
	{
		name: 'Labels Association',
		value: 'LABELS_ASSOCIATION',
		description: 'Triggers on labels.association event',
	},
	{
		name: 'Call',
		value: 'CALL',
		description: 'Triggers on call event',
	},
	{
		name: 'Typebot Start',
		value: 'TYPEBOT_START',
		description: 'Triggers on typebot.start event',
	},
	{
		name: 'Typebot Change Status',
		value: 'TYPEBOT_CHANGE_STATUS',
		description: 'Triggers on typebot.change_status event',
	},
	{
		name: 'Send Message',
		value: 'SEND_MESSAGE',
		description: 'Triggers on send_message event',
	},
];

export class EvolutionApiTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution API Trigger',
		name: 'evolutionApiTriggerPlus',
		icon: 'file:evolutionapi.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts workflow when a new message arrives via Evolution API',
		defaults: {
			name: 'Evolution API Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'evolutionApiPlus',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: eventOptions,
				default: 'messages.upsert',
				required: true,
				description: 'Event type that triggers the workflow',
			},
			{
				displayName: 'Additional Events',
				name: 'additionalEvents',
				type: 'multiOptions',
				options: eventOptions,
				default: [],
				description: 'Additional events to subscribe to',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('evolutionApiPlus');
				const baseUrl = credentials['server-url'] as string;
				const apiKey = credentials.apikey as string;
				const instanceName = credentials.instanceName as string;
				const instanceToken = credentials.instanceToken as string | undefined;

				if (!baseUrl || !apiKey || !instanceName) {
					return false;
				}

				const existing = await WebhookService.findWebhook(baseUrl, apiKey, instanceName, instanceToken);
				return existing !== null && existing.enabled === true;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('evolutionApiPlus');
				const baseUrl = credentials['server-url'] as string;
				const apiKey = credentials.apikey as string;
				const instanceName = credentials.instanceName as string;
				const instanceToken = credentials.instanceToken as string | undefined;
				const event = this.getNodeParameter('event', '') as string;
				const additionalEvents = this.getNodeParameter('additionalEvents', []) as string[];

				const webhookUrl = this.getNodeWebhookUrl('default');

				if (!baseUrl || !apiKey || !instanceName || !webhookUrl) {
					return false;
				}

				const events = [event, ...additionalEvents].filter(Boolean);

				await WebhookService.registerWebhook(baseUrl, apiKey, instanceName, webhookUrl, events, instanceToken);
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('evolutionApiPlus');
				const baseUrl = credentials['server-url'] as string;
				const apiKey = credentials.apikey as string;
				const instanceName = credentials.instanceName as string;
				const instanceToken = credentials.instanceToken as string | undefined;

				if (!baseUrl || !apiKey || !instanceName) {
					return false;
				}

				await WebhookService.removeWebhook(baseUrl, apiKey, instanceName, instanceToken);
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body;

		if (!body) {
			return {
				workflowData: [
					[
						{
							json: {
								event: 'unknown',
								sender: '',
								message: 'Empty payload received',
								messageType: 'unknown',
								timestamp: new Date().toISOString(),
							} as any,
						},
					],
				],
			};
		}

		const normalized = normalizePayload(body);

		return {
			workflowData: [
				[
					{
						json: normalized as any,
					},
				],
			],
		};
	}
}
