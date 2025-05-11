'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('hide-password-toggle pl-10', className)}
                ref={ref}
                {...props}
            />
            {showPassword ? (
                <Eye
                    className="absolute left-4 top-2 z-10 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(prev => !prev)}
                />
            ) : (
                <EyeOff
                    className="absolute left-4 top-2 z-10 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(prev => !prev)}
                />
            )}
        </div>
    )
})
PasswordInput.displayName = 'PasswordInput'




export { PasswordInput }