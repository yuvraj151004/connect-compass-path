import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  Lock, 
  Globe, 
  CreditCard, 
  AlertCircle, 
  Save,
  Briefcase
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    (localStorage.getItem('userRole') as 'mentee' | 'mentor') || 'mentee'
  );
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleRoleToggle = (newRole: 'mentee' | 'mentor') => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    toast({
      title: "Role updated",
      description: `You are now using the platform as a ${newRole}.`,
    });
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Vikram Sharma" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="vikram.sharma@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Tell us about yourself"
                    defaultValue="Software developer passionate about mentorship and professional growth."
                  />
                </div>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Role</CardTitle>
                <CardDescription>Switch between mentee and mentor mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Card className={`flex-1 cursor-pointer ${userRole === 'mentee' ? 'border-primary' : ''}`} onClick={() => handleRoleToggle('mentee')}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Mentee</h3>
                          <p className="text-sm text-muted-foreground">Find mentors and get guidance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`flex-1 cursor-pointer ${userRole === 'mentor' ? 'border-primary' : ''}`} onClick={() => handleRoleToggle('mentor')}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Mentor</h3>
                          <p className="text-sm text-muted-foreground">Provide mentorship to others</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: "Session Reminders",
                      description: "Receive notifications about upcoming mentoring sessions",
                      defaultChecked: true
                    },
                    {
                      title: "New Messages",
                      description: "Get notified when you receive new messages",
                      defaultChecked: true
                    },
                    {
                      title: "Mentor Suggestions",
                      description: "Receive suggestions for new mentors that match your interests",
                      defaultChecked: false
                    },
                    {
                      title: "Platform Updates",
                      description: "Stay updated with new features and improvements",
                      defaultChecked: true
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
                </div>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the platform looks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">This feature is coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your subscription and payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">You are currently on the free plan. Upgrade to access premium features!</p>
                <Button variant="outline">Upgrade to Pro</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>Manage your account data and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline">Download My Data</Button>
                  <Button variant="outline" className="text-destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
