export interface NormalizedMessage {
	event: string;
	sender: string;
	senderName: string;
	message: string;
	messageType: string;
	timestamp: string;
	instance: string;
	raw: any;
}

function extractSender(remoteJid: string): string {
	if (!remoteJid) return '';
	return remoteJid.split('@')[0];
}

function extractMessageText(message: any): string {
	if (!message) return '';

	if (message.conversation) {
		return message.conversation;
	}

	if (message.extendedTextMessage?.text) {
		return message.extendedTextMessage.text;
	}

	if (message.imageMessage?.caption) {
		return message.imageMessage.caption;
	}

	if (message.videoMessage?.caption) {
		return message.videoMessage.caption;
	}

	if (message.documentMessage?.caption) {
		return message.documentMessage.caption;
	}

	if (message.audioMessage) {
		return '[Audio Message]';
	}

	if (message.stickerMessage) {
		return '[Sticker]';
	}

	if (message.contactMessage) {
		return '[Contact]';
	}

	if (message.locationMessage) {
		return '[Location]';
	}

	if (message.buttonsResponseMessage?.selectedButtonId) {
		return message.buttonsResponseMessage.selectedButtonId;
	}

	if (message.listResponseMessage?.singleSelectReply?.selectedRowId) {
		return message.listResponseMessage.singleSelectReply.selectedRowId;
	}

	return '[Unsupported Message Type]';
}

function detectMessageType(message: any): string {
	if (!message) return 'unknown';

	if (message.conversation) return 'text';
	if (message.extendedTextMessage) return 'text';
	if (message.imageMessage) return 'image';
	if (message.videoMessage) return 'video';
	if (message.audioMessage) return 'audio';
	if (message.documentMessage) return 'document';
	if (message.stickerMessage) return 'sticker';
	if (message.contactMessage) return 'contact';
	if (message.locationMessage) return 'location';
	if (message.buttonsResponseMessage) return 'button';
	if (message.listResponseMessage) return 'list';
	if (message.reactionMessage) return 'reaction';

	return 'unknown';
}

export function normalizePayload(body: any): NormalizedMessage {
	const event = body.event || '';
	const data = body.data || {};
	const key = data.key || {};
	const message = data.message || {};

	const sender = extractSender(key.remoteJid || '');
	const messageText = extractMessageText(message);
	const messageType = detectMessageType(message);

	const timestamp = data.messageTimestamp
		? new Date((data.messageTimestamp as number) * 1000).toISOString()
		: new Date().toISOString();

	return {
		event,
		sender,
		senderName: data.pushName || '',
		message: messageText,
		messageType,
		timestamp,
		instance: body.instance || '',
		raw: body,
	};
}
