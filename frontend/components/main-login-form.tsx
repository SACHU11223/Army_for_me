"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

interface MainLoginFormProps {
  onLogin: (did: string, key: string) => void
  onNewAppoint: () => void
  showError: boolean
}

export function MainLoginForm({ onLogin, onNewAppoint, showError }: MainLoginFormProps) {
  const [did, setDid] = useState("")
  const [key, setKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(did, key)
  }

  return (
    <>
      {/* Main Login Form */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Card className="w-96 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-orange-200">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-green-700" />
            </div>
            <p className="text-sm text-orange-600 font-semibold mb-2 italic">राष्ट्ररक्षणं परमं धर्मम्</p>
            <CardTitle className="text-2xl font-bold text-gray-800">भारतीय सेना प्रमाणीकरण</CardTitle>
            <p className="text-sm text-gray-600">Indian Army Authentication</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">D-ID (Defense Identification)</label>
                <Input
                  type="text"
                  value={did}
                  onChange={(e) => setDid(e.target.value)}
                  placeholder="Enter your D-ID"
                  className="border-2 border-gray-300 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Key</label>
                <Input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your security key"
                  className="border-2 border-gray-300 focus:border-green-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2">
                Authenticate / प्रमाणित करें
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* New Appointment Button */}
      <div className="absolute bottom-8 left-8 z-10">
        <Button
          onClick={onNewAppoint}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          New Appointment / नई नियुक्ति
        </Button>
      </div>
    </>
  )
}
