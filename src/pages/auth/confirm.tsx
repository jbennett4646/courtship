import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function ConfirmPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        if (typeof window !== 'undefined') {
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          const access_token = hashParams.get('access_token')
          const refresh_token = hashParams.get('refresh_token')
          
          if (access_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token || '',
            })

            if (error) {
              throw error
            }

            setStatus('success')
          } else {
            setStatus('error')
          }
        }
      } catch (error) {
        console.error('Error confirming email:', error)
        setStatus('error')
      }
    }

    handleEmailConfirmation()
  }, [])

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'loading' && (
            <p className="text-center">Verifying your email...</p>
          )}
          {status === 'success' && (
            <div className="space-y-4">
              <p className="text-center text-green-600">
                Your email has been successfully verified!
              </p>
              <Button 
                className="w-full" 
                onClick={() => router.push('/auth')}
              >
                Continue to Sign In
              </Button>
            </div>
          )}
          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-center text-red-600">
                There was an error verifying your email. The link may have expired or been used already.
              </p>
              <Button 
                className="w-full" 
                onClick={() => router.push('/auth')}
              >
                Back to Sign In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}