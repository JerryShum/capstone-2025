import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export const Route = createFileRoute('/generate-image')({
  component: GenerateImage,
});

function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [imageData, setImageData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    setImageData('');
    setIsLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/api/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success) {
        setImageData(data.imageData);
      } else if (data.warning) {
        alert(`Warning: ${data.warning}`);
      } else {
        throw new Error(data.message || 'Failed to generate image.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageData) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${imageData}`;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-2">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate a New Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Your Image Prompt</Label>
            <Input
              id="prompt"
              placeholder="A beautiful landscape with mountains and a lake..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button onClick={generateImage} disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </Button>
          
          {imageData && (
            <Card className="mt-4 bg-muted/40">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Generated Image</CardTitle>
                <Button onClick={handleDownload}>Download</Button>
              </CardHeader>
              <CardContent>
                <img src={`data:image/png;base64,${imageData}`} alt="Generated" className="w-full h-auto" />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}