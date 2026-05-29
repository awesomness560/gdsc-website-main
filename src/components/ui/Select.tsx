import { Check, ChevronDown } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '#/lib/cn'

export type SelectOption<T extends string = string> = {
  value: T
  label: string
  /** Shown in the closed trigger; defaults to label. */
  triggerLabel?: ReactNode
  /** Shown in the menu row; defaults to label. */
  optionContent?: ReactNode
}

export type SelectProps<T extends string = string> = {
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  label?: string
  disabled?: boolean
  placeholder?: string
  className?: string
  id?: string
}

const triggerClass =
  'flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-border-default bg-bg-elevated/50 px-3 text-left text-sm text-fg outline-none transition-colors hover:border-border-strong focus-visible:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60'

const menuClass =
  'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-border-default bg-surface-overlay py-1 shadow-lg'

export function Select<T extends string>({
  value,
  options,
  onChange,
  label,
  disabled,
  placeholder = 'Select…',
  className,
  id: idProp,
}: SelectProps<T>) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const listboxId = `${id}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selected = options[selectedIndex]

  useEffect(() => {
    if (!open) return
    setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [open, selectedIndex])

  useEffect(() => {
    if (!open) return
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function selectIndex(index: number) {
    const option = options[index]
    if (!option) return
    onChange(option.value)
    setOpen(false)
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen((current) => !current)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      const delta = event.key === 'ArrowDown' ? 1 : -1
      setHighlightIndex((current) => {
        const next = current + delta
        if (next < 0) return options.length - 1
        if (next >= options.length) return 0
        return next
      })
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      selectIndex(highlightIndex)
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightIndex((current) => (current + 1) % options.length)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightIndex(
        (current) => (current - 1 + options.length) % options.length,
      )
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setHighlightIndex(0)
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      setHighlightIndex(options.length - 1)
    }
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium text-fg-secondary">
          {label}
        </label>
      ) : null}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={cn(triggerClass, label && 'mt-2')}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="min-w-0 flex-1 truncate">
          {selected ? (
            (selected.triggerLabel ?? selected.label)
          ) : (
            <span className="text-fg-muted">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-fg-muted transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-activedescendant={`${id}-option-${highlightIndex}`}
          tabIndex={-1}
          className={menuClass}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isHighlighted = index === highlightIndex
            return (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors',
                  isHighlighted && 'bg-white/8',
                  isSelected ? 'text-fg' : 'text-fg-secondary',
                )}
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => selectIndex(index)}
              >
                <span className="min-w-0 flex-1">
                  {option.optionContent ?? option.label}
                </span>
                {isSelected ? (
                  <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                ) : (
                  <span className="h-4 w-4 shrink-0" aria-hidden />
                )}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
