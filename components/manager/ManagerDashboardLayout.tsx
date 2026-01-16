'use client'

import React from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import ManagerDashboardContent from './ManagerDashboardContent'

export default function ManagerDashboardLayout() {
  return (
    <ManagerPageWrapper>
      <ManagerDashboardContent />
    </ManagerPageWrapper>
  )
}

