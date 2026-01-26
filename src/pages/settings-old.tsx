import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { useRouter } from 'next/router';
import { supabase, Profile, updateProfile } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { ImageUpload } from '@/components/ImageUpload';

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile',
          variant: 'destructive',
        });
        return;
      }

      setProfile(data as Profile);
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const updatedProfile = await updateProfile(user.id, profile);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setProfile(prev => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="pt-6">Loading...</CardContent>
          </Card>
        </div>
      ) : profile ? (
        <div className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
              <div className="mt-4">
                <Label className="text-sm font-medium">Profile Type</Label>
                <div 
                  className="mt-1.5 px-3 py-2 bg-muted rounded-md text-muted-foreground cursor-not-allowed select-none capitalize"
                  title="Profile type cannot be changed"
                >
                  {profile?.type || 'Unknown'}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        router.push('/join')
      )}
    </>
  );
}