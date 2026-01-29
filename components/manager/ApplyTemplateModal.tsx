'use client'

import React, { useState, useEffect } from 'react'
import { X, FileText, Loader2, CheckCircle, AlertCircle, Clock, Flag } from 'lucide-react'
import { useTaskTemplates, useTemplateActions } from '@/hooks/useTaskTemplates'

interface ApplyTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string | null
  projectName?: string
  onSuccess: () => void
}

export default function ApplyTemplateModal({
  isOpen,
  onClose,
  projectId,
  projectName,
  onSuccess,
}: ApplyTemplateModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSuccess, setShowSuccess] = useState(false)

  const { templates, loading: loadingTemplates, error: templatesError } = useTaskTemplates()
  const { applyTemplate, loading: applying, error: applyError } = useTemplateActions()

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTemplateId(null)
      setSelectedCategory('all')
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen || !projectId) return null

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category).filter(Boolean)))]

  // Filter templates by category
  const filteredTemplates = templates.filter(t => 
    selectedCategory === 'all' || t.category === selectedCategory
  )

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId)

  const handleApply = async () => {
    if (!selectedTemplateId) return

    try {
      await applyTemplate(selectedTemplateId, projectId)
      setShowSuccess(true)
      
      // Auto close after success
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Failed to apply template:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-red-600'
      case 'HIGH': return 'text-orange-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'LOW': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply Task Template</h2>
            {projectName && (
              <p className="text-sm text-gray-600">
                <strong>Project:</strong> {projectName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={applying}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Success State */}
        {showSuccess && (
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Template Applied Successfully!</h3>
              <p className="text-gray-600">
                {selectedTemplate?.tasks.length} tasks have been created for this project.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {(templatesError || applyError) && !showSuccess && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">
                {applyError ? 'Failed to Apply Template' : 'Error Loading Templates'}
              </p>
              <p className="text-sm text-red-700">{templatesError || applyError}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!showSuccess && (
          <>
            {/* Category Filter */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Templates' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Templates List */}
            <div className="flex-1 overflow-y-auto p-6">
              {loadingTemplates ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-purple-600" size={40} />
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Templates Found</h3>
                  <p className="text-gray-600">
                    {selectedCategory === 'all'
                      ? 'No templates available yet'
                      : 'No templates in this category'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      disabled={applying}
                      className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                        selectedTemplateId === template.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 bg-white'
                      } ${applying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                          {template.description && (
                            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          )}
                          <div className="flex items-center gap-3 text-xs">
                            {template.category && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
                                {template.category}
                              </span>
                            )}
                            <span className="text-gray-600">
                              {template._count?.tasks || template.tasks?.length || 0} tasks
                            </span>
                            {template.isPublic && (
                              <span className="text-gray-600">• Public Template</span>
                            )}
                          </div>
                        </div>
                        {selectedTemplateId === template.id && (
                          <CheckCircle size={24} className="text-purple-600 flex-shrink-0" />
                        )}
                      </div>

                      {/* Preview Tasks */}
                      {selectedTemplateId === template.id && template.tasks && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Tasks in this template:</h4>
                          <div className="space-y-2">
                            {template.tasks.map((task: any, index: number) => (
                              <div key={task.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-semibold text-gray-900">{task.name}</p>
                                    <Flag size={14} className={getPriorityColor(task.priority)} />
                                  </div>
                                  {task.description && (
                                    <p className="text-xs text-gray-600 mb-1">{task.description}</p>
                                  )}
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock size={12} />
                                      {Math.floor(task.estimatedMinutes / 60)}h {task.estimatedMinutes % 60}m
                                    </span>
                                    <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-800">
                              <strong>Note:</strong> All tasks will be created with PENDING status. You can then assign them to talent.
                            </p>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        {!showSuccess && (
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedTemplate && (
                <>
                  <strong>{selectedTemplate.tasks?.length || 0} tasks</strong> will be created •{' '}
                  Total: <strong>
                    {Math.floor(
                      (selectedTemplate.tasks?.reduce((sum: number, t: any) => sum + t.estimatedMinutes, 0) || 0) / 60
                    )}h{' '}
                    {(selectedTemplate.tasks?.reduce((sum: number, t: any) => sum + t.estimatedMinutes, 0) || 0) % 60}m
                  </strong>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={applying}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!selectedTemplateId || applying}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {applying ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Applying...</span>
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    <span>Apply Template</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
