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

const signInSchema = z.object({
    email: z.email().min(1),
    password: z.string().min(6)
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInTab() {
    const router = useRouter();
    const form = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { isSubmitting } = form.formState;

    async function handleSignIn(data: SignInForm) {
        console.log(data);
        await authClient.signIn.email(
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
                <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
                    <FieldGroup>
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
                        <LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}