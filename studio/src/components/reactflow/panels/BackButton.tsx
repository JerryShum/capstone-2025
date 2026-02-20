import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function BackButton() {
    return (
        <Button
            variant="ghost"
            asChild
            className="h-10 px-3 py-2 bg-background/80 backdrop-blur-md border border-border shadow-sm hover:bg-accent/50 transition-all rounded-xl gap-2 group flex items-center"
        >
            <Link to="/">
                <div className="flex items-center gap-2">
                    <img
                        src="/story_weaver_logo_2.svg"
                        alt="Story Weaver Logo"
                        className="size-6 object-contain"
                    />
                    <span className="font-semibold text-sm tracking-tight text-foreground/90">
                        StoryWeaver
                    </span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
        </Button>
    );
}
