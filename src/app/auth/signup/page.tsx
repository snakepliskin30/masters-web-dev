"use client"

import z from "zod";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.email().min(1),
    password: z.string().min(6)
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpTab() {
    const router = useRouter();
    const form = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const { isSubmitting } = form.formState;



    async function handleSignUp(data: SignUpForm) {
        await authClient.signUp.email(
                { ...data, callbackURL: "/" }, 
                {
                    onError: (error) => {
                        toast.error(error.error.message || "Failed to sign up");
                    },
                    onSuccess: () => {
                        router.push("/");
                    }
                }
            );
        
    }

    return (
        <Card className="mt-6 max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
                    <FieldGroup>
                        <Controller 
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Name
                                    </FieldLabel>
                                    <Input 
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        {...field} 
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller 
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>
                                    <Input 
                                        type="email"
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        {...field} 
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller 
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <Input 
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        {...field} 
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <Button type="submit" disabled={isSubmitting}>
                        <LoadingSwap isLoading={isSubmitting}>Sign Up</LoadingSwap>
                    </Button>
                </form>
            </CardContent>
        </Card>
        
    );
}