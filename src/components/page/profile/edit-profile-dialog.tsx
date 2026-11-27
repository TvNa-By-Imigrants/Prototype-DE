import { useState, type FormEvent } from "react"
import { ImagePlusIcon, Trash2Icon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { profiles, type Profile } from "@/data"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

export type EditProfileDialogProps = {
  open: boolean
  profile: Profile
  onOpenChange: (open: boolean) => void
  onSave: (next: Profile) => void
}

const BIO_LIMIT = 160
const HANDLE_PATTERN = /^[a-z0-9_]{3,20}$/

type FieldName = "name" | "handle" | "bio"
type FieldErrors = Partial<Record<FieldName, string>>

/** Same responsive treatment as the auth dialog: full-screen sheet on phones. */
export function EditProfileDialog({
  open,
  profile,
  onOpenChange,
  onSave,
}: EditProfileDialogProps) {
  const { language, t } = useLanguage()
  const [values, setValues] = useState({
    name: profile.name,
    handle: profile.handle,
    bio: language === "km" ? profile.bioKm : profile.bio,
    location: language === "km" ? profile.locationKm : profile.location,
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saving, setSaving] = useState(false)

  const setValue = (key: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (key !== "location") setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FieldErrors = {}
    const handle = values.handle.trim().toLowerCase()

    if (!values.name.trim()) nextErrors.name = t("profile.errName")
    if (!HANDLE_PATTERN.test(handle)) nextErrors.handle = t("profile.errHandle")
    else if (
      handle !== profile.handle &&
      profiles.some((item) => item.handle === handle)
    )
      nextErrors.handle = t("profile.errHandleTaken")
    if (values.bio.length > BIO_LIMIT) nextErrors.bio = t("profile.errBio")

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaving(true)
    // Prototype only: no backend, so saving just updates local state.
    setTimeout(() => {
      setSaving(false)
      onSave({
        ...profile,
        name: values.name.trim(),
        handle,
        ...(language === "km"
          ? { bioKm: values.bio, locationKm: values.location }
          : { bio: values.bio, location: values.location }),
      })
      toast.add({
        type: "success",
        title: t("profile.savedTitle"),
        description: t("profile.savedBody"),
      })
      onOpenChange(false)
    }, 500)
  }

  const inputClass = "h-11 rounded-lg px-3 text-base md:text-sm"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "gap-0 overflow-hidden p-0",
          "max-sm:h-dvh max-sm:max-h-dvh max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-0",
          "sm:w-[calc(100vw-2rem)] sm:max-w-[460px]"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{t("profile.editTitle")}</DialogTitle>
            <DialogDescription className={cn(language === "km" && "leading-relaxed")}>
              {t("profile.editSubtitle")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Avatar changer: local preview state only, no upload endpoint yet. */}
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                ) : null}
                <AvatarFallback className="bg-secondary text-xl font-semibold text-secondary-foreground">
                  {values.name.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm">
                    <ImagePlusIcon data-icon="inline-start" />
                    {t("profile.changePhoto")}
                  </Button>
                  {profile.avatar ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Trash2Icon data-icon="inline-start" />
                      {t("profile.removePhoto")}
                    </Button>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">{t("profile.photoHint")}</p>
              </div>
            </div>

            <FieldGroup className="gap-4">
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="profile-name">{t("profile.displayName")}</FieldLabel>
                <Input
                  id="profile-name"
                  className={inputClass}
                  autoComplete="name"
                  placeholder={t("profile.displayNamePlaceholder")}
                  value={values.name}
                  aria-invalid={!!errors.name}
                  onChange={(event) => setValue("name", event.target.value)}
                />
                <FieldError className="hidden sm:block">{errors.name}</FieldError>
              </Field>

              <Field data-invalid={!!errors.handle}>
                <FieldLabel htmlFor="profile-handle">{t("profile.handle")}</FieldLabel>
                <InputGroup className="h-11">
                  <InputGroupAddon align="inline-start">
                    <span className="pl-1 text-muted-foreground">@</span>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="profile-handle"
                    autoComplete="username"
                    inputMode="text"
                    className="text-base md:text-sm"
                    value={values.handle}
                    aria-invalid={!!errors.handle}
                    onChange={(event) => setValue("handle", event.target.value)}
                  />
                </InputGroup>
                {errors.handle ? (
                  <FieldError className="hidden sm:block">{errors.handle}</FieldError>
                ) : (
                  <FieldDescription>{t("profile.handleHint")}</FieldDescription>
                )}
              </Field>

              <Field data-invalid={!!errors.bio}>
                <div className="flex items-baseline justify-between gap-2">
                  <FieldLabel htmlFor="profile-bio">{t("profile.bio")}</FieldLabel>
                  <span
                    className={cn(
                      "text-xs text-muted-foreground",
                      values.bio.length > BIO_LIMIT && "text-destructive"
                    )}
                  >
                    {t("profile.bioCount").replace("{count}", String(values.bio.length))}
                  </span>
                </div>
                <Textarea
                  id="profile-bio"
                  rows={3}
                  className="min-h-20 text-base md:text-sm"
                  placeholder={t("profile.bioPlaceholder")}
                  value={values.bio}
                  aria-invalid={!!errors.bio}
                  onChange={(event) => setValue("bio", event.target.value)}
                />
                <FieldError className="hidden sm:block">{errors.bio}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="profile-location">{t("profile.location")}</FieldLabel>
                <Input
                  id="profile-location"
                  className={inputClass}
                  placeholder={t("profile.locationPlaceholder")}
                  value={values.location}
                  onChange={(event) => setValue("location", event.target.value)}
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={() => onOpenChange(false)}
              >
                {t("profile.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="h-11 font-semibold"
              >
                {t(saving ? "profile.saving" : "profile.save")}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
