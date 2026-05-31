"""Remove Cursor co-author trailers from commit messages (stdin -> stdout)."""
import sys

msg = sys.stdin.read()
lines = [
    line
    for line in msg.splitlines()
    if not line.strip().startswith("Co-authored-by: Cursor <cursoragent@cursor.com>")
]
out = "\n".join(lines)
if msg.endswith("\n") and (out or msg.strip() == ""):
    out += "\n"
sys.stdout.write(out)
