import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export function StoryGenerator() {
  const [prompt, setPrompt] = useState('');
  const [audience, setAudience] = useState('Children');
  const [genre, setGenre] = useState('Fantasy');
  const [length, setLength] = useState('500');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateStory = async () => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    setStory('');
    setIsLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, audience, genre, length }),
      });

      if (!response.body) {
        throw new Error('Response body is empty.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        
        const chunk = decoder.decode(value);
        setStory((prevStory) => prevStory + chunk);
      }

    } catch (error) {
      console.error('Error generating story:', error);
      setStory('Failed to generate story. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate a New Story</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Children">Children</option>
              <option value="Teenagers">Teenagers</option>
              <option value="Young Adults">Young Adults</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-fi">Sci-fi</option>
              <option value="Mystery">Mystery</option>
              <option value="Horror">Horror</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="length">Preferred Word Count</Label>
          <Input
            id="length"
            type="number"
            placeholder="e.g., 500"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">Your Story Prompt</Label>
          <Input
            id="prompt"
            placeholder="A brave knight and a friendly dragon..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button onClick={generateStory} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Generating...' : 'Generate Story'}
        </Button>
        
        {story && (
          <Card className="mt-4 bg-muted/40">
            <CardHeader>
              <CardTitle>Your Generated Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" style={{ whiteSpace: 'pre-wrap' }}>{story}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
