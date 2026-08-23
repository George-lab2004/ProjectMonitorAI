import Pusher from 'pusher-js';

const pusherClient = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  channelAuthorization: {
    endpoint: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/pusher/auth`,
    transport: 'ajax',
  },
  authEndpoint: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/pusher/auth`,
  auth: {
    params: {},
    headers: {},
  },
});

export default pusherClient;
