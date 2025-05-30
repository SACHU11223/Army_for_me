"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, RotateCcw, Check } from "lucide-react"

interface ImageCaptureProps {
  onCapture: (imageBlob: Blob) => void
  onClose: () => void
}

export function ImageCapture({ onCapture, onClose }: ImageCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Error accessing camera. Please check permissions.")
    }
  }, [])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setImageBlob(blob)
              setCapturedImage(canvas.toDataURL())
              // Stop camera stream
              if (stream) {
                stream.getTracks().forEach((track) => track.stop())
                setStream(null)
              }
            }
          },
          "image/jpeg",
          0.8,
        )
      }
    }
  }

  const retake = () => {
    setCapturedImage(null)
    setImageBlob(null)
    startCamera()
  }

  const proceed = () => {
    if (imageBlob) {
      onCapture(imageBlob)
      onClose()
    }
  }

  // Start camera when component mounts
  useState(() => {
    startCamera()
  })

  // Cleanup on unmount
  useState(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 bg-white shadow-2xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Image Capture / फोटो खींचना</h3>

          <div className="mb-4">
            {!capturedImage ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-48 bg-gray-200 rounded-lg object-cover"
                />
                <Button
                  onClick={capturePhoto}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 rounded-full p-3"
                >
                  <Camera className="w-6 h-6" />
                </Button>
              </div>
            ) : (
              <div>
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
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
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <Button onClick={onClose} variant="ghost" className="w-full">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
