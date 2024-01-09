'use client';

import { onFollow, unFollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';

import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      unFollow(userId)
        .then((data) =>
          toast.success(`You are now unfollowing ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onclick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <>
    <Button disabled={isPending} onClick={onclick} variant='primary'>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
    <Button disabled={isPending} onClick={onclick} variant='primary'>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
    </>
  );
};
