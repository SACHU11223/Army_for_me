"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, CheckCircle, X, AlertCircle } from "lucide-react"

interface ProfileCardProps {
  profile: {
    name: string
    rank: string
    post: string
    id: string
    isError?: boolean
  }
  onClose: () => void
}

export function ProfileCard({ profile, onClose }: ProfileCardProps) {
  const isError = profile.isError

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card
        className={`w-80 shadow-2xl border-2 ${
          isError ? "bg-gradient-to-br from-red-800 to-red-900 border-red-400" : "border-yellow-400"
        }`}
      >
        {/* Army Dress Pattern Background */}
        {!isError && (
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900"></div>
            {/* Camouflage pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 left-4 w-8 h-6 bg-green-900 rounded-full transform rotate-12"></div>
              <div className="absolute top-8 right-6 w-6 h-8 bg-green-600 rounded-full transform -rotate-45"></div>
              <div className="absolute bottom-12 left-8 w-10 h-4 bg-green-800 rounded-full transform rotate-45"></div>
              <div className="absolute bottom-6 right-4 w-6 h-6 bg-green-900 rounded-full"></div>
              <div className="absolute top-16 left-12 w-4 h-8 bg-green-600 rounded-full transform rotate-12"></div>
              <div className="absolute top-20 right-12 w-8 h-4 bg-green-800 rounded-full transform -rotate-12"></div>
              {/* Additional camouflage spots */}
              <div className="absolute top-6 left-16 w-3 h-5 bg-green-900 rounded-full"></div>
              <div className="absolute bottom-16 right-8 w-5 h-3 bg-green-600 rounded-full"></div>
            </div>
            {/* Army insignia pattern */}
            <div className="absolute top-4 right-4 opacity-20">
              <div className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        <CardContent className="p-6 text-center relative z-10">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="mb-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
                isError ? "bg-red-600/30" : "bg-white/20"
              }`}
            >
              <User className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
          </div>

          <div className="space-y-2 mb-4">
            <div className={`rounded-lg p-2 ${isError ? "bg-red-600/20" : "bg-white/10"}`}>
              <p className="text-sm opacity-80 text-white">Rank / रैंक</p>
              <p className="font-semibold text-white">{profile.rank}</p>
            </div>
            <div className={`rounded-lg p-2 ${isError ? "bg-red-600/20" : "bg-white/10"}`}>
              <p className="text-sm opacity-80 text-white">Post / पद</p>
              <p className="font-semibold text-white">{profile.post}</p>
            </div>
            <div className={`rounded-lg p-2 ${isError ? "bg-red-600/20" : "bg-white/10"}`}>
              <p className="text-sm opacity-80 text-white">ID</p>
              <p className="font-semibold text-white">{profile.id}</p>
            </div>
          </div>

          <div
            className={`flex items-center justify-center gap-2 rounded-lg p-3 ${
              isError ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
          >
            {isError ? (
              <>
                <AlertCircle className="w-6 h-6 text-red-200" />
                <span className="font-semibold">INVALID CREDENTIALS / अमान्य प्रमाण पत्र</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="font-semibold">VERIFIED / सत्यापित</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
