"use client"
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"

const AuthCard = ({ icon, iconBgColor = "bg-blue-100", iconColor = "text-blue-600", title, description, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className={`w-16 h-16 mx-auto mb-4 ${iconBgColor} rounded-full flex items-center justify-center`}>
          <div className={`w-8 h-8 ${iconColor}`}>{icon}</div>
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  </div>
)

export default AuthCard
