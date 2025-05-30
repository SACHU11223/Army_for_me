"use client"

import { useState } from "react"
import { AnimatedFlag } from "@/components/animated-flag"
import { MainLoginForm } from "@/components/main-login-form"
import { ProfileCard } from "@/components/profile-card"
import { OfficerLogin } from "@/components/officer-login"
import { RegistrationForm } from "@/components/registration-form"

export default function ArmyAuthSystem() {
  const [currentView, setCurrentView] = useState<"main" | "officer-login" | "registration">("main")
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [showError, setShowError] = useState(false)

  // Demo army data
  const validCredentials = {
    IND001: {
      key: "ARMY2024",
      profile: { name: "Major Rajesh Kumar", rank: "Major", post: "Infantry Regiment", id: "IND001" },
    },
    IND002: {
      key: "SECURE123",
      profile: { name: "Captain Priya Sharma", rank: "Captain", post: "Signal Corps", id: "IND002" },
    },
    IND003: {
      key: "DEFENSE456",
      profile: { name: "Colonel Vikram Singh", rank: "Colonel", post: "Armoured Corps", id: "IND003" },
    },
  }

  const handleMainLogin = (did: string, key: string) => {
    if (validCredentials[did] && validCredentials[did].key === key) {
      setProfileData(validCredentials[did].profile)
      setShowProfileCard(true)
      setShowError(false)
    } else {
      // Show error card instead of just error message
      setProfileData({ name: "Invalid User", rank: "Unknown", post: "Access Denied", id: did || "N/A", isError: true })
      setShowProfileCard(true)
      setShowError(false)
    }
  }

  const handleOfficerLogin = (did: string, key: string) => {
    // For demo, any officer credentials lead to registration
    if (did && key) {
      setCurrentView("registration")
    }
  }

  const handleRegistrationSubmit = (formData: any) => {
    // Generate new DID and Key
    const newDID = `IND${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
    const newKey = `KEY${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    alert(`Registration Successful!\nNew D-ID: ${newDID}\nNew Key: ${newKey}`)
    setCurrentView("main")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedFlag />

      {currentView === "main" && (
        <>
          <MainLoginForm
            onLogin={handleMainLogin}
            onNewAppoint={() => setCurrentView("officer-login")}
            showError={showError}
          />
          {showProfileCard && profileData && (
            <ProfileCard profile={profileData} onClose={() => setShowProfileCard(false)} />
          )}
        </>
      )}

      {currentView === "officer-login" && (
        <OfficerLogin onLogin={handleOfficerLogin} onBack={() => setCurrentView("main")} />
      )}

      {currentView === "registration" && (
        <RegistrationForm onSubmit={handleRegistrationSubmit} onBack={() => setCurrentView("officer-login")} />
      )}
    </div>
  )
}
