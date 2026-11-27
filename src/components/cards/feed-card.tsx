import {
  BadgeCheckIcon,
  EyeIcon,
  MapPinIcon,
  MessageCircleIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { FeedPost } from "@/data"
import { useLanguage } from "@/i18n"
import { cn } from "cn"

function formatCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`
  }
  return String(count)
}

export type FeedCardProps = {
  post: FeedPost
  className?: string
  /**
   * Full-width post: author on top, text, then the photo — the reading order a
   * single-column feed needs. The compact grid card keeps the photo first.
   */
  full?: boolean
  /** Opens the author's public profile. */
  onOpenAuthor?: (handle: string) => void
}

/** Social/promo feed card: author ✓, title/desc, image, engagement stats. */
export function FeedCard({ post, className, full, onOpenAuthor }: FeedCardProps) {
  const { t } = useLanguage()

  const authorContent = (
    <>
      {post.author.avatar ? (
        <img
          src={post.author.avatar}
          alt=""
          className={cn(
            "shrink-0 rounded-full object-cover ring-1 ring-border",
            full ? "size-10" : "size-7"
          )}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground",
            full ? "size-10 text-sm" : "size-7 text-xs"
          )}
        >
          {post.author.name.charAt(0)}
        </span>
      )}
      <span className="truncate text-sm font-medium text-foreground">
        {post.author.name}
      </span>
      {post.author.verified ? (
        <BadgeCheckIcon
          aria-label={t("card.verified")}
          className="size-4 shrink-0 text-primary"
        />
      ) : null}
    </>
  )

  const authorRow =
    post.author.handle && onOpenAuthor ? (
      <button
        type="button"
        onClick={() => onOpenAuthor(post.author.handle!.slice(1))}
        className="flex w-fit max-w-full items-center gap-2 rounded-full text-left transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {authorContent}
      </button>
    ) : (
      <div className="flex max-w-full items-center gap-2">{authorContent}</div>
    )

  const media = (
    <AspectRatio
      ratio={16 / 9}
      className={cn("overflow-hidden bg-muted", !full && "order-first")}
    >
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="size-full object-cover"
      />
    </AspectRatio>
  )

  const body = (
    <>
      <CardTitle className={cn(full ? "text-lg" : "line-clamp-1")}>
        {post.title}
      </CardTitle>
      <CardDescription className={cn(!full && "line-clamp-2")}>
        {post.description}
      </CardDescription>
      {full && post.location ? (
        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPinIcon aria-hidden="true" className="size-3.5 shrink-0" />
          {post.location}
        </p>
      ) : null}
    </>
  )

  return (
    <Card className={cn("h-full pt-0", className)}>
      {full ? (
        <>
          <CardHeader className="gap-2">
            <div className="flex items-start justify-between gap-3">
              {authorRow}
              {post.timestamp ? (
                <span className="shrink-0 text-xs text-muted-foreground">
                  {post.timestamp}
                </span>
              ) : null}
            </div>
            {body}
          </CardHeader>
          {media}
        </>
      ) : (
        <>
          {media}
          <CardHeader>
            {authorRow}
            {body}
          </CardHeader>
        </>
      )}

      <CardFooter className="mt-auto gap-1 bg-transparent p-1">
        <Button
          variant="ghost"
          size="lg"
          aria-label={t("card.likes")}
          className="flex-1 justify-center gap-1.5 text-xs text-muted-foreground"
        >
          <ThumbsUpIcon aria-hidden="true" />
          {formatCount(post.stats.likes)}
        </Button>
        <Button
          variant="ghost"
          size="lg"
          aria-label={t("card.comments")}
          className="flex-1 justify-center gap-1.5 text-xs text-muted-foreground"
        >
          <MessageCircleIcon aria-hidden="true" />
          {formatCount(post.stats.comments)}
        </Button>
        <Button
          variant="ghost"
          size="lg"
          aria-label={t("card.views")}
          className="flex-1 justify-center gap-1.5 text-xs text-muted-foreground"
        >
          <EyeIcon aria-hidden="true" />
          {formatCount(post.stats.views)}
        </Button>
      </CardFooter>
    </Card>
  )
}
