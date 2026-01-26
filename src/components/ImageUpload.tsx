import React, { useCallback, useState } from 'react'
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: Error) => void;
}

export function ImageUpload({ onUploadComplete, onError }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

  const uploadImage = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // First, ensure the bucket exists
      const { data: buckets } = await supabase.storage.listBuckets()
      const profileImagesBucket = buckets?.find(b => b.name === 'profile-images')

      if (!profileImagesBucket) {
        await supabase.storage.createBucket('profile-images', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2, // 2MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif']
        })
      }

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath)

      if (!publicUrl) {
        throw new Error('Failed to generate public URL')
      }

      setUploadedFileName(fileName)
      onUploadComplete(publicUrl)
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error)
      }
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }, [onUploadComplete, onError])

  return (
    <div>
      {uploading ? (
        <div>Uploading...</div>
      ) : (
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
          />
          {uploadedFileName && (
            <p className="mt-2 text-sm text-green-600">
              Successfully uploaded: {uploadedFileName}
            </p>
          )}
        </div>
      )}
    </div>
  )
}