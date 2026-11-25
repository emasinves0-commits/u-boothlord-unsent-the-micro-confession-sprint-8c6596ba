# How this entry was built

- `main.ts` holds the entry as one constant (`ENTRY`), validates it (total 1-260 characters, message line at most 200, exactly two lines), writes `/output/entry.txt` and reads it back.
- Pass 1 wrote the file inline; pass 2 extracted `validate()` and added the readback check.
- Result: 201 bytes (`wc -c`), 193-character message, no trailing newline.
