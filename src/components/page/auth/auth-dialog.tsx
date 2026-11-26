import { useState, type FormEvent } from "react"
import { EyeIcon, EyeOffIcon, LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { LogoMark } from "@/components/shell/logo"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type AuthMode = "login" | "register"

export type AuthDialogProps = {
  open: boolean
  mode?: AuthMode
  onOpenChange: (open: boolean) => void
  onSignedIn?: () => void
}

type FieldName = "name" | "email" | "password" | "confirmPassword" | "terms"
type FieldErrors = Partial<Record<FieldName, string>>
type Banner = "required" | "incorrect" | "duplicate"

/** Design review only: seeds each documented error state without typing. */
const previewStates = [
  { id: "default", label: "Default" },
  { id: "required", label: "Require fields" },
  { id: "incorrect", label: "Wrong password" },
  { id: "duplicate", label: "Duplicate email" },
] as const

type PreviewState = (typeof previewStates)[number]["id"]

const seedEmail = "dara@example.com"

export function AuthDialog({
  open,
  mode = "login",
  onOpenChange,
  onSignedIn,
}: AuthDialogProps) {
  const { language, t } = useLanguage()
  const [activeMode, setActiveMode] = useState<AuthMode>(mode)
  const [preview, setPreview] = useState<PreviewState>("default")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [rememberMe, setRememberMe] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const isLogin = activeMode === "login"

  const showErrorToast = (kind: Banner) => {
    toast.add({
      type: "error",
      title:
        kind === "incorrect"
          ? t("auth.errIncorrectPassword")
          : kind === "duplicate"
            ? t("auth.errDuplicateEmail")
            : t("auth.errRequiredTitle"),
      description:
        kind === "incorrect"
          ? t("auth.errIncorrectPasswordBody")
          : kind === "duplicate"
            ? t("auth.errDuplicateEmailBody")
            : t("auth.errRequiredBody"),
      priority: "high",
      timeout: 6000,
    })
  }

  const setValue = (key: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const reset = () => {
    setPreview("default")
    setErrors({})
    setValues({ name: "", email: "", password: "", confirmPassword: "" })
    setAcceptedTerms(false)
  }

  const applyPreview = (next: PreviewState) => {
    reset()
    if (next === "default") return

    setPreview(next)

    if (next === "required") {
      setErrors({
        ...(isLogin ? {} : { name: t("auth.errRequired") }),
        email: t("auth.errRequired"),
        password: t("auth.errRequired"),
        ...(isLogin ? {} : { confirmPassword: t("auth.errRequired") }),
      })
    } else if (next === "incorrect") {
      setValues((prev) => ({ ...prev, email: seedEmail, password: "wrongpass" }))
      setErrors({ password: t("auth.errIncorrectPassword") })
    } else {
      setValues((prev) => ({ ...prev, email: seedEmail }))
      setErrors({ email: t("auth.errDuplicateEmail") })
    }

    showErrorToast(next)
  }

  const switchMode = (next: AuthMode) => {
    setActiveMode(next)
    setShowPassword(false)
    setShowConfirmPassword(false)
    reset()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FieldErrors = {}

    if (!isLogin && !values.name.trim()) nextErrors.name = t("auth.errRequired")
    if (!values.email.trim()) nextErrors.email = t("auth.errRequired")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      nextErrors.email = t("auth.errEmail")

    if (!values.password) nextErrors.password = t("auth.errRequired")
    else if (!isLogin && values.password.length < 8)
      nextErrors.password = t("auth.errPasswordShort")

    if (!isLogin && !values.confirmPassword)
      nextErrors.confirmPassword = t("auth.errRequired")
    else if (!isLogin && values.confirmPassword !== values.password)
      nextErrors.confirmPassword = t("auth.errMismatch")

    if (!isLogin && !acceptedTerms) nextErrors.terms = t("auth.errTerms")

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      showErrorToast("required")
      return
    }

    setSubmitting(true)
    // Prototype only: no backend, so a valid form lands on the signed-in header.
    setTimeout(() => {
      setSubmitting(false)
      onSignedIn?.()
    }, 600)
  }

  const inputClass = "h-11 rounded-lg px-3 text-base md:text-sm"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "gap-0 overflow-hidden p-0",
          "max-sm:h-dvh max-sm:max-h-dvh max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-0",
          "sm:w-[calc(100vw-2rem)] sm:max-w-[420px]"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:gap-5 sm:p-7">
          <header className="flex flex-col items-center gap-1.5 pr-8 text-center sm:gap-3 sm:pr-0">
            <div className="hidden items-center gap-2 sm:flex">
              <LogoMark className="size-8 rounded-lg" />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                TvNa
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {t(isLogin ? "auth.loginTitle" : "auth.registerTitle")}
              </h1>
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  language === "km" && "leading-relaxed"
                )}
              >
                {t(isLogin ? "auth.loginSubtitle" : "auth.registerSubtitle")}
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup className="gap-2.5 sm:gap-3">
              {!isLogin && (
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="auth-name">{t("auth.name")}</FieldLabel>
                  <Input
                    id="auth-name"
                    className={inputClass}
                    autoComplete="name"
                    placeholder={t("auth.namePlaceholder")}
                    value={values.name}
                    aria-invalid={!!errors.name}
                    onChange={(event) => setValue("name", event.target.value)}
                  />
                  <FieldError className="hidden sm:block">{errors.name}</FieldError>
                </Field>
              )}

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="auth-email">{t("auth.email")}</FieldLabel>
                <Input
                  id="auth-email"
                  className={inputClass}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t("auth.emailPlaceholder")}
                  value={values.email}
                  aria-invalid={!!errors.email}
                  onChange={(event) => setValue("email", event.target.value)}
                />
                <FieldError className="hidden sm:block">{errors.email}</FieldError>
              </Field>

              <Field data-invalid={!!errors.password}>
                <div className="flex items-baseline justify-between gap-2">
                  <FieldLabel htmlFor="auth-password">{t("auth.password")}</FieldLabel>
                  {isLogin ? (
                    <button
                      type="button"
                      className="text-sm text-secondary-foreground underline-offset-4 hover:underline"
                    >
                      {t("auth.forgotPassword")}
                    </button>
                  ) : null}
                </div>
                <div className="relative">
                  <Input
                    id="auth-password"
                    className={cn(inputClass, "pr-11")}
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={values.password}
                    aria-invalid={!!errors.password}
                    onChange={(event) => setValue("password", event.target.value)}
                  />
                  <button
                    type="button"
                    aria-label={t(showPassword ? "auth.hidePassword" : "auth.showPassword")}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
                <FieldError className="hidden sm:block">{errors.password}</FieldError>
              </Field>

              {isLogin ? (
                <Field orientation="horizontal" className="w-fit">
                  <Checkbox
                    id="auth-remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <FieldLabel htmlFor="auth-remember" className="font-normal">
                    {t("auth.rememberMe")}
                  </FieldLabel>
                </Field>
              ) : (
                <>
                  <Field data-invalid={!!errors.confirmPassword}>
                    <FieldLabel htmlFor="auth-confirm">
                      {t("auth.confirmPassword")}
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="auth-confirm"
                        className={cn(inputClass, "pr-11")}
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder={t("auth.confirmPasswordPlaceholder")}
                        value={values.confirmPassword}
                        aria-invalid={!!errors.confirmPassword}
                        onChange={(event) =>
                          setValue("confirmPassword", event.target.value)
                        }
                      />
                      <button
                        type="button"
                        aria-label={t(
                          showConfirmPassword ? "auth.hidePassword" : "auth.showPassword"
                        )}
                        aria-pressed={showConfirmPassword}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                    <FieldError className="hidden sm:block">{errors.confirmPassword}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.terms}>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="auth-terms"
                        checked={acceptedTerms}
                        aria-invalid={!!errors.terms}
                        onCheckedChange={(checked) => {
                          setAcceptedTerms(checked)
                          setErrors((prev) => ({ ...prev, terms: undefined }))
                        }}
                      />
                      <FieldContent className="gap-1">
                        <FieldLabel htmlFor="auth-terms" className="font-normal">
                          {t("auth.agreeTerms")}
                        </FieldLabel>
                        <FieldError className="hidden sm:block">{errors.terms}</FieldError>
                      </FieldContent>
                    </Field>
                  </Field>
                </>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="h-11 w-full rounded-lg text-base font-semibold"
              >
                {t(
                  submitting
                    ? "auth.submitting"
                    : isLogin
                      ? "auth.loginAction"
                      : "auth.registerAction"
                )}
              </Button>
            </FieldGroup>
          </form>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="shrink-0 text-sm text-muted-foreground">
              {t("auth.socialOr")}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              aria-label={t("auth.continueGoogle")}
              className="h-11 rounded-lg font-medium"
            >
              <img src="/assets/google.webp" alt="" aria-hidden="true" className="size-4" />
              <span className="truncate">
                {t(language === "km" ? "auth.continueGoogle" : "auth.googleShort")}
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              aria-label={t("auth.continueFacebook")}
              className="h-11 rounded-lg font-medium"
            >
              <img
                src="/assets/facebook.webp"
                alt=""
                aria-hidden="true"
                className="size-4"
              />
              <span className="truncate">
                {t(language === "km" ? "auth.continueFacebook" : "auth.facebookShort")}
              </span>
            </Button>
          </div>

          <p
            className={cn(
              "text-center text-sm text-muted-foreground",
              language === "km" && "leading-relaxed"
            )}
          >
            {t(isLogin ? "auth.noAccount" : "auth.haveAccount")}{" "}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="font-semibold text-secondary-foreground underline-offset-4 hover:underline"
            >
              {t(isLogin ? "auth.goRegister" : "auth.goLogin")}
            </button>
          </p>
        </div>

        {/* Design-review strip: desktop only, so the mobile sheet always fits. */}
        <div className="hidden grid-cols-4 gap-1 border-t border-dashed border-border/70 bg-muted/30 px-3 py-2 sm:grid">
          {previewStates.map((state) => (
            <Button
              key={state.id}
              type="button"
              size="xs"
              variant={preview === state.id ? "secondary" : "ghost"}
              onClick={() => applyPreview(state.id)}
              className="h-7 min-w-0 px-1 text-[11px] text-muted-foreground"
            >
              <span className="truncate">{state.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function LogoutDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-5">
        <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <LogOutIcon className="size-5" />
        </div>
        <DialogHeader>
          <DialogTitle>{t("auth.logoutTitle")}</DialogTitle>
          <DialogDescription>{t("auth.logoutBody")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="h-10" onClick={() => onOpenChange(false)}>
            {t("auth.logoutCancel")}
          </Button>
          <Button variant="destructive" className="h-10" onClick={onConfirm}>
            {t("auth.logoutConfirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
