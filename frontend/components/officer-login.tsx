"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, UserCheck } from "lucide-react"

interface OfficerLoginProps {
  onLogin: (did: string, key: string) => void
  onBack: () => void
}

export function OfficerLogin({ onLogin, onBack }: OfficerLoginProps) {
  const [did, setDid] = useState("")
  const [key, setKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(did, key)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <Card className="w-96 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-orange-200">
        <CardHeader className="text-center pb-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="absolute top-4 left-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex justify-center mb-4">
            <UserCheck className="w-16 h-16 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Officer Login / अधिकारी लॉगिन</CardTitle>
          <p className="text-sm text-gray-600">Authorized Personnel Only</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Officer D-ID</label>
              <Input
                type="text"
                value={did}
                onChange={(e) => setDid(e.target.value)}
                placeholder="Enter officer D-ID"
                className="border-2 border-gray-300 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Officer Key</label>
              <Input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter officer key"
                className="border-2 border-gray-300 focus:border-orange-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2">
              Proceed to Registration / पंजीकरण के लिए आगे बढ़ें
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
