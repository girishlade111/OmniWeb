"use client";

import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const weatherData = {
  city: 'San Francisco',
  temperature: 68,
  condition: 'Sunny',
  high: 72,
  low: 58,
  forecast: [
    { day: 'Mon', temp: 70, condition: 'Sunny' },
    { day: 'Tue', temp: 65, condition: 'Cloudy' },
    { day: 'Wed', temp: 62, condition: 'Rainy' },
    { day: 'Thu', temp: 68, condition: 'Sunny' },
    { day: 'Fri', temp: 55, condition: 'Snowy' },
  ],
};

const WeatherIcon = ({ condition, className }: { condition: string, className?: string }) => {
  switch (condition) {
    case 'Sunny': return <Sun className={className} />;
    case 'Cloudy': return <Cloud className={className} />;
    case 'Rainy': return <CloudRain className={className} />;
    case 'Snowy': return <CloudSnow className={className} />;
    default: return <Sun className={className} />;
  }
};

const WeatherApp = () => {
  return (
    <div className="flex flex-col h-full bg-card text-card-foreground p-4 overflow-y-auto">
       <div className="p-4 border-b mb-4">
        <h2 className="text-xl font-semibold">Weather</h2>
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-bold">{weatherData.city}</h3>
        <p className="text-7xl font-thin mt-2">{weatherData.temperature}°</p>
        <p className="text-lg text-muted-foreground">{weatherData.condition}</p>
        <div className="flex justify-center gap-4 text-lg">
            <span>H:{weatherData.high}°</span>
            <span>L:{weatherData.low}°</span>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between items-center text-center">
                {weatherData.forecast.map((day) => (
                <div key={day.day} className="flex flex-col items-center space-y-1">
                    <p className="font-medium">{day.day}</p>
                    <WeatherIcon condition={day.condition} className="w-8 h-8 text-primary" />
                    <p>{day.temp}°</p>
                </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherApp;
