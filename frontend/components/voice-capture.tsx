"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Square, RotateCcw, Check } from "lucide-react"

interface VoiceCaptureProps {
  onCapture: (audioBlob: Blob) => void
  onClose: () => void
}

export function VoiceCapture({ onCapture, onClose }: VoiceCaptureProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Error accessing microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const retake = () => {
    setAudioBlob(null)
    setAudioUrl(null)
  }

  const proceed = () => {
    if (audioBlob) {
      onCapture(audioBlob)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 bg-white shadow-2xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Voice Capture / आवाज़ रिकॉर्डिंग</h3>

          <div className="mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className={`w-12 h-12 ${isRecording ? "text-red-500 animate-pulse" : "text-blue-500"}`} />
            </div>

            {!audioBlob && (
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
            )}
          </div>

          {audioUrl && (
            <div className="mb-4">
              <audio ref={audioRef} src={audioUrl} className="w-full mb-4" controls />
              <div className="flex gap-2">
                <Button onClick={retake} variant="outline" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={proceed} className="flex-1 bg-green-500 hover:bg-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  Proceed
                </Button>
              </div>
            </div>
          )}

          <Button onClick={onClose} variant="ghost" className="w-full">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
