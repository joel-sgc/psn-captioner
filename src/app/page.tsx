"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { magicCode } from "@/lib/captioner";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sport, setSport] = useState('');
  const [opposingTeam, setOpposingTeam] = useState('');
  const [time, setTime] = useState('');
  const [comments, setComments] = useState('');
  const [caption, setCaption] = useState('');
  const [targetStudent, setTargetStudent] = useState('');
  const [postType, setPostType] = useState('event');

  const generateCaption = async () => {
    const prompt = `Hello! I am part of the Miami Palmetto Senior Highschool Sports Network Team. Our job is to create Instagram posts to hype up our school's sports teams and inform our students of the upcoming events as well as general posts regarding school sports. We need your help generating a caption for our new post. I will now provide you with the data, and I need you to generate an instagram caption based off that: Type of post: ${postType}, Sport: ${sport}${date ? `, Date and time: ${date?.toLocaleDateString()}` : ''}${time ? `, ${time}` : ''}${opposingTeam ? `, Against: ${opposingTeam}` : ''}${targetStudent ? `, Target Student: ${targetStudent}` : ''}${comments ? `, Additional comments: ${comments}` : ''}`

    const res = await magicCode(prompt);
    setCaption(res);
  }

  return (
    <main className="min-h-screen flex items-center">
      <Card className="border-0 container p-0 h-max flex flex-col">
        <CardHeader className="flex-row gap-4 items-start justify-start">
          <img src="/logo.png" alt="logo" width={64} height={64}/>
          <div className="flex flex-col gap-2">
            <CardTitle>PSN Caption Generator</CardTitle>
            <CardDescription>Official MPSHS PSN Caption Generator</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 md:flex-row gap-4">
          <Textarea value={caption} placeholder="Instagram Caption..." readOnly className="resize-none cursor-default flex-1 min-h-[260px] md:w-2/3"/>
          
          <Tabs className="flex flex-col gap-4 h-max" defaultValue="event" onValueChange={setPostType} value={postType}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="event">Event</TabsTrigger>
              <TabsTrigger value="shoutout">Shout-Out</TabsTrigger>
            </TabsList>
            <TabsContent value="event" className="flex flex-col gap-4 flex-1 h-full">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="sport">Sport <RequiredIndicator/></Label>
                <Input value={sport} onChange={(e) => setSport(e.target.value)} required type="text" placeholder="Sport" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="opposingTeam">Opposing Team <RequiredIndicator/></Label>
                <Input value={opposingTeam} onChange={(e) => setOpposingTeam(e.target.value)} required type="text" placeholder="Opposing Team" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date">Date <RequiredIndicator/></Label>
                <Calendar required showOutsideDays selected={date} onSelect={setDate} mode="single"/>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="time">Time <RequiredIndicator/></Label>
                <Input value={time} onChange={(e) => setTime(e.target.value)} required type="time" placeholder="Time" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Additional Comments..." rows={3} className="resize-none"/>
              </div>
            </TabsContent>
            <TabsContent value="shoutout" className="flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="sport">Sport <RequiredIndicator/></Label>
                <Input value={sport} onChange={(e) => setSport(e.target.value)} required type="text" placeholder="Sport" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="targetStudent">Target Student<RequiredIndicator/></Label>
                <Input value={targetStudent} onChange={(e) => setTargetStudent(e.target.value)} required type="text" placeholder="Target Student" />
              </div>
              <div className="grid w-full items-center gap-1.5 h-full">
                <Label htmlFor="accomplishments">Accomplishments</Label>
                <Textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Accomplishments..." rows={7} className="resize-none"/>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={() => generateCaption()} className="w-full">Generate</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

const RequiredIndicator = () => (
  <span className='text-red-500'>*</span>
)