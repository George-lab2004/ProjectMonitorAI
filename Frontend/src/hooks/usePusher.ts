import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import pusherClient from '../lib/pusherClient';
import { taskApiSlice } from '../slices/taskApiSlice';
import { messageApiSlice } from '../slices/messageApiSlice';
import { notificationsApiSlice } from '../slices/notificationsApiSlice';
import { projectApiSlice } from '../slices/projectApiSlice';

interface UsePusherProps {
  userId?: string;     // Subscribes to private-user-{userId}
  projectId?: string;  // Subscribes to private-project-{id} & private-chat-project-{id}
}

export function usePusher({ userId, projectId }: UsePusherProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    // ── Channel 1: User personal feed (notifications) ──
    const userChannel = pusherClient.subscribe(`private-user-${userId}`);
    userChannel.bind('new-notification', () => {
      dispatch(notificationsApiSlice.util.invalidateTags(['Notification']));
    });

    // ── Channel 2: Project system events (task updates, health scores) ──
    if (projectId) {
      const projectChannel = pusherClient.subscribe(`private-project-${projectId}`);

      projectChannel.bind('task-updated', () => {
        dispatch(taskApiSlice.util.invalidateTags(['Task']));
      });

      projectChannel.bind('project-updated', () => {
        dispatch(projectApiSlice.util.invalidateTags(['Project']));
      });

      // Health score updated after AI audit
      projectChannel.bind('audit-complete', () => {
        dispatch(projectApiSlice.util.invalidateTags(['Project']));
      });

      // ── Channel 3: Project group chat ──
      const chatChannel = pusherClient.subscribe(`private-chat-project-${projectId}`);
      chatChannel.bind('new-message', () => {
        dispatch(messageApiSlice.util.invalidateTags(['Message']));
      });
    }

    // Cleanup: Unsubscribe when component unmounts or props change
    return () => {
      pusherClient.unsubscribe(`private-user-${userId}`);
      if (projectId) {
        pusherClient.unsubscribe(`private-project-${projectId}`);
        pusherClient.unsubscribe(`private-chat-project-${projectId}`);
      }
    };
  }, [userId, projectId, dispatch]);
}
