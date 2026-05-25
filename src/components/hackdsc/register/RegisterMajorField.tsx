import { ChevronDown } from 'lucide-react'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { COMMON_MAJORS } from '#/data/hackdsc-registration'
import {
  registerInputClassName,
  registerLabelClassName,
} from '#/components/hackdsc/register/register-field-styles'
import { cn } from '#/lib/cn'

const MAX_SUGGESTIONS = 8

function filterMajors(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return [...COMMON_MAJORS]
  return COMMON_MAJORS.filter((major) => major.toLowerCase().includes(q))
}

type RegisterMajorFieldProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function RegisterMajorField({
  value,
  onChange,
  error,
}: RegisterMajorFieldProps) {
  const listboxId = useId()
  const inputId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const hasError = Boolean(error?.trim())
  const suggestions = useMemo(() => filterMajors(value), [value])
  const visibleSuggestions = suggestions.slice(0, MAX_SUGGESTIONS)
  const showCustomHint =
    value.trim().length > 0 &&
    !COMMON_MAJORS.some(
      (m) => m.toLowerCase() === value.trim().toLowerCase(),
    )

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setHighlightIndex(-1)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  function selectMajor(major: string) {
    onChange(major.trim())
    setOpen(false)
    setHighlightIndex(-1)
  }

  function confirmCustomMajor() {
    const trimmed = value.trim()
    if (!trimmed) return
    selectMajor(trimmed)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true)
      return
    }

    if (e.key === 'Escape') {
      setOpen(false)
      setHighlightIndex(-1)
      return
    }

    if (e.key === 'Enter') {
      if (highlightIndex >= 0 && visibleSuggestions[highlightIndex]) {
        e.preventDefault()
        selectMajor(visibleSuggestions[highlightIndex])
        return
      }

      const exactMatch = COMMON_MAJORS.find(
        (m) => m.toLowerCase() === value.trim().toLowerCase(),
      )
      if (exactMatch) {
        e.preventDefault()
        selectMajor(exactMatch)
        return
      }

      if (showCustomHint && value.trim()) {
        e.preventDefault()
        confirmCustomMajor()
      }
      return
    }

    if (!open || visibleSuggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((i) =>
        i < visibleSuggestions.length - 1 ? i + 1 : 0,
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((i) =>
        i > 0 ? i - 1 : visibleSuggestions.length - 1,
      )
    }
  }

  return (
    <div ref={rootRef} className="relative space-y-1.5">
      <label htmlFor={inputId} className={registerLabelClassName}>
        Major
      </label>
      <div className="relative">
        <input
          id={inputId}
          name="major"
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          value={value}
          placeholder="Search or type your major"
          className={cn(registerInputClassName(hasError), 'pr-10')}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
            setHighlightIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-fg-muted"
          aria-hidden
        />

        {open && (visibleSuggestions.length > 0 || showCustomHint) ? (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute top-full left-0 z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border-default bg-surface-raised py-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
          {visibleSuggestions.map((major, index) => {
            const highlighted = index === highlightIndex
            return (
              <li key={major} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === major}
                  className={cn(
                    'w-full px-4 py-2.5 text-left text-sm transition-colors',
                    highlighted
                      ? 'bg-accent/15 text-fg'
                      : 'text-fg-secondary hover:bg-white/5 hover:text-fg',
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectMajor(major)}
                  onMouseEnter={() => setHighlightIndex(index)}
                >
                  {major}
                </button>
              </li>
            )
          })}
          {showCustomHint ? (
            <li
              role="presentation"
              className="border-t border-border-subtle px-4 py-2 text-xs text-fg-muted"
            >
              Press Enter to use &ldquo;{value.trim()}&rdquo;
            </li>
          ) : null}
          </ul>
        ) : null}
      </div>

      {hasError ? (
        <p id={`${inputId}-error`} className="text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
