"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Mic, Play } from "lucide-react"
import { VoiceCapture } from "./voice-capture"
import { ImageCapture } from "./image-capture"

interface RegistrationFormProps {
  onSubmit: (formData: any) => void
  onBack: () => void
}

export function RegistrationForm({ onSubmit, onBack }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    posting: "",
    rank: "",
    achievements: "",
  })

  const [capturedVoice, setCapturedVoice] = useState<Blob | null>(null)
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null)
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [showVoiceCapture, setShowVoiceCapture] = useState(false)
  const [showImageCapture, setShowImageCapture] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const completeFormData = {
      ...formData,
      voiceBlob: capturedVoice,
      imageBlob: capturedImage,
    }
    onSubmit(completeFormData)
  }

  const handleVoiceCapture = (audioBlob: Blob) => {
    setCapturedVoice(audioBlob)
    setVoiceUrl(URL.createObjectURL(audioBlob))
  }

  const handleImageCapture = (imageBlob: Blob) => {
    setCapturedImage(imageBlob)
    setImageUrl(URL.createObjectURL(imageBlob))
  }

  const playVoice = () => {
    if (voiceUrl) {
      const audio = new Audio(voiceUrl)
      audio.play()
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-green-200 max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="absolute top-4 left-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-gray-800">Personnel Registration / कर्मचारी पंजीकरण</CardTitle>
          <p className="text-sm text-gray-600">Complete all fields for new appointment</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name / पूरा नाम</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="border-2 border-gray-300 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth / जन्म तिथि</label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))}
                  className="border-2 border-gray-300 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rank / रैंक</label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, rank: value }))}>
                  <SelectTrigger className="border-2 border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lieutenant">Lieutenant</SelectItem>
                    <SelectItem value="captain">Captain</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="colonel">Colonel</SelectItem>
                    <SelectItem value="brigadier">Brigadier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posting / तैनाती</label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, posting: value }))}>
                  <SelectTrigger className="border-2 border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select posting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infantry">Infantry Regiment</SelectItem>
                    <SelectItem value="armoured">Armoured Corps</SelectItem>
                    <SelectItem value="artillery">Artillery</SelectItem>
                    <SelectItem value="engineers">Corps of Engineers</SelectItem>
                    <SelectItem value="signals">Signal Corps</SelectItem>
                    <SelectItem value="medical">Army Medical Corps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements / उपलब्धियां</label>
              <Textarea
                value={formData.achievements}
                onChange={(e) => setFormData((prev) => ({ ...prev, achievements: e.target.value }))}
                placeholder="Enter achievements and commendations"
                className="border-2 border-gray-300 focus:border-green-500 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voice Sample / आवाज़ का नमूना</label>
                {!capturedVoice ? (
                  <Button type="button" onClick={() => setShowVoiceCapture(true)} variant="outline" className="w-full">
                    <Mic className="w-4 h-4 mr-2" />
                    Record Voice
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 mb-2">✓ Voice Recorded</p>
                      <Button type="button" onClick={playVoice} size="sm" variant="outline" className="mr-2">
                        <Play className="w-3 h-3 mr-1" />
                        Play
                      </Button>
                      <Button type="button" onClick={() => setShowVoiceCapture(true)} size="sm" variant="outline">
                        Re-record
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Real-time Image / वास्तविक समय छवि
                </label>
                {!capturedImage ? (
                  <Button type="button" onClick={() => setShowImageCapture(true)} variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Image
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 mb-2">✓ Image Captured</p>
                      <img src={imageUrl || ""} alt="Captured" className="w-16 h-16 object-cover rounded-lg mb-2" />
                      <Button type="button" onClick={() => setShowImageCapture(true)} size="sm" variant="outline">
                        Re-capture
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 mt-6"
              disabled={!capturedVoice || !capturedImage}
            >
              Submit Registration / पंजीकरण जमा करें
            </Button>
          </form>
        </CardContent>
      </Card>

      {showVoiceCapture && <VoiceCapture onCapture={handleVoiceCapture} onClose={() => setShowVoiceCapture(false)} />}

      {showImageCapture && <ImageCapture onCapture={handleImageCapture} onClose={() => setShowImageCapture(false)} />}
    </div>
  )
}
