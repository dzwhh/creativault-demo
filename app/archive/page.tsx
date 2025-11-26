'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { StarRating } from '@/components/ui/star-rating';
import { WatchTutorialButton } from '@/components/ui/watch-tutorial-button';
import { EmptyStateUpload } from '@/components/ui/empty-state-upload';
import { EmptyStateLink } from '@/components/ui/empty-state-link';
import { EmptyStateWords } from '@/components/ui/empty-state-words';
import { EmptyStateTabs } from '@/components/ui/empty-state-tabs';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/date-picker';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export default function ArchivePage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [selectValue, setSelectValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="UI Components Archive"
        description="A comprehensive showcase of all reusable UI components in the application"
      />

      <div className="p-8 space-y-12">
        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Buttons</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
                <WatchTutorialButton onClick={() => alert('Tutorial clicked!')} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Inputs Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Form Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Text Input</Label>
                  <Input type="text" placeholder="Enter text..." />
                </div>
                <div>
                  <Label>Email Input</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label>Password Input</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>Textarea</Label>
                  <Textarea placeholder="Enter description..." rows={4} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selection Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Dropdown</Label>
                  <Select value={selectValue} onValueChange={setSelectValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="r1" />
                      <Label htmlFor="r1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="r2" />
                      <Label htmlFor="r2">Option 2</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable notifications</Label>
                  <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Date & Time Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Date & Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
              </CardHeader>
              <CardContent>
                <DatePicker
                  date={selectedDate}
                  onDateChange={setSelectedDate}
                  placeholder="Pick a date"
                  mode="single"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Display Components Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Display Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <img src="https://github.com/shadcn.png" alt="Avatar" />
                  </Avatar>
                  <Avatar>
                    <div className="bg-blue-500 text-white w-full h-full flex items-center justify-center">
                      JD
                    </div>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Star Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StarRating rating={4.5} showValue />
                  <StarRating rating={3} showValue />
                  <StarRating rating={5} showValue />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Slider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Value: {sliderValue[0]}</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Layout Components Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Layout Components</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>
                A card with header, content and footer sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This is the card content area. You can put any content here.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Separator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>Section 1</div>
              <Separator />
              <div>Section 2</div>
              <Separator />
              <div>Section 3</div>
            </CardContent>
          </Card>
        </section>

        {/* Table Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Data Display</h2>
          <Card>
            <CardHeader>
              <CardTitle>Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>Moderator</TableCell>
                    <TableCell>
                      <Badge variant="outline">Inactive</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Empty States Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Empty States</h2>
          <div className="space-y-6">
            {/* Empty State Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State Upload</CardTitle>
                <CardDescription>
                  Used when no data is available with file upload option
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateUpload
                  title="No Data Found"
                  description="Upload a CSV file to get started"
                  onFileSelect={(file) => {
                    console.log('File selected:', file.name);
                    alert(`File selected: ${file.name}`);
                  }}
                  maxFileSize="5MB"
                  acceptedFormats="CSV"
                />
              </CardContent>
            </Card>

            {/* Empty State Link */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State Link</CardTitle>
                <CardDescription>
                  Real-time data collection by URL from social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateLink
                  title="No Content Found"
                  description="Paste a URL to collect video data in real-time"
                  onCollect={async (url) => {
                    console.log('Collecting from URL:', url);
                    alert(`Starting collection from: ${url}`);
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert('Collection completed!');
                  }}
                  placeholder="https://www.tiktok.com/@username/video/..."
                  buttonText="Collect Now"
                />
              </CardContent>
            </Card>

            {/* Empty State Words */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State Words</CardTitle>
                <CardDescription>
                  Keyword-based content discovery across multiple platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateWords
                  title="Discover Trending Content"
                  description="Search by keywords or hashtags to find viral content"
                  onCollect={async (platform, keywords) => {
                    console.log('Searching on', platform, 'for:', keywords);
                    alert(`Searching on ${platform.toUpperCase()} for: ${keywords.join(', ')}`);
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert(`Found results for: ${keywords.join(', ')}`);
                  }}
                  placeholder="beauty tips, #makeup, fashion"
                  buttonText="Search Now"
                />
              </CardContent>
            </Card>

            {/* Empty State Tabs (Combined) */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State Tabs</CardTitle>
                <CardDescription>
                  Combined empty state with tabs for Upload, URL Link, and Keywords search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateTabs
                  onFileSelect={(file) => {
                    console.log('File selected:', file.name);
                    alert(`File selected: ${file.name}`);
                  }}
                  onLinkCollect={async (url) => {
                    console.log('Collecting from URL:', url);
                    alert(`Starting collection from: ${url}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert('Collection completed!');
                  }}
                  onWordsCollect={async (platform, keywords) => {
                    console.log('Searching on', platform, 'for:', keywords);
                    alert(`Searching on ${platform.toUpperCase()} for: ${keywords.join(', ')}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert(`Found results for: ${keywords.join(', ')}`);
                  }}
                  defaultTab="upload"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Combinations Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Component Combinations</h2>
          <Card>
            <CardHeader>
              <CardTitle>User Profile Card</CardTitle>
              <CardDescription>Combining multiple components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white w-full h-full flex items-center justify-center text-lg font-bold">
                    AB
                  </div>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Alex Brown</h3>
                  <p className="text-sm text-gray-500">alex.brown@example.com</p>
                </div>
                <Badge>Premium</Badge>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Marketing Updates</Label>
                  <Switch />
                </div>
              </div>
              <Separator />
              <div>
                <Label>Rating</Label>
                <StarRating rating={4.5} showValue />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
}
