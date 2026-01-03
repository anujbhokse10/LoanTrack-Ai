'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, updateProfile } from 'firebase/auth';
import { getFirebase } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Loader2 } from 'lucide-react';

const settingsSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export function SettingsDialog({ open, onOpenChange, user, setUser }: SettingsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { auth } = getFirebase();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: user?.displayName || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ displayName: user.displayName || '' });
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    if (!user || !auth?.currentUser) return;
    setIsLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
      });
      // Create a new user object to force re-render
      const updatedUser = { ...auth.currentUser } as User;
      setUser(updatedUser);
      
      toast({
        title: 'Success',
        description: 'Your name has been updated.',
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>Update your account details here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
