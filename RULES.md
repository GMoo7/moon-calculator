# Project Rules

These rules apply to every change in this repo, whoever (or whatever) makes it.

1. **Keep every folder organised.** Each folder has one clear job
   (`css/` styles, `js/pages/` screens, `js/components/` shared pieces,
   `js/lib/` helper code). Nothing is dumped in the root.
2. **No file is longer than 300 lines.** If a file gets close, split it.
3. **Keep it clean.** Short functions, clear names, no dead code,
   no copy-pasted blocks.
4. **One file per screen in `js/pages/`** (home, week, about).
   Anything used on more than one screen lives in **one** shared copy
   in `js/components/` or `js/lib/` and is imported where needed.
5. **Write for a beginner.** Plain names, a short comment at the top of
   every file saying what it does, and the folder layout explained in
   `README.md`.
6. **Check before you write.** Before creating any file, function or
   style, look whether it already exists. Reuse or extend it instead
   of making a second copy.
