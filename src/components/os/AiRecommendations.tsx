"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { aiPoweredAppRecommendations } from '@/ai/flows/ai-powered-app-recommendations';
import { useToast } from "@/hooks/use-toast";

const AiRecommendations = () => {
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const getRecommendations = async () => {
        setLoading(true);
        setRecommendations([]);
        try {
            const usageHistory = "Frequently uses Browser for research and Messages for communication. Occasionally uses Calendar for scheduling.";
            const result = await aiPoweredAppRecommendations({ usageHistory });
            setRecommendations(result.recommendedApps);
        } catch (error) {
            console.error("AI recommendation error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not fetch AI recommendations.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-2">
                <CardTitle className="text-base">App Suggestions</CardTitle>
                <CardDescription>Get AI-powered app recommendations based on your usage.</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                 <Button onClick={getRecommendations} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {loading ? 'Analyzing...' : 'Get Suggestions'}
                </Button>
                {recommendations.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-semibold">Recommended for you:</h4>
                        <ul className="list-disc list-inside mt-2 text-sm">
                            {recommendations.map((app, i) => <li key={i}>{app}</li>)}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AiRecommendations;
