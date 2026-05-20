![image](https://github.com/user-attachments/assets/813b7b34-377c-42e8-9f1a-12e27e682c7f)

<p align="center"><br>
Community nodes for integrating <b>Evolution API v2.2+</b> with n8n workflows.  
Includes action nodes and an event-driven <b>Trigger node</b> for automatic workflow execution on incoming messages.  
Originally developed by <b>OrionDesign</b>, extended with trigger support.
</p>
<br>

<div align="center">
  <img src="https://img.shields.io/npm/v/n8n-nodes-evolution-api-plus?style=for-the-badge&label=Version&labelColor=%230d1117&color=%23359514" alt="Version">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.npmjs.org%2Fdownloads%2Fpoint%2Flast-year%2Fn8n-nodes-evolution-api&query=downloads&style=for-the-badge&label=Total%20Downloads&labelColor=%230d1117&color=%23359514" alt="Downloads">
</div>
<br>

<h1></h1>

<h3>⚙️ Requirements</h3>

- **n8n** v1.54.4 or higher
- **Evolution API** v2.2.0 or higher

<h1></h1>

<h3>🚀 Features</h3>

<h4>🔔 Evolution API Trigger <i>(New)</i></h4>
Event-driven trigger node that starts workflows automatically when messages arrive via Evolution API.

- **New Message** — triggers on `messages.upsert`
- **20+ events** — subscribe to any Evolution API event (messages, groups, contacts, presence, etc.)
- **Automatic webhook registration** — registers on activation, removes on deactivation
- **Payload normalization** — raw webhook data is normalized into `{sender, message, messageType, timestamp}`
- **Multiple event support** — subscribe to multiple events simultaneously

<h1></h1>

<h3>📌 Available Resources</h3>

<h4>Instance</h4>
🖥️ Full management of Evolution API instances: create, connect, configure, monitor presence, restart, and delete instances.
<br>
<details>
  <summary><b>Operations</b></summary>
  <details><summary>✅ <b> Create Instance</b></summary></details>
  <details><summary>✅ <b> Generate QR Code</b></summary></details>
  <details><summary>✅ <b> Fetch Instance</b></summary></details>
  <details><summary>✅ <b> Set Behavior</b></summary></details>
  <details><summary>✅ <b> Set Presence</b></summary></details>
  <details><summary>✅ <b> Set Proxy</b></summary></details>
  <details><summary>✅ <b> Find Proxy</b></summary></details>
  <details><summary>✅ <b> Disconnect WhatsApp</b></summary></details>
  <details><summary>✅ <b> Delete Instance</b></summary></details>
</details>

<h4>Message</h4>
✉️ Send and manage messages: text, images, videos, audio, documents, contacts, interactive lists, buttons, PIX, and status messages.
<br>
<details>
  <summary><b>Operations</b></summary>
  <details><summary>✅ <b> Send Text</b></summary></details>
  <details><summary>✅ <b> Send Image</b></summary></details>
  <details><summary>✅ <b> Send Video</b></summary></details>
  <details><summary>✅ <b> Send Audio</b></summary></details>
  <details><summary>✅ <b> Send Document</b></summary></details>
  <details><summary>✅ <b> Send Poll</b></summary></details>
  <details><summary>✅ <b> Send Contact</b></summary></details>
  <details><summary>✅ <b> Send List</b></summary></details>
  <details><summary>✅ <b> Send Button</b></summary></details>
  <details><summary>✅ <b> Send PIX</b></summary></details>
  <details><summary>✅ <b> Send Status</b></summary></details>
  <details><summary>✅ <b> React to Message</b></summary></details>
</details>

<h4>Group</h4>
👥 Full group management: create, update settings, manage participants, invite links, and ephemeral messages.
<br>
<details>
  <summary><b>Operations</b></summary>
  <details><summary>✅ <b> Create Group</b></summary></details>
  <details><summary>✅ <b> Update Group Picture</b></summary></details>
  <details><summary>✅ <b> Update Group Name</b></summary></details>
  <details><summary>✅ <b> Update Group Description</b></summary></details>
  <details><summary>✅ <b> Update Group Settings</b></summary></details>
  <details><summary>✅ <b> Update Members</b></summary></details>
  <details><summary>✅ <b> Fetch Invite Link</b></summary></details>
  <details><summary>✅ <b> Revoke Invite Link</b></summary></details>
  <details><summary>✅ <b> Send Invite Link</b></summary></details>
  <details><summary>✅ <b> Find Participants</b></summary></details>
  <details><summary>✅ <b> Ephemeral Messages</b></summary></details>
  <details><summary>✅ <b> Leave Group</b></summary></details>
  <details><summary>✅ <b> Join Group</b></summary></details>
</details>

<h4>Chat</h4>
💬 Comprehensive chat management: verify numbers, manage messages, handle media, control read status, contacts, and presence.
<br>
<details>
  <summary><b>Operations</b></summary>
  <details><summary>✅ <b> Check Number</b></summary></details>
  <details><summary>✅ <b> Read Messages</b></summary></details>
  <details><summary>✅ <b> Manage Archive</b></summary></details>
  <details><summary>✅ <b> Mark as Unread</b></summary></details>
  <details><summary>✅ <b> Delete Message</b></summary></details>
  <details><summary>✅ <b> Fetch Profile Picture</b></summary></details>
  <details><summary>✅ <b> Get Media as Base64</b></summary></details>
  <details><summary>✅ <b> Edit Message</b></summary></details>
  <details><summary>✅ <b> Send Presence</b></summary></details>
  <details><summary>✅ <b> Block Contact</b></summary></details>
  <details><summary>✅ <b> Find Contacts</b></summary></details>
  <details><summary>✅ <b> Search Messages</b></summary></details>
  <details><summary>✅ <b> Search Status</b></summary></details>
  <details><summary>✅ <b> Search Chats</b></summary></details>
</details>

<h4>Event</h4>
⚡ Real-time event monitoring via Webhooks and RabbitMQ integration.
<br>
<details>
  <summary><b>Operations</b></summary>
  <details><summary>✅ <b> Webhook</b></summary></details>
  <details><summary>✅ <b> RabbitMQ</b></summary></details>
</details>

<h4>Integration</h4>
🔗 Connect Evolution API with external platforms: Chatwoot, Evolution Bot, Typebot, Flowise, and Dify.
<br>
<details>
  <summary><b>Operations</b></summary>
  <details><summary>✅ <b> Chatwoot</b></summary></details>
  <details><summary>✅ <b> Evolution Bot</b></summary></details>
  <details><summary>✅ <b> Typebot</b></summary></details>
  <details><summary>✅ <b> Dify</b></summary></details>
  <details><summary>✅ <b> Flowise</b></summary></details>
</details>

<h1></h1>

<h3>🔧 Installation</h3>

1. In n8n, go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-evolution-api-plus`
4. Click **Install**

Or install via npm:

```bash
npm install n8n-nodes-evolution-api-plus
```

<h1></h1>

<h3>🔑 Credentials</h3>

To use the nodes, configure the following credentials in n8n:

| Field | Description |
|-------|-------------|
| **Server Url** | Full URL of your Evolution API instance (e.g. `https://api.example.com`) |
| **ApiKey** | Your instance or global API key |
| **Instance Name** | The name of your Evolution API instance |

<h1></h1>

<h3>🔄 Trigger Node Lifecycle</h3>

The **Evolution API Trigger** node follows n8n's webhook lifecycle:

1. **Activation** — Automatically registers a webhook with Evolution API via `POST /webhook/set/{instance}` using n8n's generated webhook URL
2. **Event Reception** — Incoming messages trigger the workflow; payload is normalized before execution
3. **Deactivation** — Automatically removes the webhook via `DELETE /webhook/{instance}`

<h1></h1>

<h3>📦 Normalized Payload</h3>

Raw Evolution API webhook data is normalized into a clean output:

```json
{
  "event": "messages.upsert",
  "sender": "5511999999999",
  "senderName": "John Doe",
  "message": "Hello, how are you?",
  "messageType": "text",
  "timestamp": "2025-05-20T12:00:00.000Z",
  "instance": "MyInstance"
}
```

<h1></h1>

<h3>🤝 Contributing</h3>

Contributions are welcome! You can help by:
- **Pull Requests** — Submit improvements, fixes, or new features
- **Issues** — Report bugs or suggest ideas
- **Documentation** — Help improve or expand the docs

<h1></h1>

<h3>📌 Contributors</h3>
<a align="center" href="https://github.com/oriondesign2015/n8n-nodes-evolution-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=oriondesign2015/n8n-nodes-evolution-api" />
</a>

<h1></h1>

<h3>📄 License</h3>

MIT
