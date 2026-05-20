import { normalizePayload } from '../utils/PayloadNormalizer';

describe('PayloadNormalizer', () => {
	it('should normalize a text message payload', () => {
		const payload = {
			event: 'messages.upsert',
			instance: 'MyInstance',
			data: {
				key: {
					remoteJid: '5511999999999@s.whatsapp.net',
					fromMe: false,
					id: 'abc123',
				},
				message: {
					conversation: 'Hello, how are you?',
				},
				messageTimestamp: 1710000000,
				pushName: 'John Doe',
			},
		};

		const result = normalizePayload(payload);

		expect(result.event).toBe('messages.upsert');
		expect(result.sender).toBe('5511999999999');
		expect(result.senderName).toBe('John Doe');
		expect(result.message).toBe('Hello, how are you?');
		expect(result.messageType).toBe('text');
		expect(result.instance).toBe('MyInstance');
		expect(result.timestamp).toBe('2024-03-09T16:00:00.000Z');
	});

	it('should extract extended text message', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					extendedTextMessage: {
						text: 'This is an extended text',
					},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.sender).toBe('5511888888888');
		expect(result.message).toBe('This is an extended text');
		expect(result.messageType).toBe('text');
	});

	it('should detect image message type', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					imageMessage: {
						caption: 'Check this photo',
						url: 'https://example.com/image.jpg',
					},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('Check this photo');
		expect(result.messageType).toBe('image');
	});

	it('should handle audio message with no text', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					audioMessage: {},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('[Audio Message]');
		expect(result.messageType).toBe('audio');
	});

	it('should handle sticker message', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					stickerMessage: {},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('[Sticker]');
		expect(result.messageType).toBe('sticker');
	});

	it('should handle button response message', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					buttonsResponseMessage: {
						selectedButtonId: 'option_1',
					},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('option_1');
		expect(result.messageType).toBe('button');
	});

	it('should handle list response message', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					listResponseMessage: {
						singleSelectReply: {
							selectedRowId: 'row_42',
						},
					},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('row_42');
		expect(result.messageType).toBe('list');
	});

	it('should handle contact message', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					contactMessage: {
						displayName: 'Jane Doe',
					},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('[Contact]');
		expect(result.messageType).toBe('contact');
	});

	it('should handle unknown message types', () => {
		const payload = {
			event: 'messages.upsert',
			data: {
				key: {
					remoteJid: '5511888888888@s.whatsapp.net',
				},
				message: {
					protocolMessage: {},
				},
				messageTimestamp: 1710000000,
			},
		};

		const result = normalizePayload(payload);
		expect(result.message).toBe('[Unsupported Message Type]');
		expect(result.messageType).toBe('unknown');
	});

	it('should handle empty payload gracefully', () => {
		const result = normalizePayload({});
		expect(result.event).toBe('');
		expect(result.sender).toBe('');
		expect(result.message).toBe('');
		expect(result.messageType).toBe('unknown');
		expect(result.timestamp).toBeDefined();
	});

	it('should handle missing data field', () => {
		const result = normalizePayload({ event: 'test' });
		expect(result.event).toBe('test');
		expect(result.sender).toBe('');
	});
});
